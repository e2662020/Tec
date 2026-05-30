use crate::error::TecResult;
use serde::{Deserialize, Serialize};

/// SSIM (Structural Similarity Index) result
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SsimResult {
    /// SSIM score (0.0 to 1.0, higher = more similar)
    pub score: f64,
    /// Whether images are considered similar
    pub is_similar: bool,
}

/// Compute SSIM between two images
/// threshold: SSIM score above this value is considered similar (default: 0.85)
pub fn compute_ssim(data_a: &[u8], data_b: &[u8], threshold: Option<f64>) -> TecResult<SsimResult> {
    let threshold = threshold.unwrap_or(0.85);
    let img_a = image::load_from_memory(data_a)?.to_luma8();
    let img_b = image::load_from_memory(data_b)?.to_luma8();

    // Resize to match dimensions (use the smaller dimensions)
    let (w, h) = if img_a.width() * img_a.height() < img_b.width() * img_b.height() {
        (img_a.width(), img_a.height())
    } else {
        (img_b.width(), img_b.height())
    };

    let img_a = image::imageops::resize(&img_a, w, h, image::imageops::FilterType::Lanczos3);
    let img_b = image::imageops::resize(&img_b, w, h, image::imageops::FilterType::Lanczos3);

    let score = compute_ssim_impl(&img_a, &img_b);

    Ok(SsimResult {
        score,
        is_similar: score > threshold,
    })
}

/// Simplified SSIM implementation (luminance-based)
fn compute_ssim_impl(a: &image::GrayImage, b: &image::GrayImage) -> f64 {
    let (w, h) = (a.width() as f64, b.height() as f64);
    let n = w * h;

    if n < 1.0 {
        return 0.0;
    }

    let c1: f64 = (0.01f64 * 255.0f64).powi(2);
    let c2: f64 = (0.03f64 * 255.0f64).powi(2);

    let mut mean_a = 0.0f64;
    let mut mean_b = 0.0f64;

    for y in 0..a.height() {
        for x in 0..a.width() {
            mean_a += a.get_pixel(x, y).0[0] as f64;
            mean_b += b.get_pixel(x, y).0[0] as f64;
        }
    }
    mean_a /= n;
    mean_b /= n;

    let mut var_a = 0.0f64;
    let mut var_b = 0.0f64;
    let mut cov = 0.0f64;

    for y in 0..a.height() {
        for x in 0..a.width() {
            let da = a.get_pixel(x, y).0[0] as f64 - mean_a;
            let db = b.get_pixel(x, y).0[0] as f64 - mean_b;
            var_a += da * da;
            var_b += db * db;
            cov += da * db;
        }
    }
    var_a /= n - 1.0;
    var_b /= n - 1.0;
    cov /= n - 1.0;

    let numerator = (2.0 * mean_a * mean_b + c1) * (2.0 * cov + c2);
    let denominator = (mean_a.powi(2) + mean_b.powi(2) + c1) * (var_a + var_b + c2);

    if denominator == 0.0 {
        return if (mean_a - mean_b).abs() < 1e-6 { 1.0 } else { 0.0 };
    }

    numerator / denominator
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ssim_identical_images() {
        let mut img = image::RgbImage::new(64, 64);
        for pixel in img.pixels_mut() {
            *pixel = image::Rgb([128u8, 64, 32]);
        }
        let mut buf = std::io::Cursor::new(Vec::new());
        img.write_to(&mut buf, image::ImageFormat::Png).unwrap();
        let data = buf.into_inner();

        let result = compute_ssim(&data, &data, None).unwrap();
        assert!(result.score > 0.99);
        assert!(result.is_similar);
    }

    #[test]
    fn test_ssim_different_images() {
        let mut img_a = image::RgbImage::new(32, 32);
        let mut img_b = image::RgbImage::new(32, 32);
        for pixel in img_a.pixels_mut() {
            *pixel = image::Rgb([255u8, 255, 255]);
        }
        for pixel in img_b.pixels_mut() {
            *pixel = image::Rgb([0u8, 0, 0]);
        }
        let mut buf_a = std::io::Cursor::new(Vec::new());
        let mut buf_b = std::io::Cursor::new(Vec::new());
        img_a.write_to(&mut buf_a, image::ImageFormat::Png).unwrap();
        img_b.write_to(&mut buf_b, image::ImageFormat::Png).unwrap();

        let result = compute_ssim(buf_a.get_ref(), buf_b.get_ref(), None).unwrap();
        assert!(result.score < 0.5);
        assert!(!result.is_similar);
    }
}
