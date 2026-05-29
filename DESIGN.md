# Tec (Beta) — 完整设计方案

## Context

构建一个全平台、高性能的 Typora 风格 Markdown 编辑器。核心差异化功能：
- `.mdx` 格式（ZIP 包，内嵌所有资源，分享即开即用）
- 图片库（右侧面板，拖入自动入库，相似图片合并）
- 扩展语法（有色文字、分栏、对齐）
- 插件系统
- 兼容 Typora 主题 + 自定义主题

---

## 1. 技术栈

| 层 | 选择 | 理由 |
|----|------|------|
| 桌面框架 | **Tauri v2** | 接近原生性能，体积 ~5-10MB，Rust 后端 + Web 前端 |
| 前端框架 | **React 18 + TypeScript** | 编辑器生态最成熟，与 Milkdown/Tiptap 集成好 |
| 构建工具 | **Vite 5** | 快速 HMR，Tauri 官方推荐 |
| 编辑器引擎 | **Milkdown** (基于 ProseMirror) | 专为 Typora-like WYSIWYG 设计，插件化架构 |
| 状态管理 | **Zustand** | 轻量、不可变更新、符合编码规范 |
| 样式方案 | **CSS 变量 + PostCSS** | 主题系统驱动，无运行时 CSS-in-JS 开销 |
| LaTeX 渲染 | **KaTeX** | 比 MathJax 快约 10x |
| 代码高亮 | **Shiki** | 与 VS Code 同等质量，支持 TextMate 语法 |
| 图片处理 | **Rust image crate** | dHash/pHash/SSIM 算法 + WebP 编码 |
| ZIP 处理 | **Rust zip crate** | 流式读写，增量修改 |
| 导出 | **捆绑 Pandoc** | 支持全部导出格式（PDF/HTML/docx/ePub/LaTeX等） |
| 测试 | **Vitest + Playwright + cargo test** | 前/后端测试全覆盖 |

---

## 2. 编辑器架构

### 2.1 WYSIWYG 混合模式（核心体验）

- **块级结构**（标题、表格、列表、代码块）→ 永远渲染，不显示源码
  - 表格：可视化编辑（Tab 添加行，拖拽调整列宽）
- **行内标记**（加粗、斜体、有色文字、分栏分隔符）→ 光标进入行时显示标记源码，光标离开后渲染

### 2.2 源代码模式

- `Ctrl+/` 切换为纯源码模式
- 用独立的 CodeMirror 6 实例渲染（语法高亮、Markdown 感知）
- 与 WYSIWYG 模式内容双向同步

### 2.3 Milkdown 扩展列表

```
extensions/
├── tec-colored-text/     # &R文本&R (颜色标记扩展)
├── tec-columns/          # ||N ... || ... ||| (分栏扩展)
├── tec-align/            # ===centered===, >>>right>>>, <<<left<<<
├── tec-latex-double/     # $$公式$$ 块级 + /(/)行内
├── tec-frontmatter/      # YAML Front Matter 可视化
├── tec-toc/              # [TOC] 目录自动生成
├── tec-footnote/         # 脚注
├── tec-task-list/        # - [ ] 任务列表
├── tec-highlight/        # ==text== 高亮
├── tec-sup-sub/          # 上标^text^ 下标~text~
└── tec-emoji/            # :smile: 表情
```

### 2.4 光标/选择行为

- 和 Typora 一致：行内标记的源码在光标进入时暴露
- 分栏区域：`||` 分隔符在编辑时可见，渲染后隐藏

---

## 3. .mdx 文件格式

### 3.1 内部结构

```
document.mdx (ZIP, Store 压缩)
├── content.md              # 正文（图片引用指向 assets/）
├── assets/
│   ├── a1b2c3d4.webp        # hash 命名的图片
│   ├── e5f6g7h8.webp
│   └── manifest.json        # 图片元数据
│       {
│         "a1b2c3d4": {
│           "original_name": "photo.jpg",
│           "hash": "a1b2c3d4...",
│           "similar_group": "grp_01",
│           "is_primary": true,
│           "mtime": "2026-05-29T10:00:00Z",
│           "compressed": true
│         }
│       }
├── theme.json               # 当前主题引用（内置主题名 或 自定义主题 CSS）
├── color_map.json           # 颜色映射表 {"R": "#FF0000", "G": "#00FF00", ...}
└── meta.json                # 文档元数据
    {
      "version": "1.0",
      "created": "2026-05-29T...",
      "modified": "2026-05-29T...",
      "syntax_extensions": ["colored-text", "columns", "align", "latex"],
      "plugin_data": {}
    }
```

### 3.2 性能设计（仿 .docx 策略）

