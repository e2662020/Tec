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
echo [1/5] 安装前端依赖...
call npm install
if errorlevel 1 (
    echo [错误] 前端依赖安装失败
    exit /b 1
)

:: 生成图标
echo [2/5] 生成应用图标...
node scripts/generate-icons.cjs
if errorlevel 1 (
    echo [警告] 图标生成失败，使用默认图标
)

:: 构建前端
echo [3/5] 构建前端资源...
call npm run build
if errorlevel 1 (
    echo [错误] 前端构建失败
    exit /b 1
)

:: 构建 Tauri 应用
echo [4/5] 编译 Windows 可执行文件...
cd src-tauri
cargo tauri build
if errorlevel 1 (
    echo [错误] Tauri 编译失败
    exit /b 1
)

:: 返回项目根目录
echo [5/5] 编译完成
cd /d "%~dp0"

echo.
echo ==========================================
echo  编译完成！
echo ==========================================
echo 输出目录: src-tauri\target\release\bundle
echo.
pause
