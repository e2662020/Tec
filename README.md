# Tec (Beta) — Typora 风格 Markdown 编辑器

全平台、高性能的所见即所得 Markdown 编辑器，采用 **Tauri v2** 构建，接近原生性能。

## 核心特性

- **WYSIWYG 混合模式** — 块级元素永久渲染，行内标记光标进入时暴露源码
- **源码模式** — `Ctrl+/` 一键切换 CodeMirror 6 纯源码编辑
- **`.mdx` 格式** — ZIP 包内嵌全部资源，分享即开即用
- **图片库** — 右侧面板，拖入自动入库，pHash/dHash/SSIM 相似检测与合并
- **扩展语法** — 有色文字、分栏、文字对齐、LaTeX 双语法
- **插件系统** — 语法扩展 + UI 扩展 + 生命周期钩子
- **8 个内置主题** — 兼容 Typora 主题，支持自定义主题热切换
- **全格式导出** — 捆绑 Pandoc，支持 PDF/HTML/docx/ePub/LaTeX 等

## 技术栈

| 层 | 选择 |
|----|------|
| 桌面框架 | Tauri v2 (Rust 后端 + Web 前端) |
| 前端 | React 19 + TypeScript + Vite 8 |
| 编辑器引擎 | Milkdown 7 (基于 ProseMirror) |
| 源码模式 | CodeMirror 6 |
| 状态管理 | Zustand |
| LaTeX | KaTeX |
| 代码高亮 | Shiki |
| 图片处理 | Rust image crate (dHash/pHash/SSIM + WebP) |
| 测试 | Vitest + Playwright + cargo test |

## 快速开始

### 环境要求

- **Node.js** >= 20
- **Rust** >= 1.77 (stable-x86_64-pc-windows-msvc)
- **Visual Studio Build Tools** (Windows，含 C++ 工作负载)

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev          # 仅启动前端开发服务器
npx tauri dev        # 启动完整 Tauri 应用（含 Rust 后端）
```

### 构建

```bash
npm run build        # 前端构建
npx tauri build      # 完整 Tauri 打包（Windows/macOS/Linux）
```

### 测试

```bash
npm test             # 前端单元测试 (Vitest)
cargo test           # Rust 端单元测试 (在 src-tauri/ 目录下运行)
```

## 项目结构

```
Tec/
├── src/                       # 前端源码
│   ├── components/
│   │   ├── editor/            # 编辑器 (WYSIWYG + 源码模式 + 搜索替换)
│   │   ├── sidebar/           # 左侧面板 (文件树 + 大纲)
│   │   ├── gallery/           # 右侧图片库面板
│   │   ├── menubar/           # 顶部菜单栏
│   │   ├── statusbar/         # 底部状态栏
│   │   └── theme/             # 主题选择器
│   ├── extensions/            # Milkdown 自定义扩展 (11个)
│   ├── hooks/                 # React Hooks (文件操作/图片操作/自动保存)
│   ├── store/                 # Zustand 状态管理
│   ├── styles/
│   │   ├── themes/            # 8 个内置主题 CSS
│   │   ├── variables.css      # CSS 变量主题引擎
│   │   ├── layout.css         # 布局样式
│   │   └── editor-theme.css   # 编辑器渲染样式
│   ├── types/                 # TypeScript 类型定义
│   └── __tests__/             # 前端单元测试
├── src-tauri/                 # Rust 后端
│   └── src/
│       ├── commands/          # Tauri Commands (文件/MDX/导出)
│       ├── image/             # 图片处理 (哈希/压缩/SSIM/相似检测)
│       └── error.rs           # 统一错误类型
├── DESIGN.md                  # 完整设计文档
└── package.json
```

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+S` | 保存文件 |
| `Ctrl+O` | 打开文件 |
| `Ctrl+N` | 新建文档 |
| `Ctrl+/` | 切换源码/WYSIWYG 模式 |
| `Ctrl+F` | 搜索替换 |
| `Ctrl+Shift+1` | 文件面板 |
| `Ctrl+Shift+2` | 大纲面板 |
| `Ctrl+Shift+L` | 切换侧边栏 |

## 扩展语法

| 语法 | 示例 |
|------|------|
| 有色文字 | `&R红色文字&R` 或 `&#FF0000自定义色&#FF0000` |
| 分栏 | `\|\|2` 开启 → `\|\|` 分隔 → `\|\|\|` 结束 |
| 居中 | `=== 居中文字 ===` |
| 右对齐 | `>>> 右对齐 >>>` |
| 左对齐 | `<<< 左对齐 <<<` |
| LaTeX | `$$块级公式$$` / `$行内公式$` |
| 高亮 | `==高亮文字==` |
| 上标 | `^上标^` |
| 下标 | `~下标~` |
| 脚注 | `[^1]` 引用 + `[^1]: 定义` |

## 主题

内置 8 个主题，热切换即时生效：

| 主题 | 类型 |
|------|------|
| Tec Light | 浅色 (品牌默认) |
| Tec Dark | 深色 (品牌) |
| GitHub | 浅色 |
| Newsprint | 浅色 |
| Night | 深色 |
| Pixyll | 浅色 |
| Whitey | 浅色 |
| Gothic | 深色 |

自定义主题放在 `~/.tec/themes/` 目录下即可在设置中选择。

## 开发阶段

- [x] Phase 1 — 骨架搭建 (Tauri + React + Milkdown + 文件面板)
- [x] Phase 2 — 编辑器核心扩展 (11 个自定义语法扩展)
- [x] Phase 3 — .mdx 格式 (ZIP 打包/解包/图片入库)
- [x] Phase 4 — 图片库系统 (相似检测/合并/拖入)
- [x] Phase 5 — 主题系统 (8 个内置主题 + 自定义 + 热切换)
- [x] Phase 6 — 导出系统 (Pandoc 全格式)
- [x] Phase 7 — 体验完善 (搜索替换/自动保存/大纲/快捷键)
- [x] Phase 8 — 测试 (Vitest + Rust 单元测试)

## 许可

MIT License