- **不解压到磁盘**：打开时读 ZIP Central Directory → 索引 → 按需解压到内存
- **增量修改**：保存时只替换变化的 entry，不重写整个 ZIP
- **图片流式解码**：只在进入视口时才从 ZIP 读取并解码图片
- **原子写入**：先写 `.tmp` 文件，成功后再 `rename` 替换原文件

### 3.3 .md ↔ .mdx 转换

**md → mdx**：
1. 扫描所有 `![](...)` 引用
2. 本地图片：复制→hash重命名→pHash检测→归组→入库 assets/ →替换引用路径
3. 网络图片：弹窗让用户逐张选择（下载则标蓝）→同上流程
4. 打包为 .mdx ZIP

**mdx → md**：
1. 提取 content.md
2. 图片引用还原为原始文件路径（`assets/hash.webp` → `/original/path/photo.jpg`）
3. 保存为纯 .md（资源不内嵌）

---

## 4. 图片库系统

### 4.1 拖入流程

```
用户拖入图片
  → 复制到 assets/，hash 命名
  → 压缩为 WebP（有损，静默运行，可在设置中关闭）
  → pHash 快速检测（与库内已有图片比较）
  → 如发现相似 → 右下角 toast 提示 "发现相似图片，是否合并？"
  → 自动嵌入 ![](assets/hash.webp)
  → 更新 manifest.json
```

### 4.2 相似图片检测

| 场景 | 算法 | 阈值 |
|------|------|------|
| 自动检测（拖入时） | pHash（DCT 64位，汉明距离） | 汉明距离 ≤ 10 |
| 手动检测（用户主动触发） | dHash 粗筛 → SSIM 精筛（两级） | dHash ≤ 8 → SSIM > 0.85 |

在 Rust 端实现（image crate + 自研 dHash/pHash），通过 Tauri Command 异步调用。

### 4.3 合并策略

- 相似图片自动分组，默认选择**修改时间最新**的图片为主图
- 用户可手动切换组内主图
- 合并后所有 Markdown 引用更新为主图
- 非主图标记为可删除（不自动删除，用户手动清理）

### 4.4 右侧图片面板 UI

```
┌─────────────────────────┐
│ 🔍 搜索图片...           │
│ [网格] [列表]  [手动检测] │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 相似组 #1 (3张)   ▾ │ │
│ │ ┌────┐┌────┐┌────┐ │ │
│ │ │★主 ││    ││    │ │ │
│ │ └────┘└────┘└────┘ │ │
│ ├─────────────────────┤ │
│ │ photo-1.webp     ✕ │ │
│ │ 1024×768  42KB     │ │
│ ├─────────────────────┤ │
│ │ photo-2.webp     ✕ │ │
│ │ 1024×768  38KB     │ │
│ └─────────────────────┘ │
│ ┌──────┐                │
│ │img_01│ 独立图片     ✕ │
│ └──────┘                │
└─────────────────────────┘
```

- 网格/列表视图切换
- 搜索栏（按文件名/标签）
- 相似图片组折叠，组首为主图（★标记）
- 右键菜单：替换引用 / 删除 / 设为组内主图 / 保留原图不压缩 / 打开文件位置

---

## 5. 扩展语法规范

### 5.1 有色文字

```
语法: &X文本内容&X

颜色映射表 (在 .mdx 的 color_map.json 中，用户可自定义):
  R=#E74C3C (红)    G=#2ECC71 (绿)    B=#3498DB (蓝)
  O=#E67E22 (橙)    P=#9B59B6 (紫)    Y=#F1C40F (黄)
  C=#1ABC9C (青)    K=#2C3E50 (黑)    W=#95A5A6 (灰)
  H=#E91E63 (粉/Highlight)

也可以直接用 #RRGGBB: &#FF0000红色文字&#FF0000
```

### 5.2 分栏

```
模式1: 自动均分
||2
内容会自动按段落均分到 2 栏。
|||

模式2: 手动指定
||3
第一栏内容...
|| 第二栏内容...
|| 第三栏内容...
|||

模式3: 打印流动（屏幕预览时按均分显示，打印时优先占满每页左栏）
||2:print
很长很长的内容...
|||
```

### 5.3 文字对齐

```
=== 居中的文字 ===
>>> 右对齐的文字 >>>
<<< 左对齐的文字 <<<

块级示例:
=== ## 居中标题 ===
>>> 署名：Tec团队 >>>
```

### 5.4 LaTeX 公式

```
$$ 块级公式 $$     （标准语法）
/()/ 块级公式 /()/ （替代语法）
$ 行内公式 $       （行内）
/( 行内公式 /)     （行内替代）
```

---

## 6. 主题系统

### 6.1 内置主题（必须迁移）

