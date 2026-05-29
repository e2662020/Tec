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
        .map_err(TecError::from)?;
    Ok(content)
}

#[tauri::command]
pub async fn write_file(path: String, content: String) -> TecResult<()> {
    // Write to temp file first, then atomic rename
    let temp_path = format!("{}.tmp", &path);
    std::fs::write(&temp_path, &content)
        .map_err(TecError::from)?;
    std::fs::rename(&temp_path, &path)
        .map_err(TecError::from)?;
    Ok(())
}

#[tauri::command]
pub async fn get_file_info(path: String) -> TecResult<FileInfo> {
    let metadata = std::fs::metadata(&path)
        .map_err(TecError::from)?;
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

    Ok(FileInfo {
        name: file_name,
        path,
        size: metadata.len(),
        modified: format!("{:?}", metadata.modified().ok()),
        is_mdx: extension == "mdx",
        is_md: extension == "md",
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
}

#[tauri::command]
pub async fn list_folder(path: String) -> TecResult<Vec<FileInfo>> {
    let mut files = Vec::new();
    let entries = std::fs::read_dir(&path)
        .map_err(TecError::from)?;

    for entry in entries {
        let entry = entry.map_err(TecError::from)?;
        let path = entry.path();
        let extension = path.extension()
            .and_then(|e| e.to_str())
            .unwrap_or("")
            .to_lowercase();

        // Only show .md and .mdx files, and folders
        if path.is_dir() || extension == "md" || extension == "mdx" {
            let metadata = entry.metadata().ok();
            let file_name = entry.file_name().to_string_lossy().to_string();

            files.push(FileInfo {
                name: file_name,
                path: path.to_string_lossy().to_string(),
                size: metadata.as_ref().map(|m| m.len()).unwrap_or(0),
                modified: format!("{:?}", metadata.and_then(|m| m.modified().ok())),
                is_mdx: extension == "mdx",
                is_md: extension == "md",
            });
        }
    }

    // Sort: folders first, then files alphabetically
    files.sort_by(|a, b| {
        let a_is_dir = Path::new(&a.path).is_dir();
        let b_is_dir = Path::new(&b.path).is_dir();
        match (a_is_dir, b_is_dir) {
            (true, false) => std::cmp::Ordering::Less,
            (false, true) => std::cmp::Ordering::Greater,
            _ => a.name.to_lowercase().cmp(&b.name.to_lowercase()),
        }
    });

    Ok(files)
}
