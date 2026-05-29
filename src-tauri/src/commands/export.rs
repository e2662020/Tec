use crate::error::{TecError, TecResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ExportOptions {
    pub format: ExportFormat,
    pub source_path: String,
    pub output_path: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum ExportFormat {
    Pdf,
    Html,
    HtmlWithoutStyles,
    Image,
    Docx,
    Odt,
    Rtf,
    Epub,
    Latex,
    MediaWiki,
    ReStructuredText,
    Textile,
    Opml,
    Markdown,
    PlainText,
}

impl ExportFormat {
    pub fn pandoc_format(&self) -> &str {
        match self {
            ExportFormat::Pdf => "pdf",
            ExportFormat::Html => "html",
            ExportFormat::HtmlWithoutStyles => "html",
            ExportFormat::Image => "png",
            ExportFormat::Docx => "docx",
            ExportFormat::Odt => "odt",
            ExportFormat::Rtf => "rtf",
            ExportFormat::Epub => "epub",
            ExportFormat::Latex => "latex",
            ExportFormat::MediaWiki => "mediawiki",
            ExportFormat::ReStructuredText => "rst",
            ExportFormat::Textile => "textile",
            ExportFormat::Opml => "opml",
            ExportFormat::Markdown => "markdown",
            ExportFormat::PlainText => "plain",
        }
    }

    pub fn extension(&self) -> &str {
        match self {
            ExportFormat::Pdf => "pdf",
            ExportFormat::Html => "html",
            ExportFormat::HtmlWithoutStyles => "html",
            ExportFormat::Image => "png",
            ExportFormat::Docx => "docx",
            ExportFormat::Odt => "odt",
            ExportFormat::Rtf => "rtf",
            ExportFormat::Epub => "epub",
            ExportFormat::Latex => "tex",
            ExportFormat::MediaWiki => "wiki",
            ExportFormat::ReStructuredText => "rst",
            ExportFormat::Textile => "textile",
            ExportFormat::Opml => "opml",
            ExportFormat::Markdown => "md",
            ExportFormat::PlainText => "txt",
        }
    }
}

/// Export a file using Pandoc (bundled binary)
#[tauri::command]
pub async fn export_file(source_path: String, output_path: String, format: String) -> TecResult<String> {
    // Build pandoc command
    let pandoc_bin = find_pandoc();

    let mut cmd = std::process::Command::new(&pandoc_bin);
    cmd.arg(&source_path);
    cmd.arg("-o").arg(&output_path);

    // Handle special formats
    match format.as_str() {
        "html-without-styles" => {
            cmd.arg("--standalone");
            cmd.arg("-t").arg("html");
        }
        "image" => {
            cmd.arg("-t").arg("png");
        }
        _ => {
            cmd.arg("-t").arg(&format);
        }
    };

    // Self-contained HTML
    if format == "html" {
        cmd.arg("--standalone");
        cmd.arg("--self-contained");
    }

    let output = cmd.output()
        .map_err(|e| TecError::Export(format!("Failed to run pandoc: {e}")))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(TecError::Export(format!("Pandoc failed: {stderr}")));
    }

    Ok(output_path)
}

fn find_pandoc() -> String {
    // Check common locations
    // Bundled: next to the executable
    if let Ok(exe_path) = std::env::current_exe() {
        let exe_dir = exe_path.parent().unwrap_or(std::path::Path::new("."));
        let bundled = exe_dir.join("pandoc").join("pandoc");
        if bundled.exists() {
            return bundled.to_string_lossy().to_string();
        }
        let bundled_win = exe_dir.join("pandoc").join("pandoc.exe");
        if bundled_win.exists() {
            return bundled_win.to_string_lossy().to_string();
        }
    }

    // System pandoc
    "pandoc".to_string()
}
