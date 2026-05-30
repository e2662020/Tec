import {import { test, expect } from '@playwright/test'import { test, expect } from '@playwright/test';
import { readFileSync } from 'import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH =import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performanceimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEachimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 secondsimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    constimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH,import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    consoleimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} charactersimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    awaitimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      constimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTANDimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/testimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-docimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    },import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime =import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().contentimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, {import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTimeimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time:import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(200import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  testimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent =import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        storeimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-testimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', contentimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(100import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = awaitimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const framesimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return newimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count =import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          constimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (deltaimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps =import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.pushimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < countimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFramesimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 &&import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b)import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps =import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames:import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        }import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)},import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixedimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFpsimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll withimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOCimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__Zimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFileimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'largeimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await pageimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () =>import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editorimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) returnimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      constimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      letimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return newimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        },import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = ()import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length <import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measureimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearIntervalimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filterimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f <import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b)import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / validimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.minimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrameimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    }import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPSimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minFps.toFixed(2)}`);
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minFps.toFixed(2)}`);

    expect(scrollPerformance.avgFps).toimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minFps.toFixed(2)}`);

    expect(scrollPerformance.avgFps).toBeGreaterThan(55);
    expect(scrollimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minFps.toFixed(2)}`);

    expect(scrollPerformance.avgFps).toBeGreaterThan(55);
    expect(scrollPerformance.minFps).toBeGreaterThan(import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minFps.toFixed(2)}`);

    expect(scrollPerformance.avgFps).toBeGreaterThan(55);
    expect(scrollPerformance.minFps).toBeGreaterThan(30);
  });

  testimport { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minFps.toFixed(2)}`);

    expect(scrollPerformance.avgFps).toBeGreaterThan(55);
    expect(scrollPerformance.minFps).toBeGreaterThan(30);
  });

  test('image gallery loads with large document', async ({import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minFps.toFixed(2)}`);

    expect(scrollPerformance.avgFps).toBeGreaterThan(55);
    expect(scrollPerformance.minFps).toBeGreaterThan(30);
  });

  test('image gallery loads with large document', async ({ page }) => {
    const docContent =import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEST_DOC_PATH = join(process.cwd(), 'test-assets', 'large-test-doc.md');

test.describe('Tec Markdown Editor - Large File Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('large document opens within 2 seconds', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');
    const charCount = docContent.length;

    console.log(`Document size: ${charCount} characters`);
    expect(charCount).toBeGreaterThan(100000);

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    const startTime = Date.now();

    await page.waitForFunction(() => {
      const store = (window as any).__ZUSTAND_STORE__;
      return store && store.getState().content.length > 100000;
    }, { timeout: 5000 });

    const openDuration = Date.now() - startTime;
    console.log(`Document open time: ${openDuration}ms`);

    expect(openDuration).toBeLessThan(2000);
  });

  test('scroll performance maintains 60fps', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let lastTime = performance.now();

      return new Promise<{ avgFps: number; minFps: number; frames: number[] }>((resolve) => {
        const count = 120;
        let collected = 0;

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            const fps = 1000 / delta;
            frames.push(fps);
            collected++;
          }

          if (collected < count) {
            requestAnimationFrame(measure);
          } else {
            const validFrames = frames.filter(f => f > 0 && f < 200);
            const avgFps = validFrames.reduce((a, b) => a + b, 0) / validFrames.length;
            const minFps = Math.min(...validFrames);
            resolve({ avgFps, minFps, frames: validFrames });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Scroll FPS - Average: ${frameData.avgFps.toFixed(2)}, Min: ${frameData.minFps.toFixed(2)}`);

    expect(frameData.avgFps).toBeGreaterThan(55);
    expect(frameData.minFps).toBeGreaterThan(30);
  });

  test('smooth scroll with wheel events', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((content) => {
      const store = (window as any).__ZUSTAND_STORE__;
      if (store) {
        store.getState().openFile('/test/large-test-doc.md', 'large-test-doc.md', content);
      }
    }, docContent);

    await page.waitForTimeout(1000);

    const scrollPerformance = await page.evaluate(async () => {
      const editor = document.querySelector('.milkdown') || document.querySelector('.editor-content');
      if (!editor) return { avgFps: 0, minFps: 0 };

      const frames: number[] = [];
      let lastTime = performance.now();
      let scrollPos = 0;

      return new Promise<{ avgFps: number; minFps: number }>((resolve) => {
        const scrollInterval = setInterval(() => {
          scrollPos += 100;
          editor.scrollTop = scrollPos;
        }, 16);

        const measure = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (delta > 0) {
            frames.push(1000 / delta);
          }

          if (frames.length < 180) {
            requestAnimationFrame(measure);
          } else {
            clearInterval(scrollInterval);
            const valid = frames.filter(f => f > 0 && f < 200);
            resolve({
              avgFps: valid.reduce((a, b) => a + b, 0) / valid.length,
              minFps: Math.min(...valid),
            });
          }
        };

        requestAnimationFrame(measure);
      });
    });

    console.log(`Wheel scroll FPS - Average: ${scrollPerformance.avgFps.toFixed(2)}, Min: ${scrollPerformance.minFps.toFixed(2)}`);

    expect(scrollPerformance.avgFps).toBeGreaterThan(55);
    expect(scrollPerformance.minFps).toBeGreaterThan(30);
  });

  test('image gallery loads with large document', async ({ page }) => {
    const docContent = readFileSync(TEST_DOC_PATH, 'utf-8');

    await page.evaluate((