| # | 主题名 | 类型 | 迁移来源 |
|---|--------|------|----------|
| 1 | **GitHub** | 浅色 | Typora GitHub 主题 |
| 2 | Newsprint | 浅色 | Typora Newsprint |
| 3 | Night | 深色 | Typora Night |
| 4 | Pixyll | 浅色 | Typora Pixyll |
| 5 | Whitey | 浅色 | Typora Whitey |
| 6 | Gothic | 深色 | Typora Gothic |
| 7 | Tec Light | 浅色 | 自研（Tec 品牌主题） |
| 8 | Tec Dark | 深色 | 自研（Tec 品牌主题） |

### 6.2 主题规范

- 所有内置主题使用 **CSS 变量** 驱动
- 变量体系：

```css
:root {
  --tec-bg-primary: #ffffff;
  --tec-bg-secondary: #f6f8fa;
  --tec-text-primary: #24292f;
  --tec-text-secondary: #57606a;
  --tec-accent: #0969da;
  --tec-border: #d0d7de;
  --tec-code-bg: #afb8c133;
  --tec-font-mono: 'Cascadia Code', 'Fira Code', monospace;
  --tec-font-sans: -apple-system, BlinkMacSystemFont, sans-serif;
  --tec-font-serif: 'Charter', 'Georgia', serif;
  --tec-line-height: 1.6;
  --tec-content-width: 860px;
  --tec-heading-scale: 1.0; /* 标题缩放 */
}
```

### 6.3 自定义主题

- 用户可以在 `~/.tec/themes/` 下创建 `my-theme.css` 文件
- 格式：覆盖 `--tec-*` CSS 变量 + 可选的额外 CSS 规则
- 主题文件夹支持预览图（`preview.png`）
- 用户在设置中选择自定义主题后，CSS 文件内容在保存 .mdx 时被内嵌到 `theme.json` 中

---

## 7. 插件系统

### 7.1 插件能力

| 层级 | 能力 | API |
|------|------|-----|
| 语法扩展 | 注册 Markdown 扩展语法 + 渲染规则 | `ctx.markdown.registerBlock()` |
| UI 扩展 | 注入 UI 组件 | `ctx.ui.addPanel()`, `ctx.ui.addToolbarButton()` |
| 生命周期 | 事件钩子 | `ctx.on('file:open', fn)`, `ctx.on('file:save', fn)` |

### 7.2 插件结构

```
~/.tec/plugins/my-plugin/
├── manifest.json
└── plugin.js
```

```typescript
// manifest.json
{
  "name": "tec-mermaid",
  "version": "1.0.0",
  "description": "Mermaid diagram support",
  "author": "...",
  "extends": { "markdown": ["mermaid"], "renderer": ["mermaid"] }
}

// plugin.js
export default {
  activate(ctx) {
    ctx.markdown.registerBlock('mermaid', {
      pattern: /^```mermaid\n([\s\S]*?)\n```$/gm,
      render: (code) => mermaid.render('diagram', code)
    })
  },
  deactivate() {}
}
```

### 7.3 安全

- 插件无原生文件系统访问（通过 Tauri Command 白名单）
- 仅能调用 `ctx` 暴露的 API
- 插件加载前需用户授权

---

## 8. 左侧面板

与 Typora 完全一致：

- **文件面板**：打开一个文件夹 → 显示 `.md`/`.mdx` 文件树
- **大纲面板**：当前文档标题树（H1-H6），点击跳转
- 两个面板之间切换（Tab 切换，Ctrl+Shift+1/2）
- 上次打开的文件夹路径持久化到本地配置

---

## 9. UI 布局

Typora 电子书般极简 UI：

```
┌──────────┬────────────────────────────┬──────────┐
│ 文件/大纲 │         编辑区               │ 图片库   │
│ 面板     │    ┌─────────────────┐     │ 面板     │
│          │    │  标题 (居中)     │     │          │
│ (可折叠)  │    │                 │     │ (可折叠)  │
│ ┌──────┐ │    │  正文内容...     │     │ ┌──────┐ │
│ │文件1  │ │    │                 │     │ │图1   │ │
│ │文件2  │ │    │  ||2            │     │ │图2   │ │
│ │文件3  │ │    │  ...分栏内容    │     │ │图3   │ │
│ └──────┘ │    │  |||            │     │ └──────┘ │
│          │    │                 │     │          │
│          │    │  字数: 1,234    │     │          │
│          │    └─────────────────┘     │          │
├──────────┴────────────────────────────┴──────────┤
│  状态栏: 模式 | 主题 | 缩放 | 行:列               │
└──────────────────────────────────────────────────┘
```

- **无传统工具栏**，界面极简
- 顶部可显示迷你菜单栏（文件/编辑/段落/格式/主题/视图/帮助）
- 内容区居中，最大宽度 ~860px
- 状态栏在底部（可选隐藏）

