@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ==========================================
echo  Tec Editor 开发服务器
echo ==========================================
echo.

:: 检查 Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo [错误] 未找到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

:: 检查 Rust
cargo --version >nul 2>nul
if errorlevel 1 (
    echo [错误] 未找到 Rust，请先安装 Rust
    pause
    exit /b 1
)

:: 安装前端依赖（如未安装）
if not exist "node_modules\" (
    echo [1/2] 安装前端依赖...
    call npm install
    if errorlevel 1 (
        echo [错误] 前端依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo [1/2] 前端依赖已安装
)

:: 启动 Tauri 开发服务器
echo [2/2] 启动 Tauri 开发服务器（热重载）...
echo.
echo 提示：这会启动 Vite 前端开发服务器 ^(端口 5173^)
echo      然后启动 Tauri 窗口加载该地址
echo      修改代码后会自动刷新
echo.
echo 按 Ctrl+C 停止开发服务器
echo.
cd /d "%~dp0"
cargo tauri dev

if errorlevel 1 (
    echo.
    echo [错误] 开发服务器退出异常
    pause
    exit /b 1
)
