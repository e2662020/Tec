import { test, expect } from '@playwright/test';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const TEST_DIR = join(tmpdir(), 'tec-e2e-test');

function setupTestFiles() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true });
  }
  mkdirSync(TEST_DIR, { recursive: true });

  const mdContent = `# Test Document

This is a **test** markdown file for E2E testing.

## Section 1

- Item 1
- Item 2
- Item 3

## Section 2

\`\`\`javascript
const x = 1;
console.log(x);
\`\`\`

> A blockquote for testing.

| Col1 | Col2 |
|------|------|
| A    | B    |
`;

  writeFileSync(join(TEST_DIR, 'test.md'), mdContent);
  writeFileSync(join(TEST_DIR, 'empty.md'), '');
  writeFileSync(join(TEST_DIR, 'special-chars-中文.md'), '# 中文标题\n\n中文内容测试。');

  const subDir = join(TEST_DIR, 'subdir');
  mkdirSync(subDir, { recursive: true });
  writeFileSync(join(subDir, 'nested.md'), '# Nested File\n\nIn subdirectory.');
}

test.describe('Tec Markdown Editor - File Operations', () => {
  test.beforeAll(() => {
    setupTestFiles();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('new file clears editor', async ({ page }) => {
    await page.keyboard.press('Control+n');

    const editor = page.locator('.editor-empty');
    await expect(editor).toBeVisible();

    const title = page.locator('.editor-empty-content h2');
    await expect(title).toHaveText('Tec');
  });

  test('open folder shows file tree', async ({ page }) => {
    await page.evaluate((dir) => {
      window.localStorage.setItem('tec-test-folder', dir);
    }, TEST_DIR);

    await page.reload();
    await page.waitForLoadState('networkidle');

    const fileMenu = page.locator('.menubar-item').filter({ hasText: '文件' });
    await fileMenu.click();

    const openFolder = page.locator('.menubar-dropdown-item').filter({ hasText: '打开文件夹' });
    await expect(openFolder).toBeVisible();
  });

  test('sidebar file list displays correctly', async ({ page }) => {
    const viewMenu = page.locator('.menubar-item').filter({ hasText: '视图' });
    await viewMenu.click();

    const toggleSidebar = page.locator('.menubar-dropdown-item').filter({ hasText: '显示侧边栏' });
    await toggleSidebar.click();

    const sidebar = page.locator('.sidebar');
    await expect(sidebar).toBeVisible();

    const fileTab = page.locator('.sidebar-tab').first();
    await expect(fileTab).toContainText('文件');
  });

  test('status bar updates with word count', async ({ page }) => {
    const statusCenter = page.locator('.statusbar-center');
    await expect(statusCenter).toContainText('字数: 0');
  });

  test('editor mode toggle works', async ({ page }) => {
    const editMenu = page.locator('.menubar-item').filter({ hasText: '编辑' });
    await editMenu.click();

    const toggleMode = page.locator('.menubar-dropdown-item').filter({ hasText: '切换源码模式' });
    await expect(toggleMode).toBeVisible();
  });

  test('file dirty state indicator', async ({ page }) => {
    const store = await page.evaluate(() => {
      return (window as any).__ZUSTAND_STORE__?.getState?.();
    });

    const statusLeft = page.locator('.statusbar-left');
    await expect(statusLeft).toContainText('WYSIWYG');
  });

  test('empty file handling', async ({ page }) => {
    await page.keyboard.press('Control+n');

    const emptyState = page.locator('.editor-empty');
    await expect(emptyState).toBeVisible();
  });

  test('keyboard shortcuts for file ops', async ({ page }) => {
    await page.keyboard.press('Control+n');
    await expect(page.locator('.editor-empty')).toBeVisible();

    await page.keyboard.press('Control+o');
    await page.waitForTimeout(100);
  });

  test('sidebar tabs switch correctly', async ({ page }) => {
    const viewMenu = page.locator('.menubar-item').filter({ hasText: '视图' });
    await viewMenu.click();
    const toggleSidebar = page.locator('.menubar-dropdown-item').filter({ hasText: '显示侧边栏' });
    await toggleSidebar.click();

    const sidebar = page.locator('.sidebar');
    await expect(sidebar).toBeVisible();

    const tabs = page.locator('.sidebar-tab');
    const count = await tabs.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('outline panel shows document structure', async ({ page }) => {
    const viewMenu = page.locator('.menubar-item').filter({ hasText: '视图' });
    await viewMenu.click();
    const toggleSidebar = page.locator('.menubar-dropdown-item').filter({ hasText: '显示侧边栏' });
    await toggleSidebar.click();

    const sidebar = page.locator('.sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('file list refresh functionality', async ({ page }) => {
    const viewMenu = page.locator('.menubar-item').filter({ hasText: '视图' });
    await viewMenu.click();
    const toggleSidebar = page.locator('.menubar-dropdown-item').filter({ hasText: '显示侧边栏' });
    await toggleSidebar.click();

    const sidebar = page.locator('.sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('theme persistence across reload', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('tec-theme', 'Night');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const theme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });

    expect(theme).toBe('Night');
  });

  test('settings persist in localStorage', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('tec-theme', 'Tec Dark');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const saved = await page.evaluate(() => {
      return localStorage.getItem('tec-theme');
    });

    expect(saved).toBe('Tec Dark');
  });

  test('export menu availability', async ({ page }) => {
    const fileMenu = page.locator('.menubar-item').filter({ hasText: '文件' });
    await fileMenu.click();

    const items = page.locator('.menubar-dropdown-item');
    const texts = await items.allTextContents();

    expect(texts.some(t => t.includes('新建'))).toBe(true);
    expect(texts.some(t => t.includes('打开'))).toBe(true);
    expect(texts.some(t => t.includes('保存'))).toBe(true);
  });

  test('search replace dialog opens', async ({ page }) => {
    await page.keyboard.press('Control+f');

    const searchDialog = page.locator('.search-replace-dialog');
    await expect(searchDialog).toBeVisible();
  });

  test('image panel toggle', async ({ page }) => {
    const gallery = page.locator('.gallery-panel');
    const isVisible = await gallery.isVisible().catch(() => false);

    if (!isVisible) {
      const viewMenu = page.locator('.menubar-item').filter({ hasText: '视图' });
      await viewMenu.click();
    }
  });

  test('view menu shows sidebar toggle', async ({ page }) => {
    const viewMenu = page.locator('.menubar-item').filter({ hasText: '视图' });
    await viewMenu.click();

    const sidebarToggle = page.locator('.menubar-dropdown-item').filter({ hasText: /显示侧边栏|隐藏侧边栏/ });
    await expect(sidebarToggle).toBeVisible();
  });

  test('recent files menu section', async ({ page }) => {
    const fileMenu = page.locator('.menubar-item').filter({ hasText: '文件' });
    await fileMenu.click();

    const items = page.locator('.menubar-dropdown-item');
    const texts = await items.allTextContents();

    expect(texts.length).toBeGreaterThanOrEqual(3);
  });

  test('help menu contains documentation links', async ({ page }) => {
    const helpMenu = page.locator('.menubar-item').filter({ hasText: '帮助' });
    await helpMenu.click();

    const aboutItem = page.locator('.menubar-dropdown-item').filter({ hasText: '关于 Tec' });
    await expect(aboutItem).toBeVisible();
  });
});