---

## 10. 性能架构

### 10.1 大文件策略

- 虚拟滚动：只渲染视口 + 上下各 50% 缓冲区
- ProseMirror 天然支持局部重渲染（非整个 DOM 刷新）
- 图片懒加载：IntersectionObserver，视口外不解码

### 10.2 输入性能

- Milkdown 的 ProseMirror 基于事务的增量更新（非全文重解析）
- 输入事件合并到 requestAnimationFrame 周期
- LaTeX 公式延迟渲染（只有进入视口时才 run KaTeX）

### 10.3 I/O 性能

- `.mdx` 打开：只读 ZIP Central Directory → 索引 → 按需解压
- `.mdx` 保存：增量替换 changed entries
- 图片入库：在 Rust 端异步执行压缩/哈希，不阻塞 UI 线程

---

## 11. Rust 端职责

```
src-tauri/src/
├── main.rs              # Tauri 入口
├── lib.rs               # 库根
├── commands/
│   ├── file.rs          # 文件打开/保存/新建
│   ├── mdx.rs           # MDX ZIP 打包/解包/转换
│   └── export.rs        # Pandoc 导出命令封装
├── image/
│   ├── mod.rs
│   ├── hash.rs          # dHash, pHash 实现
│   ├── ssim.rs          # SSIM 实现
│   └── compress.rs      # WebP 有损压缩
└── error.rs             # 统一错误类型
```

**Tauri Commands（前端通过 invoke 调用）**：
- `open_mdx(path) → MdxDocument`
- `save_mdx(path, content, assets) → Result<()>`
- `import_image(source_path) → ImageMeta`（hash/压缩/归组）
- `detect_similar_images(manifest) → Vec<SimilarGroup>`
- `detect_similar_manual(manifest) → Vec<SimilarGroup>`（dHash+SSIM 两级）
- `convert_md_to_mdx(md_path, download_remote: Vec<bool>) → Result<()>`
- `convert_mdx_to_md(mdx_path) → Result<()>`
- `export_pandoc(source, format) → Result<Vec<u8>>`
- `get_theme_list() → Vec<ThemeInfo>`

---

## 12. 开发阶段

### Phase 1: 骨架搭建
- Tauri + React + Vite 项目骨架
- Milkdown 基本集成（WYSIWYG 编辑 + 源码模式切换）
- 基础文件打开/保存（纯 .md）
- 左侧文件面板
- Zustand 状态管理初始化

### Phase 2: 编辑器核心
- Milkdown 扩展实现（有色文字、分栏、对齐、LaTeX 双语法）
- 颜色映射系统
- 表格可视化编辑
- 脚注、任务列表、高亮、上标下标、表情

### Phase 3: .mdx 格式
- Rust 端 ZIP 操作（打包/解包/增量保存）
- .md ↔ .mdx 转换
- 图片入库流程（hash/压缩/pHash 检测）
- `manifest.json` 管理

### Phase 4: 图片库
- 右侧图片面板 UI
- 相似图片手动检测（dHash + SSIM）
- 合并/替换/删除操作
- 拖入图片全流程

### Phase 5: 主题系统
- CSS 变量主题引擎
- 8 个内置主题迁移/开发
- 自定义主题支持
- 主题热切换

### Phase 6: 导出 + 插件
- Pandoc 捆绑 + 全部导出格式
- 插件系统运行时
- 插件 API 实现
- 示例插件（如 Mermaid 支持）

### Phase 7: 体验完善
- 聚焦模式 / 打字机模式
- 拼写检查
- 搜索替换（含正则）
- 大纲面板
- 自动保存
- 键盘快捷键
- 多窗口/标签页

### Phase 8: 测试 + 发布
- Rust 单元测试
- 前端单元测试
- E2E 测试
- 性能基准测试
- 安装包构建（Windows/macOS/Linux）

---

## 13. 验证计划

### 单元测试
- Rust: `cargo test` — 所有 image/ 和 commands/ 模块
- 前端: `npx vitest run` — 扩展语法解析器、工具函数、状态管理

### 集成测试
- 打开 .md/.mdx 文件 → 正确渲染
- 拖入图片 → 自动入库 → 引用更新
- .md ↔ .mdx 转换 → 资源完整性

### E2E 测试 (Playwright + tauri-driver)
- 完整编辑流程（输入 → 渲染 → 保存 → 重新打开）
- 主题切换 → 所有内置主题无渲染异常
- 导出 → 所有格式生成有效文件
- 图片相似检测 → 正确分组

### 性能基准
- 打开 10万字 .mdx 文档 < 2 秒
- 输入延迟 < 16ms（单帧内完成）
- 大图片库（500+ 张）面板滚动 60fps
