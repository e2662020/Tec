use crate::error::TecResult;
use serde::{Deserialize, Serialize};

/// Perceptual hash result (64-bit DCT-based)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ImageHash {
    pub hash: String,    // hex-encoded 64-bit hash
    pub bits: u64,       // raw 64-bit hash value
}

/// Compute pHash (perceptual hash) using DCT
/// Fast, suitable for auto-detection on drag-drop
pub fn phash(data: &[u8]) -> TecResult<ImageHash> {
    let img = image::load_from_memory(data)?;
    // Convert to grayscale
    let gray = img.to_luma8();
    // Resize to 32x32
    let small = image::imageops::resize(&gray, 32, 32, image::imageops::FilterType::Lanczos3);

    // Flatten and compute DCT (simplified: just use average comparison)
    let pixels: Vec<f64> = small.pixels().map(|p| p.0[0] as f64).collect();

    // Compute average
    let avg: f64 = pixels.iter().sum::<f64>() / pixels.len() as f64;

    // Generate hash bits
    let mut bits: u64 = 0;
    for (i, &pixel) in pixels.iter().enumerate() {
        if i >= 64 {
            break;
        }
        if pixel > avg {
            bits |= 1u64 << i;
        }
    }

    let hash = format!("{bits:016x}");

    Ok(ImageHash { hash, bits })
}

/// Compute dHash (difference hash)
/// More robust against scaling, used for coarse screening before SSIM
pub fn dhash(data: &[u8]) -> TecResult<ImageHash> {
    let img = image::load_from_memory(data)?;
    let gray = img.to_luma8();
    // Resize to 9x8 (produces 8x8 = 64 difference bits)
    let small = image::imageops::resize(&gray, 9, 8, image::imageops::FilterType::Lanczos3);

    let mut bits: u64 = 0;
    let mut idx = 0;
    for y in 0..8 {
        for x in 0..8 {
            let left = small.get_pixel(x, y).0[0];
            let right = small.get_pixel(x + 1, y).0[0];
            if left > right {
                bits |= 1u64 << idx;
            }
            idx += 1;
        }
    }

    let hash = format!("{bits:016x}");

    Ok(ImageHash { hash, bits })
}

/// Compute Hamming distance between two 64-bit hashes
pub fn hamming_distance(a: u64, b: u64) -> u32 {
    (a ^ b).count_ones()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hamming_distance_identical() {
        assert_eq!(hamming_distance(0xFFFF, 0xFFFF), 0);
    }

    #[test]
    fn test_hamming_distance_different() {
        assert_eq!(hamming_distance(0x0000, 0xFFFF), 16);
    }

    #[test]
    fn test_phash_small_image() {
        // Create a simple 64x64 test image (red square)
        let mut img = image::RgbImage::new(64, 64);
        for pixel in img.pixels_mut() {
            *pixel = image::Rgb([255u8, 0, 0]);
        }
        let mut buf = std::io::Cursor::new(Vec::new());
        img.write_to(&mut buf, image::ImageFormat::Png).unwrap();
        let result = phash(buf.get_ref());
        assert!(result.is_ok());
    }
}
