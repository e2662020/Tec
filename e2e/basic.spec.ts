import { test, expect } from '@playwright/test';

test.describe('Tec Markdown Editor - Basic E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/tec/i);
  });

  test('displays empty state with Tec branding', async ({ page }) => {
    const heading = page.locator('.editor-empty-content h2');
    await expect(heading).toHaveText('Tec');
    
    const subtitle = page.locator('.editor-empty-content p');
    await expect(subtitle).toContainText('Markdown');
  });

  test('shows keyboard shortcuts in empty state', async ({ page }) => {
    const shortcuts = page.locator('.editor-empty-shortcuts span');
    await expect(shortcuts).toHaveCount(3);
    
    const texts = await shortcuts.allTextContents();
    expect(texts.some(t => t.includes('Ctrl+N'))).toBe(true);
    expect(texts.some(t => t.includes('Ctrl+O'))).toBe(true);
    expect(texts.some(t => t.includes('Ctrl+S'))).toBe(true);
  });

  test('menu bar has all four menus', async ({ page }) => {
    const menus = page.locator('.menubar-item');
    await expect(menus).toHaveCount(4);
    
    const texts = await menus.allTextContents();
    expect(texts).toContain('文件');
    expect(texts).toContain('编辑');
    expect(texts).toContain('视图');
    expect(texts).toContain('帮助');
  });

  test('sidebar is hidden by default', async ({ page }) => {
    const sidebar = page.locator('.sidebar');
    const width = await sidebar.evaluate(el => (el as HTMLElement).style.width);
    expect(width).toBe('0px');
  });

  test('settings panel opens and closes via close button', async ({ page }) => {
    await page.keyboard.press('Control+Comma');
    
    const settingsPanel = page.locator('.settings-panel');
    await expect(settingsPanel).toBeVisible();
    
    const closeBtn = page.locator('.settings-close');
    await closeBtn.click();
    await expect(settingsPanel).not.toBeVisible();
  });

  test('about dialog opens from help menu', async ({ page }) => {
    const helpMenu = page.locator('.menubar-item').filter({ hasText: '帮助' });
    await helpMenu.click();
    
    const aboutItem = page.locator('.menubar-dropdown-item').filter({ hasText: '关于 Tec' });
    await aboutItem.click();
    
    const dialog = page.locator('.dialog-content');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Tec');
  });

  test('watermark icon is visible in empty state', async ({ page }) => {
    const watermark = page.locator('.editor-empty-watermark');
    await expect(watermark).toBeVisible();
    
    const bbox = await watermark.boundingBox();
    expect(bbox?.width).toBeGreaterThan(100);
    expect(bbox?.height).toBeGreaterThan(100);
  });

  test('status bar shows correct info', async ({ page }) => {
    const statusBar = page.locator('.statusbar');
    await expect(statusBar).toBeVisible();
    
    const left = page.locator('.statusbar-left');
    await expect(left).toContainText('WYSIWYG');
    
    const center = page.locator('.statusbar-center');
    await expect(center).toContainText('字数');
  });

  test('all menu dropdowns open correctly', async ({ page }) => {
    const menuNames = ['文件', '编辑', '视图', '帮助'];
    
    for (const name of menuNames) {
      const menu = page.locator('.menubar-item').filter({ hasText: name });
      await menu.click();
      
      const dropdown = page.locator('.menubar-dropdown-content');
      await expect(dropdown).toBeVisible();
      
      await page.click('body');
      await expect(dropdown).not.toBeVisible();
    }
  });
});
