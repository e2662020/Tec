mod commands;
mod error;
mod image;

use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            log::info!("Tec (Beta) starting up...");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::file::read_file,
            commands::file::write_file,
            commands::file::get_file_info,
            commands::file::list_folder,
            commands::file::diagnose_write,
            commands::file::list_assets,
            commands::file::save_original_to_assets,
            commands::mdx::read_mdx,
            commands::mdx::write_mdx,
            commands::mdx::convert_md_to_mdx,
            commands::mdx::convert_mdx_to_md,
            commands::export::export_file,
            image::commands::import_image,
            image::commands::compress_image,
            image::commands::detect_similar_images,
            image::commands::detect_similar_manual,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
