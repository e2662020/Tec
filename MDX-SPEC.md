# MDX File Format Specification v1.0

> Tec Markdown 编辑器专用包装格式

## 1. Overview

MDX 是一种基于 ZIP 容器的文档包装格式，旨在将 Markdown 正文及其依赖的资源（图片、主题、插件配置等）封装为单一文件，实现「分享即开即用」。本规范定义 MDX v1.0 的内部结构、元数据格式及处理流程。

## 2. File Container

### 2.1 Container Format

| Field | Value |
|-------|-------|
| 容器 | ZIP 归档 |
| 压缩方式 | Store（仅存储，不压缩） |
| 文件扩展名 | `.mdx` |
| MIME Type | `application/vnd.tec.mdx` |
| 最大文件大小 | 无硬限制（建议单文件不超过 500MB） |

> **选择 Store 压缩的原因**：图片等资源已是压缩格式（WebP），二次压缩无收益且影响随机访问性能。

### 2.2 Entry Order

归档内的 entry 顺序固定如下：

```
document.mdx (ZIP)
├── content.md
├── assets/
│   ├── a1b2c3d4.webp
│   ├── e5f6g7h8.webp
│   └── manifest.json
├── theme.json
├── color_map.json
└── meta.json
```

所有 entry 的名称**区分大小写**，必须使用小写字母和连字符命名。

## 3. Entry Specification

### 3.1 `content.md`

| Field | Requirement |
|-------|-------------|
| 存在性 | **必需** |
| 编码 | UTF-8（无 BOM） |
| 换行符 | LF（`\n`） |
| 内容 | 标准 Markdown 正文 |

图片引用路径必须使用相对路径指向 `assets/` 目录，格式为 `![alt](assets/hash.webp)`。

### 3.2 `assets/` Directory

#### 3.2.1 Image Files

| Field | Requirement |
|-------|-------------|
| 命名规则 | `{hash}.{ext}` |
| 哈希算法 | SHA-256（取前 8 位十六进制作为文件名） |
| 编码格式 | WebP（推荐），兼容 PNG/JPEG |
| 元数据记录 | 在 `manifest.json` 中 |

#### 3.2.2 `manifest.json`

```json
{
  "version": "1.0",
  "assets": {
    "a1b2c3d4": {
      "original_name": "photo.jpg",
      "hash": "a1b2c3d4e5f6...",
      "hash_algorithm": "sha256",
      "similar_group": "grp_01",
      "is_primary": true,
      "mtime": "2026-05-29T10:00:00Z",
      "compressed": true,
      "original_format": "jpeg",
      "width": 1920,
      "height": 1080,
      "file_size": 42500
    }
  }
}
```

**字段说明**：

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | **yes** | manifest 格式版本 |
| `assets` | object | **yes** | 键为 hash，值为 asset 元数据 |
| `original_name` | string | **yes** | 导入时的原始文件名 |
| `hash` | string | **yes** | asset 的完整哈希值 |
| `hash_algorithm` | string | **yes** | 哈希算法名称 |
| `similar_group` | string | no | 相似图片组 ID |
| `is_primary` | boolean | no | 是否为主图（组内默认引用） |
| `mtime` | string (ISO 8601) | **yes** | 文件最后修改时间 |
| `compressed` | boolean | **yes** | 是否已压缩为 WebP |
| `original_format` | string | no | 原始图片格式 |
| `width` | integer | no | 图片宽度（像素） |
| `height` | integer | no | 图片高度（像素） |
| `file_size` | integer | no | 文件大小（字节） |

### 3.3 `theme.json`

```json
{
  "theme": "tec-light",
  "type": "builtin",
  "custom_css": null
}
```

**字段说明**：

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `theme` | string | **yes** | 内置主题名或自定义主题标识 |
| `type` | string | **yes** | `builtin` 或 `custom` |
| `custom_css` | string | no | 自定义主题 CSS 内容（type 为 custom 时必填） |

### 3.4 `color_map.json`

```json
{
  "version": "1.0",
  "colors": {
    "R": "#E74C3C",
    "G": "#2ECC71",
    "B": "#3498DB",
    "O": "#E67E22",
    "P": "#9B59B6",
    "Y": "#F1C40F",
    "C": "#1ABC9C",
    "K": "#2C3E50",
    "W": "#95A5A6",
    "H": "#E91E63"
  },
  "custom_colors": {
    "brand": "#6C5CE7",
    "accent": "#00B894"
  }
}
```

**字段说明**：

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | **yes** | 颜色映射格式版本 |
| `colors` | object | **yes** | 预定义颜色映射（键为单字符，值为十六进制色值） |
| `custom_colors` | object | no | 用户自定义颜色映射 |

**预定义颜色表**：

