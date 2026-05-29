use crate::error::TecResult;
use serde::{Deserialize, Serialize};

/// Compression result
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CompressResult {
    pub original_size: u64,
    pub compressed_size: u64,
    pub ratio: f64,
    pub format: String,
    pub width: u32,
    pub height: u32,
}

/// Compress an image to WebP format with quality settings
/// quality: 0-100 (default: 80 for good balance)
pub fn compress_to_webp(data: &[u8], quality: Option<u8>) -> TecResult<Vec<u8>> {
    let quality = quality.unwrap_or(80);
    let img = image::load_from_memory(data)?;
    let (width, height) = (img.width(), img.height());
    let rgba = img.to_rgba8();

    // Use webp crate for lossy encoding
    let webp_data = webp::Encoder::from_rgba(rgba.as_raw(), width, height)
        .encode(quality as f32);

    let result = CompressResult {
        original_size: data.len() as u64,
        compressed_size: webp_data.len() as u64,
        ratio: if data.is_empty() {
            0.0
        } else {
            webp_data.len() as f64 / data.len() as f64
        },
        format: "webp".to_string(),
        width,
        height,
    };

    log::info!(
        "Image compressed: {}x{}, {} -> {} bytes (ratio: {:.2})",
        result.width,
        result.height,
        result.original_size,
        result.compressed_size,
        result.ratio
    );

    Ok(webp_data.to_vec())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compress_small_image() {
        let mut img = image::RgbImage::new(64, 64);
        for pixel in img.pixels_mut() {
            *pixel = image::Rgb([255u8, 128, 0]);
        }
        let mut buf = std::io::Cursor::new(Vec::new());
        img.write_to(&mut buf, image::ImageFormat::Png).unwrap();
        let data = buf.into_inner();

        let compressed = compress_to_webp(&data, Some(80));
        assert!(compressed.is_ok());
        assert!(!compressed.unwrap().is_empty());
    }
}
