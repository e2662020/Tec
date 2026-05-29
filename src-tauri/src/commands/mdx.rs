use crate::error::{TecError, TecResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct MdxMeta {
    pub version: String,
    pub created: String,
    pub modified: String,
    #[serde(default)]
    pub syntax_extensions: Vec<String>,
    #[serde(default)]
    pub plugin_data: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ImageManifestEntry {
    pub original_name: String,
    pub hash: String,
    #[serde(default)]
    pub similar_group: Option<String>,
    #[serde(default)]
    pub is_primary: bool,
    #[serde(default)]
    pub mtime: String,
    #[serde(default)]
    pub compressed: bool,
}

/// Read an .mdx (ZIP) file and extract its contents into memory
#[tauri::command]
pub async fn read_mdx(path: String) -> TecResult<super::file::MdxDocument> {
    let file = std::fs::File::open(&path)
        .map_err(|e| TecError::Io(e))?;
    let mut archive = zip::ZipArchive::new(file)
        .map_err(|e| TecError::Zip(e))?;

    let mut content = String::new();
    let mut assets = Vec::new();
    let mut theme = String::new();
    let mut color_map = String::new();
    let mut meta = super::mdx::MdxMeta::default();

    for i in 0..archive.len() {
        let mut entry = archive.by_index(i)
            .map_err(|e| TecError::Zip(e))?;
        let name = entry.name().to_string();

        match name.as_str() {
            "content.md" => {
                std::io::Read::read_to_string(&mut entry, &mut content)
                    .map_err(|e| TecError::Io(e))?;
            }
            "theme.json" => {
                std::io::Read::read_to_string(&mut entry, &mut theme)
                    .map_err(|e| TecError::Io(e))?;
            }
            "color_map.json" => {
                std::io::Read::read_to_string(&mut entry, &mut color_map)
                    .map_err(|e| TecError::Io(e))?;
            }
            "meta.json" => {
                let mut buf = String::new();
                std::io::Read::read_to_string(&mut entry, &mut buf)
                    .map_err(|e| TecError::Io(e))?;
                meta = serde_json::from_str(&buf).unwrap_or_default();
            }
            _ if name.starts_with("assets/") && !name.ends_with("manifest.json") => {
                let mut data = Vec::new();
                std::io::Read::read_to_end(&mut entry, &mut data)
                    .map_err(|e| TecError::Io(e))?;
                let asset_name = name.strip_prefix("assets/").unwrap_or(&name).to_string();
                assets.push(super::file::AssetInfo {
                    name: asset_name,
                    data,
                    manifest_entry: None,
                });
            }
            _ => {} // Skip manifest.json (loaded separately) and unknown files
        }
    }

    Ok(super::file::MdxDocument {
        content,
        assets,
        theme,
        color_map,
        meta,
    })
}

/// Write an .mdx (ZIP) file atomically
#[tauri::command]
pub async fn write_mdx(
    path: String,
    content: String,
    theme: String,
    color_map: String,
    meta_json: String,
    assets_data: Vec<(String, Vec<u8>)>, // (name, data) pairs
) -> TecResult<()> {
    // Write to temp file first
    let temp_path = format!("{}.tmp", &path);
    let file = std::fs::File::create(&temp_path)
        .map_err(|e| TecError::Io(e))?;
    let mut writer = zip::ZipWriter::new(file);

    let options = zip::write::SimpleFileOptions::default()
        .compression_method(zip::CompressionMethod::Deflated);

    // Write content.md
    writer.start_file("content.md", options)
        .map_err(|e| TecError::Zip(e))?;
    std::io::Write::write_all(&mut writer, content.as_bytes())
        .map_err(|e| TecError::Io(e))?;

    // Write theme.json
    if !theme.is_empty() {
        writer.start_file("theme.json", options)
            .map_err(|e| TecError::Zip(e))?;
        std::io::Write::write_all(&mut writer, theme.as_bytes())
            .map_err(|e| TecError::Io(e))?;
    }

    // Write color_map.json
    if !color_map.is_empty() {
        writer.start_file("color_map.json", options)
            .map_err(|e| TecError::Zip(e))?;
        std::io::Write::write_all(&mut writer, color_map.as_bytes())
            .map_err(|e| TecError::Io(e))?;
    }

    // Write meta.json
    if !meta_json.is_empty() {
        writer.start_file("meta.json", options)
            .map_err(|e| TecError::Zip(e))?;
        std::io::Write::write_all(&mut writer, meta_json.as_bytes())
            .map_err(|e| TecError::Io(e))?;
    }

    // Write asset files
    for (name, data) in &assets_data {
        let asset_path = format!("assets/{name}");
        writer.start_file(&asset_path, options)
            .map_err(|e| TecError::Zip(e))?;
        std::io::Write::write_all(&mut writer, data)
            .map_err(|e| TecError::Io(e))?;
    }

    // Write assets/manifest.json if there are assets
    if !assets_data.is_empty() {
        // manifest is computed from the asset list, for now write empty
        writer.start_file("assets/manifest.json", options)
            .map_err(|e| TecError::Zip(e))?;
        std::io::Write::write_all(&mut writer, b"{}")
            .map_err(|e| TecError::Io(e))?;
    }

    let _ = writer.finish()
        .map_err(|e| TecError::Zip(e))?;

    // Atomic rename
    std::fs::rename(&temp_path, &path)
        .map_err(|e| TecError::Io(e))?;

    Ok(())
}

/// Convert .md to .mdx
#[tauri::command]
pub async fn convert_md_to_mdx(
    md_path: String,
    _download_remote: Vec<bool>,
) -> TecResult<String> {
    let content = std::fs::read_to_string(&md_path)
        .map_err(|e| TecError::Io(e))?;

    // For now, just create a basic mdx package
    let mdx_path = md_path.replace(".md", ".mdx");
    let meta = super::mdx::MdxMeta::default();
    let meta_json = serde_json::to_string_pretty(&meta)
        .map_err(|e| TecError::Serde(e))?;

    write_mdx(
        mdx_path.clone(),
        content,
        String::new(),
        String::new(),
        meta_json,
        Vec::new(),
    ).await?;

    Ok(mdx_path)
}

/// Convert .mdx to .md
#[tauri::command]
pub async fn convert_mdx_to_md(mdx_path: String) -> TecResult<String> {
    let doc = read_mdx(mdx_path.clone()).await?;
    let md_path = mdx_path.replace(".mdx", ".md");

    // Write content to .md file
    std::fs::write(&md_path, &doc.content)
        .map_err(|e| TecError::Io(e))?;

    Ok(md_path)
}
