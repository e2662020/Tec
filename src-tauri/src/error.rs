use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error, Serialize)]
#[serde(tag = "type", content = "message")]
pub enum TecError {
    #[error("IO error: {0}")]
    Io(String),

    #[error("ZIP error: {0}")]
    Zip(String),

    #[error("Image processing error: {0}")]
    Image(String),

    #[error("Serialization error: {0}")]
    Serde(String),

    #[error("MDX format error: {0}")]
    MdxFormat(String),

    #[error("Export error: {0}")]
    Export(String),

    #[error("Not found: {0}")]
    NotFound(String),
}

impl From<std::io::Error> for TecError {
    fn from(e: std::io::Error) -> Self {
        TecError::Io(e.to_string())
    }
}

impl From<zip::result::ZipError> for TecError {
    fn from(e: zip::result::ZipError) -> Self {
        TecError::Zip(e.to_string())
    }
}

impl From<image::ImageError> for TecError {
    fn from(e: image::ImageError) -> Self {
        TecError::Image(e.to_string())
    }
}

impl From<serde_json::Error> for TecError {
    fn from(e: serde_json::Error) -> Self {
        TecError::Serde(e.to_string())
    }
}

pub type TecResult<T> = Result<T, TecError>;
