use crate::commands::mdx::ImageManifestEntry;
use crate::error::{TecError, TecResult};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ImageMeta {
    pub hash: String,
    pub width: u32,
    pub height: u32,
    pub size: u64,
    pub format: String,
    pub compressed: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SimilarGroup {
    pub group_id: String,
    pub images: Vec<SimilarImage>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SimilarImage {
    pub hash: String,
    pub name: String,
    pub is_primary: bool,
    pub distance: u32,
}

/// Compress an image to WebP in memory and return the hash + compressed data.
/// Used by .mdx files: the frontend stores the data in its asset list
/// and packages it into the ZIP on save.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CompressedImage {
    pub hash: String,
    pub data: Vec<u8>,
    pub width: u32,
    pub height: u32,
    pub original_size: u64,
    pub compressed_size: u64,
}

#[tauri::command]
pub async fn compress_image(source_path: String) -> TecResult<CompressedImage> {
    let data = std::fs::read(&source_path).map_err(TecError::from)?;
    let original_size = data.len() as u64;
    let phash = super::hash::phash(&data)?;
    let compressed = super::compress::compress_to_webp(&data, Some(80))?;
    let img = image::load_from_memory(&compressed).map_err(TecError::from)?;
    let (width, height) = (img.width(), img.height());
    let compressed_size = compressed.len() as u64;

    log::info!(
        "Image compressed: {} -> {}x{} ({} -> {} bytes)",
        source_path, width, height, original_size, compressed_size
    );

    Ok(CompressedImage {
        hash: phash.hash,
        data: compressed,
        width,
        height,
        original_size,
        compressed_size,
    })
}

/// Import an image: hash → compress → save to assets dir
#[tauri::command]
pub async fn import_image(source_path: String, save_dir: String) -> TecResult<ImageMeta> {
    let data = std::fs::read(&source_path).map_err(TecError::from)?;
    let original_size = data.len() as u64;

    // Compute pHash
    let phash = super::hash::phash(&data)?;

    // Compress to WebP
    let compressed = super::compress::compress_to_webp(&data, Some(80))?;

    // 如果提供了 save_dir，才将压缩后的图片写入磁盘
    let output_path_str = if !save_dir.is_empty() {
        let assets_dir = Path::new(&save_dir).join("assets");
        std::fs::create_dir_all(&assets_dir)
            .map_err(|e| TecError::Io(format!("无法创建 assets 目录: {}", e)))?;

        let output = assets_dir.join(format!("{}.webp", phash.hash));
        std::fs::write(&output, &compressed)
            .map_err(|e| TecError::Io(format!("保存图片失败 '{}': {}", output.display(), e)))?;
        output.to_string_lossy().to_string()
    } else {
        String::from("(未保存)")
    };

    // Get image dimensions from compressed data
    let img = image::load_from_memory(&compressed).map_err(TecError::from)?;
    let (width, height) = (img.width(), img.height());

    // Determine original format from extension
    let format = Path::new(&source_path)
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("png")
        .to_string();

    log::info!(
        "Image imported: {} -> {} ({}x{}, {} bytes)",
        source_path,
        output_path_str,
        width,
        height,
        compressed.len()
    );

    Ok(ImageMeta {
        hash: phash.hash,
        width,
        height,
        size: original_size,
        format,
        compressed: original_size != compressed.len() as u64,
    })
}

/// Auto-detect similar images using pHash (fast, on import)
#[tauri::command]
pub async fn detect_similar_images(
    target_hash: String,
    manifest_json: String,
) -> TecResult<Vec<SimilarGroup>> {
    let manifest: HashMap<String, ImageManifestEntry> =
        serde_json::from_str(&manifest_json).map_err(TecError::from)?;

    let target_bits = u64::from_str_radix(&target_hash, 16)
        .map_err(|e| TecError::MdxFormat(format!("Invalid hash: {e}")))?;

    let mut groups: Vec<SimilarGroup> = Vec::new();
    let mut matched = Vec::new();

    for (name, entry) in &manifest {
        if let Ok(bits) = u64::from_str_radix(&entry.hash, 16) {
            let distance = super::hash::hamming_distance(target_bits, bits);
            if distance <= 10 {
                matched.push(SimilarImage {
                    hash: entry.hash.clone(),
                    name: name.clone(),
                    is_primary: entry.is_primary,
                    distance,
                });
            }
        }
    }

    if !matched.is_empty() {
        groups.push(SimilarGroup {
            group_id: format!("grp_{}", target_hash.chars().take(8).collect::<String>()),
            images: matched,
        });
    }

    Ok(groups)
}

/// Manual detect using dHash + SSIM (two-stage, more accurate)
#[tauri::command]
pub async fn detect_similar_manual(
    manifest_json: String,
    assets_dir: String,
) -> TecResult<Vec<SimilarGroup>> {
    let manifest: HashMap<String, ImageManifestEntry> =
        serde_json::from_str(&manifest_json).map_err(TecError::from)?;

    // Build list of (hash_str, bits, hash_bits)
    let mut entries: Vec<(String, u64)> = Vec::new();
    for (name, entry) in &manifest {
        if let Ok(bits) = u64::from_str_radix(&entry.hash, 16) {
            entries.push((name.clone(), bits));
        }
    }

    let mut groups: Vec<SimilarGroup> = Vec::new();
    let mut grouped: std::collections::HashSet<String> = std::collections::HashSet::new();
    let mut group_id_counter = 0u32;

    for i in 0..entries.len() {
        let (name_a, bits_a) = &entries[i];
        if grouped.contains(name_a) {
            continue;
        }

        let mut group_images: Vec<SimilarImage> = Vec::new();
        group_images.push(SimilarImage {
            hash: format!("{bits_a:016x}"),
            name: name_a.clone(),
            is_primary: manifest.get(name_a).map(|e| e.is_primary).unwrap_or(false),
            distance: 0,
        });

        for j in (i + 1)..entries.len() {
            let (name_b, bits_b) = &entries[j];
            if grouped.contains(name_b) {
                continue;
            }

            let dhash_dist = super::hash::hamming_distance(*bits_a, *bits_b);
            if dhash_dist <= 8 {
                // Stage 2: SSIM refinement
                let path_a = format!("{assets_dir}/{name_a}");
                let path_b = format!("{assets_dir}/{name_b}");

                if let (Ok(data_a), Ok(data_b)) =
                    (std::fs::read(&path_a), std::fs::read(&path_b))
                {
                    if let Ok(ssim_result) = super::ssim::compute_ssim(&data_a, &data_b, None) {
                        if ssim_result.score > 0.85 {
                            group_images.push(SimilarImage {
                                hash: format!("{bits_b:016x}"),
                                name: name_b.clone(),
                                is_primary: manifest
                                    .get(name_b)
                                    .map(|e| e.is_primary)
                                    .unwrap_or(false),
                                distance: dhash_dist,
                            });
                            grouped.insert(name_b.clone());
                        }
                    }
                }
            }
        }

        if group_images.len() > 1 {
            grouped.insert(name_a.clone());
            let group_id = format!("grp_{group_id_counter:03}");
            group_id_counter += 1;
            groups.push(SimilarGroup {
                group_id,
                images: group_images,
            });
        }
    }

    Ok(groups)
}
