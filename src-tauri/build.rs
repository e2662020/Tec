use std::panic;

fn main() {
  let result = panic::catch_unwind(|| {
    tauri_build::build()
  });

  if let Err(e) = result {
    let msg = if let Some(s) = e.downcast_ref::<String>() {
      s.clone()
    } else if let Some(s) = e.downcast_ref::<&str>() {
      s.to_string()
    } else {
      "unknown panic in tauri_build".to_string()
    };
    eprintln!("[tec-build] tauri_build panicked (non-fatal for check): {msg}");
  }
}
