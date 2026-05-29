import { describe, it, expect } from 'vitest';
import { DEFAULT_COLOR_MAP } from '../types';

describe('DEFAULT_COLOR_MAP', () => {
  it('has all standard color keys', () => {
    expect(DEFAULT_COLOR_MAP).toHaveProperty('R');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('G');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('B');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('O');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('P');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('Y');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('C');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('K');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('W');
    expect(DEFAULT_COLOR_MAP).toHaveProperty('H');
  });

  it('has valid hex colors', () => {
    for (const [, value] of Object.entries(DEFAULT_COLOR_MAP)) {
      expect(value).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

describe('Type guards', () => {
  it('creates valid FileInfo objects', () => {
    const fileInfo = {
      name: 'test.md',
      path: '/path/to/test.md',
      size: 1024,
      modified: '2024-01-01',
      isMdx: false,
      isMd: true,
    };
    expect(fileInfo.isMd).toBe(true);
    expect(fileInfo.isMdx).toBe(false);
    expect(fileInfo.size).toBe(1024);
  });
});
