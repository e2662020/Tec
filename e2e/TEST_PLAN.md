# Tec Markdown Editor - 测试计划文档

## 1. 测试概述

### 1.1 测试目标
验证 Tec Markdown 编辑器在编译后的桌面应用中的功能正确性、性能表现和稳定性。

### 1.2 测试范围
- **功能测试**：文件操作、编辑器功能、UI 交互
- **性能测试**：大文件加载、滚动流畅度、内存占用
- **兼容性测试**：不同主题、不同文档类型

### 1.3 测试环境
- **OS**: Linux (Ubuntu/Debian)
- **App**: Tec v0.1.0 (Tauri 构建)
- **Browser**: Chromium (Playwright)
- **Node**: v20+

---

## 2. 测试文件

### 2.1 大文件测试文档
- **路径**: `test-assets/large-test-doc.md`
- **大小**: ~200 KB
- **字数**: ~105,000 字符
- **图片**: 20 张引用
- **生成命令**:
  ```bash
  node scripts/generate-test-doc.cjs 100000 20 ./test-assets
  ```

### 2.2 文档内容结构
```
# 大型技术文档测试
- 多级标题 (H1-H4)
- 段落文本 (~800 段落)
- 无序列表 (~200 个)
- 代码块 (~100 个，8 种语言)
- 表格 (~50 个)
- 引用块 (~50 个)
- 图片引用 (20 张)
```

---

## 3. 测试用例

### 3.1 基础功能测试 (e2e/basic.spec.ts)

| 编号 | 测试项 | 预期结果 | 优先级 |
|------|--------|----------|--------|
| B-01 | 页面加载 | 标题显示 "tec" | P0 |
| B-02 | 空状态显示 | 显示 Tec 品牌、快捷键提示 | P0 |
| B-03 | 菜单栏 | 4 个菜单：文件/编辑/视图/帮助 | P0 |
| B-04 | 侧边栏默认隐藏 | width = 0px | P0 |
| B-05 | 设置面板打开/关闭 | Ctrl+, 打开，点击关闭按钮关闭 | P0 |
| B-06 | 关于对话框 | 帮助菜单 -> 关于 Tec 可打开 | P0 |
| B-07 | 水印图标 | 右下角可见，尺寸 > 100px | P1 |
| B-08 | 状态栏 | 显示 WYSIWYG、字数统计 | P0 |
| B-09 | 菜单下拉 | 所有菜单下拉正常显示/关闭 | P0 |

### 3.2 文件操作测试 (e2e/file-ops.spec.ts)

| 编号 | 测试项 | 预期结果 | 优先级 |
|------|--------|----------|--------|
| F-01 | 新建文件 | Ctrl+N 清空编辑器 | P0 |
| F-02 | 打开文件夹 | 文件菜单包含"打开文件夹" | P0 |
| F-03 | 侧边栏文件列表 | 视图菜单切换显示 | P0 |
| F-04 | 字数统计 | 空文件显示"字数: 0" | P0 |
| F-05 | 编辑器模式切换 | 编辑菜单包含"切换源码模式" | P0 |
| F-06 | 空文件处理 | 新建后显示空状态 | P0 |
| F-07 | 快捷键响应 | Ctrl+N / Ctrl+O 正常响应 | P0 |
| F-08 | 主题持久化 | localStorage 保存，刷新后恢复 | P1 |
| F-09 | 设置持久化 | localStorage 保存设置 | P1 |
| F-10 | 搜索替换 | Ctrl+F 打开搜索对话框 | P0 |

### 3.3 性能测试 (e2e/performance.spec.ts)

| 编号 | 测试项 | 目标值 | 优先级 |
|------|--------|--------|--------|
| P-01 | First Contentful Paint | < 1.5s | P0 |
| P-02 | Largest Contentful Paint | < 2.5s | P0 |
| P-03 | 设置面板打开 | < 100ms | P0 |
| P-04 | 菜单下拉渲染 | < 50ms | P0 |
| P-05 | 主题切换 | < 500ms | P1 |
| P-06 | 内存增长 | < 50MB | P1 |
| P-07 | 布局偏移 (CLS) | < 0.1 | P0 |
| P-08 | JS 包大小 | < 2MB | P1 |