| 键 | 色值 | 名称 |
|----|------|------|
| R | `#E74C3C` | 红 |
| G | `#2ECC71` | 绿 |
| B | `#3498DB` | 蓝 |
| O | `#E67E22` | 橙 |
| P | `#9B59B6` | 紫 |
| Y | `#F1C40F` | 黄 |
| C | `#1ABC9C` | 青 |
| K | `#2C3E50` | 黑 |
| W | `#95A5A6` | 灰 |
| H | `#E91E63` | 粉/Highlight |

### 3.5 `meta.json`

```json
{
  "version": "1.0",
  "created": "2026-05-29T10:00:00Z",
  "modified": "2026-05-29T11:30:00Z",
  "syntax_extensions": [
    "colored-text",
    "columns",
    "align",
    "latex",
    "highlight",
    "superscript",
    "subscript",
    "footnote",
    "emoji",
    "toc",
    "task-list"
  ],
  "statistics": {
    "characters": 1234,
    "words": 200,
    "images": 3,
    "headings": 5
  },
  "plugin_data": {},
  "editor_version": "0.0.0"
}
```

**字段说明**：

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | **yes** | MDX 格式版本号 |
| `created` | string (ISO 8601) | **yes** | 文档创建时间 |
| `modified` | string (ISO 8601) | **yes** | 文档最后修改时间 |
| `syntax_extensions` | string[] | **yes** | 启用的扩展语法列表 |
| `statistics` | object | no | 文档统计信息 |
| `plugin_data` | object | no | 插件数据存储 |
| `editor_version` | string | no | 创建文档的编辑器版本 |

**支持的扩展语法标识符**：

| 标识符 | 语法扩展 |
|--------|----------|
| `colored-text` | 有色文字 |
| `columns` | 分栏 |
| `align` | 文字对齐 |
| `latex` | LaTeX 公式 |
| `highlight` | 高亮标记 |
| `superscript` | 上标 |
| `subscript` | 下标 |
| `footnote` | 脚注 |
| `emoji` | 表情符号 |
| `toc` | 目录生成 |
| `task-list` | 任务列表 |

## 4. 扩展语法参考

### 4.1 有色文字

```
语法: &X文本内容&X

常用颜色键:
  &R红色文字&R    &G绿色文字&G    &B蓝色文字&B
  &O橙色文字&O    &P紫色文字&P    &Y黄色文字&Y

自定义色值:
  &#FF0000红色文字&#FF0000
```

### 4.2 分栏

```
自动均分:
  ||2
  内容...
  |||

手动指定:
  ||3
  第一栏...
  || 第二栏...
  || 第三栏...
  |||

打印流动:
  ||2:print
  长内容...
  |||
```

### 4.3 文字对齐

```
=== 居中内容 ===
>>> 右对齐内容 >>>
<<< 左对齐内容 <<<
```

### 4.4 LaTeX 公式

```
$$ 块级公式 $$
$ 行内公式 $
/()/ 块级公式（替代语法） /()/
/( 行内公式（替代语法） /)
```

## 5. Performance Design

### 5.1 读取策略

1. 打开文件时仅读取 ZIP Central Directory，建立 entry 索引
2. 按需解压：只解码当前视口可见的 entry
3. content.md 完整加载到内存

### 5.2 写入策略

1. 增量保存：只替换已变更的 entry，不重写整个 ZIP
2. 原子写入：先写入 `.tmp` 临时文件，成功后再 `rename` 替换原文件
3. 写入失败时保留原文件不变

### 5.3 图片处理

1. 导入时自动计算 SHA-256 哈希（前 8 位为文件名）
2. 静默压缩为 WebP（有损，可在设置中关闭）
3. pHash 计算汉明距离，自动检测相似图片（阈值 ≤ 10）
4. 图片流式解码：IntersectionObserver 控制，仅视口内图片解码

## 6. Conversion

### 6.1 `.md` → `.mdx`

1. 扫描所有 `![](...)` 图片引用
2. 本地图片：复制 → hash 重命名 → pHash 检测相似性 → 归组 → 入库 `assets/` → 替换引用路径
3. 网络图片：逐张用户确认是否下载（下载后标记为蓝色）
4. 生成 `manifest.json`、`theme.json`、`color_map.json`、`meta.json`
5. 打包为 ZIP

### 6.2 `.mdx` → `.md`

1. 提取 `content.md`
2. 图片引用还原为原始文件路径（`assets/hash.webp` → `/original/path/photo.jpg`）
3. 保存为纯 `.md` 文件（资源不内嵌）

## 7. 兼容性

| 版本 | 描述 |
|------|------|
| v1.0 | 初始版本 |

> 向前兼容：未来版本的 Tec 编辑器应能读取 v1.0 格式的 MDX 文件。
> 未知字段应被忽略，不应导致解析失败。

---

> Document Version: 1.0
> Last Updated: 2026-05-31