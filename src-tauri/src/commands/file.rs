use crate::error::{TecError, TecResult};
use serde::{Deserialize, Serialize};
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MdxDocument {
    pub content: String,
    pub assets: Vec<AssetInfo>,
    pub theme: String,
    pub color_map: String,
    pub meta: super::mdx::MdxMeta,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AssetInfo {
    pub name: String,
    pub data: Vec<u8>,
    pub manifest_entry: Option<super::mdx::ImageManifestEntry>,
}

#[tauri::command]
pub async fn read_file(path: String) -> TecResult<String> {
    let content = std::fs::read_to_string(&path)
        .map_err(|e| TecError::Io(format!("读取文件失败 '{}': {}", path, e)))?;
    Ok(content)
}

#[tauri::command]
pub async fn write_file(path: String, content: String) -> TecResult<()> {
    // 确保父目录存在
    if let Some(parent) = Path::new(&path).parent() {
        std::fs::create_dir_all(parent)
            .map_err(|e| TecError::Io(format!("无法创建目录 '{}': {}", parent.display(), e)))?;
    }
    // 原子写入：先写 temp 再 rename
    let temp_path = format!("{}.tmp", &path);
    std::fs::write(&temp_path, &content)
        .map_err(|e| TecError::Io(format!("写入临时文件失败: {}", e)))?;
    std::fs::rename(&temp_path, &path)
        .map_err(|e| TecError::Io(format!("重命名临时文件失败: {}", e)))?;
    Ok(())
}

#[tauri::command]
pub async fn get_file_info(path: String) -> TecResult<FileInfo> {
    let metadata = std::fs::metadata(&path)
        .map_err(|e| TecError::Io(format!("无法读取文件信息 '{}': {}", path, e)))?;
    let file_name = Path::new(&path)
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("unknown")
        .to_string();

    let extension = Path::new(&path)
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("")
        .to_string();

    let is_dir = metadata.is_dir();
    Ok(FileInfo {
        name: file_name,
        path,
        size: metadata.len(),
        modified: format!("{:?}", metadata.modified().ok()),
        is_mdx: !is_dir && extension == "mdx",
        is_md: !is_dir && extension == "md",
        is_dir,
    })
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FileInfo {
    pub name: String,
    pub path: String,
    pub size: u64,
    pub modified: String,
    pub is_mdx: bool,
    pub is_md: bool,
    pub is_dir: bool,
}

#[tauri::command]
pub async fn list_folder(path: String) -> TecResult<Vec<FileInfo>> {
    let mut files = Vec::new();
    let entries = std::fs::read_dir(&path)
        .map_err(|e| TecError::Io(format!("无法读取目录 '{}': {}", path, e)))?;

    for entry in entries {
        let entry = entry.map_err(|e| TecError::Io(format!("读取目录项失败: {}", e)))?;
        let path = entry.path();
        let extension = path
            .extension()
            .and_then(|e| e.to_str())
            .unwrap_or("")
            .to_lowercase();

        // Only show .md and .mdx files, and folders
        if path.is_dir() || extension == "md" || extension == "mdx" {
            let metadata = entry.metadata().ok();
            let file_name = entry.file_name().to_string_lossy().to_string();

            let is_dir = path.is_dir();
            files.push(FileInfo {
                name: file_name,
                path: path.to_string_lossy().to_string(),
                size: metadata.as_ref().map(|m| m.len()).unwrap_or(0),
                modified: format!("{:?}", metadata.and_then(|m| m.modified().ok())),
                is_mdx: !is_dir && extension == "mdx",
                is_md: !is_dir && extension == "md",
                is_dir,
            });
        }
    }

    // Sort: folders first, then files alphabetically
    files.sort_by(|a, b| match (a.is_dir, b.is_dir) {
        (true, false) => std::cmp::Ordering::Less,
        (false, true) => std::cmp::Ordering::Greater,
        _ => a.name.to_lowercase().cmp(&b.name.to_lowercase()),
    });

    Ok(files)
}

// 诊断命令：尝试写入一个测试文件以验证 I/O 是否正常
#[tauri::command]
pub async fn diagnose_write(test_path: String) -> TecResult<String> {
    let test_content = "# Tec 诊断测试\n\n此文件用于验证文件写入功能。\n";
    let start = std::time::Instant::now();

    // 确保父目录存在
    if let Some(parent) = Path::new(&test_path).parent() {
        std::fs::create_dir_all(parent).map_err(|e| {
            TecError::Io(format!("创建目录失败 '{}': {}", parent.display(), e))
        })?;
    }

    // 直接写文件
    std::fs::write(&test_path, test_content)
        .map_err(|e| TecError::Io(format!("写入失败 '{}': {}", test_path, e)))?;

    // 读回验证
    let read_back = std::fs::read_to_string(&test_path)
        .map_err(|e| TecError::Io(format!("读回验证失败: {}", e)))?;

    let ok = read_back == test_content;
    let elapsed = start.elapsed().as_millis();

    // 清理测试文件
    let _ = std::fs::remove_file(&test_path);

    Ok(format!(
        "诊断结果: {} | 耗时: {}ms | 路径: {}",
        if ok { "✅ 文件写入正常" } else { "❌ 内容校验失败" },
        elapsed,
        test_path
    ))
}

/// 扫描 `{dir_path}/assets/` 目录下的所有图片文件，返回 ImageMeta 列表
#[tauri::command]
pub async fn list_assets(dir_path: String) -> TecResult<Vec<crate::image::commands::ImageMeta>> {
    let assets_dir = Path::new(&dir_path).join("assets");
    if !assets_dir.exists() || !assets_dir.is_dir() {
        return Ok(Vec::new());
    }

    let mut images = Vec::new();

    let entries = std::fs::read_dir(&assets_dir)
        .map_err(|e| TecError::Io(format!("无法读取 assets 目录 '{}': {}", assets_dir.display(), e)))?;

    for entry in entries {
        let entry = entry.map_err(|e| TecError::Io(format!("读取目录项失败: {}", e)))?;
        let path = entry.path();

        if !path.is_file() {
            continue;
        }

        let extension = path
            .extension()
            .and_then(|e| e.to_str())
            .unwrap_or("")
            .to_lowercase();

        // 仅处理图片文件，跳过 _orig 原图备份（它们单独由主文件引用）
        if !matches!(extension.as_str(), "png" | "jpg" | "jpeg" | "gif" | "webp" | "bmp" | "svg") {
            continue;
        }

        let file_name = path
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("unknown");

        // 从文件名提取 hash（文件名格式: {hash}.webp 或 {hash}.{ext}）
        let hash = file_name
            .split('.')
            .next()
            .unwrap_or(file_name)
            .to_string();

        let metadata = entry.metadata().ok();
        let file_size = metadata.as_ref().map(|m| m.len()).unwrap_or(0);

        // 读取图片获取尺寸（使用外部 image crate）
        let (width, height, format) = if let Ok(data) = std::fs::read(&path) {
            if let Ok(img) = image::load_from_memory(&data) {
                (img.width(), img.height(), extension.clone())
            } else {
                (0u32, 0u32, extension.clone())
            }
        } else {
            (0u32, 0u32, extension.clone())
        };

        images.push(crate::image::commands::ImageMeta {
            hash,
            width,
            height,
            size: file_size,
            format,
            compressed: extension == "webp",
        });
    }

    Ok(images)
}

/// 将原始图片原样复制到 `{save_dir}/assets/{hash}_orig.{ext}`，返回保存的文件名
#[tauri::command]
pub async fn save_original_to_assets(
    source_path: String,
    save_dir: String,
    hash: String,
) -> TecResult<String> {
    let ext = Path::new(&source_path)
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("png")
        .to_lowercase();

    let file_name = format!("{hash}_orig.{ext}");
    let assets_dir = Path::new(&save_dir).join("assets");
    std::fs::create_dir_all(&assets_dir)
        .map_err(|e| TecError::Io(format!("无法创建 assets 目录: {}", e)))?;

    let dest = assets_dir.join(&file_name);
    std::fs::copy(&source_path, &dest)
        .map_err(|e| TecError::Io(format!("复制原图失败: {}", e)))?;

    log::info!(
        "Original image saved: {} -> {}",
        source_path,
        dest.display()
    );

    Ok(file_name)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_write_and_read_file() {
        let dir = std::env::temp_dir();
        let test_file = dir.join("tec_test_write.md");
        let test_path = test_file.to_string_lossy().to_string();
        let content = "# Test\n\nHello Tec!";

        // 写入
        std::fs::write(&test_path, content).expect("write should succeed");
        assert!(test_file.exists());

        // 读回
        let read = std::fs::read_to_string(&test_path).expect("read should succeed");
        assert_eq!(read, content);

        // 清理
        std::fs::remove_file(&test_path).expect("cleanup should succeed");
    }

    #[test]
    fn test_atomic_write() {
        let dir = std::env::temp_dir();
        let test_file = dir.join("tec_test_atomic.md");
        let test_path = test_file.to_string_lossy().to_string();
        let temp_path = format!("{}.tmp", test_path);
        let content = "atomic test";

        // 原子写入逻辑
        std::fs::write(&temp_path, content).unwrap();
        std::fs::rename(&temp_path, &test_path).unwrap();

        assert!(test_file.exists());
        assert!(!std::path::Path::new(&temp_path).exists());

        let read = std::fs::read_to_string(&test_path).unwrap();
        assert_eq!(read, content);

        std::fs::remove_file(&test_path).unwrap();
    }
}