### 3.4 大文件性能测试 (e2e/large-file.spec.ts)

| 编号 | 测试项 | 目标值 | 优先级 |
|------|--------|--------|--------|
| L-01 | 大文档加载时间 | < 2s | P0 |
| L-02 | 滚动 FPS | 平均 > 55fps，掉帧 < 5 | P0 |
| L-03 | 平滑滚动 | 5s 内滚动到底部 | P0 |
| L-04 | 图片加载 | 至少 10 张图片渲染 | P1 |
| L-05 | 内存占用 | 增加 < 200MB | P0 |
| L-06 | 搜索性能 | < 1s 打开+首结果 | P0 |
| L-07 | 主题切换 | < 1.5s (大文档下) | P1 |

---

## 4. 执行步骤

### 4.1 前置准备
```bash
# 1. 安装依赖
npm install

# 2. 安装 Playwright
npx playwright install chromium

# 3. 生成测试文档
node scripts/generate-test-doc.cjs 100000 20 ./test-assets

# 4. 编译应用
npm run build
npx tauri build
```

### 4.2 启动测试服务器
```bash
# 方式1: 开发服务器
npm run dev -- --port 5173

# 方式2: 预览服务器 (推荐，更接近生产环境)
npm run preview -- --port 5173
```

### 4.3 执行测试
```bash
# 全部测试
npx playwright test

# 基础功能测试
npx playwright test e2e/basic.spec.ts

# 文件操作测试
npx playwright test e2e/file-ops.spec.ts

# 性能测试
npx playwright test e2e/performance.spec.ts

# 大文件性能测试
npx playwright test e2e/large-file.spec.ts

# 带报告
npx playwright test --reporter=html
```

### 4.4 查看报告
```bash
npx playwright show-report
```

---

## 5. 测试数据

### 5.1 测试文档生成器
**文件**: `scripts/generate-test-doc.cjs`

**参数**:
- `targetChars`: 目标字符数 (默认 100000)
- `imageCount`: 图片数量 (默认 20)
- `outputDir`: 输出目录 (默认 ./test-assets)

**用法**:
```bash
node scripts/generate-test-doc.cjs [字符数] [图片数] [输出目录]
```

**示例**:
```bash
# 生成 10 万字、20 张图片的测试文档
node scripts/generate-test-doc.cjs 100000 20 ./test-assets

# 生成 5 万字、10 张图片的轻量测试文档
node scripts/generate-test-doc.cjs 50000 10 ./test-assets
```

### 5.2 文档内容分布
- 段落文本: ~60%
- 代码块: ~15%
- 列表: ~10%
- 表格: ~8%
- 引用: ~5%
- 图片引用: ~2%

---

## 6. 通过标准

### 6.1 功能测试
- 所有 P0 用例 100% 通过
- P1 用例通过率 > 90%

### 6.2 性能测试
- 所有性能指标达到目标值
- 无内存泄漏 (内存增长 < 200MB)
- 滚动流畅无卡顿

### 6.3 大文件测试
- 10 万字文档 2s 内加载完成
- 滚动平均 FPS > 55
- 内存占用合理

---

## 7. 问题记录

| 编号 | 问题描述 | 严重程度 | 状态 | 备注 |
|------|----------|----------|------|------|
| | | | | |

---

## 8. 附录

### 8.1 快捷键列表
| 快捷键 | 功能 |
|--------|------|
| Ctrl+N | 新建文件 |
| Ctrl+O | 打开文件 |
| Ctrl+S | 保存文件 |
| Ctrl+F | 搜索 |
| Ctrl+, | 设置 |
| Ctrl+/ | 切换源码模式 |
| Ctrl+Shift+L | 切换侧边栏 |

### 8.2 测试文件结构
```
e2e/
├── basic.spec.ts        # 基础功能测试
├── file-ops.spec.ts     # 文件操作测试
├── performance.spec.ts  # 性能测试
├── large-file.spec.ts   # 大文件性能测试
└── TEST_PLAN.md         # 测试计划文档

scripts/
└── generate-test-doc.cjs # 测试文档生成器

test-assets/
├── large-test-doc.md    # 大文件测试文档
└── images/              # 测试图片
    ├── image_0.jpg
    ├── image_1.jpg
    └── ...
```
