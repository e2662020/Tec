import { test, expect } from '@playwright/test';

test.describe('Tec Markdown Editor - Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('First Contentful Paint under 1.5s', async ({ page }) => {
    const fcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(e => e.name === 'first-contentful-paint');
          if (fcpEntry) {
            resolve(fcpEntry.startTime);
            observer.disconnect();
          }
        });
        observer.observe({ entryTypes: ['paint'] });
        
        setTimeout(() => {
          const entries = performance.getEntriesByName('first-contentful-paint');
          if (entries.length > 0) {
            resolve(entries[0].startTime);
          } else {
            resolve(0);
          }
        }, 3000);
      });
    });
    
    console.log(`FCP: ${fcp}ms`);
    expect(fcp).toBeLessThan(1500);
  });

  test('Largest Contentful Paint under 2.5s', async ({ page }) => {
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry;
          resolve(lastEntry.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        setTimeout(() => {
          const entries = performance.getEntriesByType('largest-contentful-paint');
          if (entries.length > 0) {
            resolve(entries[entries.length - 1].startTime);
          } else {
            resolve(0);
          }
        }, 3000);
      });
    });
    
    console.log(`LCP: ${lcp}ms`);
    expect(lcp).toBeLessThan(2500);
  });

  test('settings panel opens within 100ms', async ({ page }) => {
    const start = Date.now();
    await page.keyboard.press('Control+Comma');
    await page.locator('.settings-panel').waitFor({ state: 'visible' });
    const duration = Date.now() - start;
    
    console.log(`Settings panel open time: ${duration}ms`);
    expect(duration).toBeLessThan(100);
  });

  test('menu dropdown renders within 50ms', async ({ page }) => {
    const fileMenu = page.locator('.menubar-item').filter({ hasText: '文件' });
    await fileMenu.click();
    
    const start = Date.now();
    const dropdown = page.locator('.menubar-dropdown-content');
    await dropdown.waitFor({ state: 'visible' });
    const duration = Date.now() - start;
    
    console.log(`Menu dropdown render time: ${duration}ms`);
    expect(duration).toBeLessThan(50);
  });

  test('theme switching is smooth', async ({ page }) => {
    await page.keyboard.press('Control+Comma');
    await page.locator('.settings-panel').waitFor({ state: 'visible' });
    
    const themeTab = page.locator('.settings-tab').filter({ hasText: '主题' });
    await themeTab.click();
    
    const themes = await page.locator('.settings-theme-card').all();
    
    for (let i = 0; i < Math.min(themes.length, 3); i++) {
      const start = Date.now();
      await themes[i].click();
      await page.waitForTimeout(100);
      const duration = Date.now() - start;
      
      console.log(`Theme ${i + 1} switch time: ${duration}ms`);
      expect(duration).toBeLessThan(500);
    }
  });

  test('memory usage stays reasonable', async ({ page }) => {
    const getMemory = async () => {
      return await page.evaluate(() => {
        const mem = (performance as any).memory;
        return mem ? mem.usedJSHeapSize / 1024 / 1024 : 0;
      });
    };
    
    const initial = await getMemory();
    console.log(`Initial memory: ${initial.toFixed(2)} MB`);
    
    await page.keyboard.press('Control+Comma');
    await page.locator('.settings-panel').waitFor({ state: 'visible' });
    
    const closeBtn = page.locator('.settings-close');
    await closeBtn.click();
    await page.locator('.settings-panel').waitFor({ state: 'hidden' });
    
    await page.waitForTimeout(500);
    
    const after = await getMemory();
    console.log(`Memory after interaction: ${after.toFixed(2)} MB`);
    
    expect(after).toBeLessThan(initial + 50);
  });

  test('no layout shift on initial load', async ({ page }) => {
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 3000);
      });
    });
    
    console.log(`CLS: ${cls}`);
    expect(cls).toBeLessThan(0.1);
  });

  test('bundle size check', async ({ page }) => {
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource').map(r => ({
        name: r.name,
        size: (r as any).transferSize || 0,
        duration: r.duration
      }));
    });
    
    const jsResources = resources.filter(r => r.name.endsWith('.js'));
    const totalJs = jsResources.reduce((sum, r) => sum + r.size, 0);
    
    console.log(`Total JS transfer size: ${(totalJs / 1024).toFixed(2)} KB`);
    expect(totalJs).toBeLessThan(2 * 1024 * 1024);
  });
});
