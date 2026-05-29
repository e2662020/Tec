@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ==========================================
echo  Tec Editor 编译脚本
echo ==========================================
echo.

:: 检查 Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo [错误] 未找到 Node.js，请先安装 Node.js
    exit /b 1
)

:: 检查 Rust
cargo --version >nul 2>nul
if errorlevel 1 (
    echo [错误] 未找到 Rust，请先安装 Rust
    exit /b 1
)

:: 安装依赖
echo [1/4] 安装前端依赖...
call npm install
if errorlevel 1 (
    echo [错误] 前端依赖安装失败
    exit /b 1
)

:: 构建前端
echo [2/4] 构建前端资源...
call npm run build
if errorlevel 1 (
    echo [错误] 前端构建失败
    exit /b 1
)

:: 安装 Tauri CLI（如未安装）
echo [3/4] 检查 Tauri CLI...
cargo tauri --version >nul 2>nul
if errorlevel 1 (
    echo 正在安装 Tauri CLI...
    cargo install tauri-cli
)

:: 构建 Tauri 应用
echo [4/4] 编译 Windows 可执行文件...
cd src-tauri
cargo tauri build
if errorlevel 1 (
    echo [错误] Tauri 编译失败
    exit /b 1
)

echo.
echo ==========================================
echo  编译完成！
echo ==========================================
echo 输出目录: src-tauri\target\release\bundle
echo.
pause
