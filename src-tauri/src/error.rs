use thiserror::Error;

#[derive(Debug, Error)]
pub enum TecError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("ZIP error: {0}")]
    Zip(#[from] zip::result::ZipError),

    #[error("Image processing error: {0}")]
    Image(#[from] image::ImageError),

    #[error("Serialization error: {0}")]
    Serde(#[from] serde_json::Error),

    #[error("MDX format error: {0}")]
    MdxFormat(String),

    #[error("Export error: {0}")]
    Export(String),

    #[error("Not found: {0}")]
    NotFound(String),
}

pub type TecResult<T> = Result<T, TecError>;
