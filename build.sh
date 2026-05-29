#!/usr/bin/env bash
set -e

echo "=========================================="
echo "  Tec Editor 编译脚本"
echo "=========================================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "[错误] 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查 Rust
if ! command -v cargo &> /dev/null; then
    echo "[错误] 未找到 Rust，请先安装 Rust"
    exit 1
fi

# 安装依赖
echo "[1/4] 安装前端依赖..."
npm install

# 构建前端
echo "[2/4] 构建前端资源..."
npm run build

# 检查 Tauri CLI
echo "[3/4] 检查 Tauri CLI..."
if ! command -v cargo-tauri &> /dev/null; then
    echo "正在安装 Tauri CLI..."
    cargo install tauri-cli
fi

# 构建 Tauri 应用
echo "[4/4] 编译可执行文件..."
cd src-tauri
cargo tauri build

echo ""
echo "=========================================="
echo "  编译完成！"
echo "=========================================="
echo "输出目录: src-tauri/target/release/bundle"
echo ""
