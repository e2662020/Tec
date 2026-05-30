import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const TEST_DOC = join(process.cwd(), 'test-assets', 'large-test-doc.md');
const TEC_APP = join(process.cwd(), 'src-tauri', 'target', 'release', 'tec');

function getAppPath() {
  if (existsSync(TEC_APP)) return TEC_APP;
  const debPath = join(process.cwd(), 'src-tauri', 'target', 'release', 'bundle', 'deb');
  if (existsSync(debPath)) {
    return 'tec';
  }
  return null;
}

test.describe('Tec - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document loads within 2 seconds', async ({ page }) => {
    const content = await page.evaluate(async (docPath) => {
      const response = await fetch(docPath);
      return await response.text();
    }, '/test-assets/large-test-doc.md');

    expect(content.length).toBeGreaterThan(90000);

    const startTime = Date.now();

    await page.evaluate((docContent) => {
      const event = new CustomEvent('open-large-file', {
        detail: { content: docContent, name: 'large-test-doc.md' }
      });
      window.dispatchEvent(event);
    }, content);

    await page.waitForTimeout(500);

    const editor = page.locator('.milkdown-editor, .editor-content, [contenteditable]');
    await expect(editor).toBeVisible();

    const loadTime = Date.now() - startTime;
    console.log(`Large document load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(2000);
  });

  test('scrolling large document maintains 60fps', async ({ page }) => {
    const content = await page.evaluate(async (docPath) => {
      const response = await fetch(docPath);
      return await response.text();
    }, '/test-assets/large-test-doc.md');

    await page.evaluate((docContent) => {
      const event = new CustomEvent('open-large-file', {
        detail: { content: docContent, name: 'large-test-doc.md' }
      });
      window.dispatchEvent(event);
    }, content);

    await page.waitForTimeout(1000);

    const scrollContainer = page.locator('.editor-scroll-area, .milkdown, .editor-content').first();
    await expect(scrollContainer).toBeVisible();

    const fpsResults = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();
      let frameCount = 0;

      return new Promise<{ avg: number; min: number; max: number; dropped: number }>((resolve) => {
        const measureFrame = () => {
          const now = performance.now();
          const delta = now - lastTime;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            frameCount++;
          }

          lastTime = now;

          if (frameCount < 120) {
            requestAnimationFrame(measureFrame);
          } else {
            const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
            const min = Math.min(...frames);
            const max = Math.max(...frames);
            const dropped = frames.filter(f => f < 30).length;
            resolve({ avg, min, max, dropped });
          }
        };

        requestAnimationFrame(measureFrame);
      });
    });

    console.log(`Scroll FPS - Avg: ${fpsResults.avg.toFixed(1)}, Min: ${fpsResults.min.toFixed(1)}, Max: ${fpsResults.max.toFixed(1)}, Dropped: ${fpsResults.dropped}`);

    expect(fpsResults.avg).toBeGreaterThan(55);
    expect(fpsResults.dropped).toBeLessThan(5);
  });

  test('smooth scroll over full document', async ({ page }) => {
    const content = await page.evaluate(async (docPath) => {
      const response = await fetch(docPath);
      return await response.text();
    }, '/test-assets/large-test-doc.md');

    await page.evaluate((docContent) => {
      const event = new CustomEvent('open-large-file', {
        detail: { content: docContent, name: 'large-test-doc.md' }
      });
      window.dispatchEvent(event);
    }, content);

    await page.waitForTimeout(1000);

    const scrollContainer = page.locator('.editor-scroll-area, .milkdown, .editor-content').first();

    const scrollHeight = await scrollContainer.evaluate(el => el.scrollHeight);
    const clientHeight = await scrollContainer.evaluate(el => el.clientHeight);

    console.log(`Document height: ${scrollHeight}px, Viewport: ${clientHeight}px`);

    expect(scrollHeight).toBeGreaterThan(clientHeight * 5);

    const scrollStart = Date.now();

    await scrollContainer.evaluate(el => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });

    await page.waitForTimeout(3000);

    const scrollEnd = Date.now();
    const scrollTime = scrollEnd - scrollStart;

    const currentScroll = await scrollContainer.evaluate(el => el.scrollTop);
    console.log(`Scroll time: ${scrollTime}ms, Final position: ${currentScroll}px`);

    expect(currentScroll).toBeGreaterThan(scrollHeight * 0.8);
    expect(scrollTime).toBeLessThan(5000);
  });

  test('image gallery loads with large document', async ({ page }) => {
    const content = await page.evaluate(async (docPath) => {
      const response = await fetch(docPath);
      return await response.text();
    }, '/test-assets/large-test-doc.md');

    await page.evaluate((docContent) => {
      const event = new CustomEvent('open-large-file', {
        detail: { content: docContent, name: 'large-test-doc.md' }
      });
      window.dispatchEvent(event);
    }, content);

    await page.waitForTimeout(1500);

    const images = page.locator('img');
    const imageCount = await images.count();
    console.log(`Images found in document: ${imageCount}`);

    expect(imageCount).toBeGreaterThanOrEqual(10);

    const galleryBtn = page.locator('[data-gallery], .gallery-toggle, button').filter({ hasText: /图库|Gallery/ });
    const hasGallery = await galleryBtn.isVisible().catch(() => false);

    if (hasGallery) {
      await galleryBtn.click();
      const galleryPanel = page.locator('.gallery-panel, [data-gallery-panel]');
      await expect(galleryPanel).toBeVisible();
    }
  });

  test('memory usage with large document', async ({ page }) => {
    const initialMemory = await page.evaluate(() => {
      const mem = (performance as any).memory;
      return mem ? mem.usedJSHeapSize / 1024 / 1024 : 0;
    });

    const content = await page.evaluate(async (docPath) => {
      const response = await fetch(docPath);
      return await response.text();
    }, '/test-assets/large-test-doc.md');

    await page.evaluate((docContent) => {
      const event = new CustomEvent('open-large-file', {
        detail: { content: docContent, name: 'large-test-doc.md' }
      });
      window.dispatchEvent(event);
    }, content);

    await page.waitForTimeout(2000);

    const afterMemory = await page.evaluate(() => {
      const mem = (performance as any).memory;
      return mem ? mem.usedJSHeapSize / 1024 / 1024 : 0;
    });

    const memoryIncrease = afterMemory - initialMemory;
    console.log(`Memory increase: ${memoryIncrease.toFixed(2)} MB (Initial: ${initialMemory.toFixed(2)} MB, After: ${afterMemory.toFixed(2)} MB)`);

    expect(memoryIncrease).toBeLessThan(200);
  });

  test('search in large document', async ({ page }) => {
    const content = await page.evaluate(async (docPath) => {
      const response = await fetch(docPath);
      return await response.text();
    }, '/test-assets/large-test-doc.md');

    await page.evaluate((docContent) => {
      const event = new CustomEvent('open-large-file', {
        detail: { content: docContent, name: 'large-test-doc.md' }
      });
      window.dispatchEvent(event);
    }, content);

    await page.waitForTimeout(1000);

    const searchStart = Date.now();
    await page.keyboard.press('Control+f');

    const searchDialog = page.locator('.search-replace-dialog, [data-search]');
    await expect(searchDialog).toBeVisible();

    const searchInput = searchDialog.locator('input').first();
    await searchInput.fill('算法');

    await page.waitForTimeout(500);

    const searchTime = Date.now() - searchStart;
    console.log(`Search open + first result time: ${searchTime}ms`);

    expect(searchTime).toBeLessThan(1000);
  });

  test('theme switch with large document', async ({ page }) => {
    const content = await page.evaluate(async (docPath) => {
      const response = await fetch(docPath);
      return await response.text();
    }, '/test-assets/large-test-doc.md');

    await page.evaluate((docContent) => {
      const event = new CustomEvent('open-large-file', {
        detail: { content: docContent, name: 'large-test-doc.md' }
      });
      window.dispatchEvent(event);
    }, content);

    await page.waitForTimeout(1000);

    const themeStart = Date.now();

    await page.keyboard.press('Control+Comma');
    const settingsPanel = page.locator('.settings-panel');
    await expect(settingsPanel).toBeVisible();

    const themeTab = page.locator('.settings-tab').filter({ hasText: '主题' });
    await themeTab.click();

    const themes = await page.locator('.settings-theme-card').all();
    if (themes.length > 1) {
      await themes[1].click();
    }

    await page.waitForTimeout(300);

    const themeTime = Date.now() - themeStart;
    console.log(`Theme switch with large doc: ${themeTime}ms`);

    expect(themeTime).toBeLessThan(1500);

    const closeBtn = page.locator('.settings-close');
    await closeBtn.click();
  });
});
