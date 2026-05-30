import { describe, it, expect, beforeEach } from 'vitest';
import { useEditorStore } from '../store/editorStore';
import type { FileInfo } from '../types';

describe('editorStore', () => {
  beforeEach(() => {
    // Reset store
    useEditorStore.setState({
      currentFilePath: null,
      currentFileName: null,
      content: '',
      isDirty: false,
      editorMode: 'wysiwyg',
      sidebarVisible: true,
      sidebarTab: 'files',
      wordCount: 0,
      cursorLine: 1,
      cursorColumn: 1,
    });
  });

  it('opens a file correctly', () => {
    useEditorStore.getState().openFile('/test/doc.md', 'doc.md', '# Hello World');
    const state = useEditorStore.getState();
    expect(state.currentFilePath).toBe('/test/doc.md');
    expect(state.currentFileName).toBe('doc.md');
    expect(state.content).toBe('# Hello World');
    expect(state.isDirty).toBe(false);
    expect(state.editorMode).toBe('wysiwyg');
  });

  it('closes a file correctly', () => {
    useEditorStore.getState().openFile('/test/doc.md', 'doc.md', '# Hi');
    useEditorStore.getState().closeFile();
    const state = useEditorStore.getState();
    expect(state.currentFilePath).toBeNull();
    expect(state.currentFileName).toBeNull();
    expect(state.content).toBe('');
    expect(state.isDirty).toBe(false);
  });

  it('toggles editor mode', () => {
    expect(useEditorStore.getState().editorMode).toBe('wysiwyg');
    useEditorStore.getState().toggleEditorMode();
    expect(useEditorStore.getState().editorMode).toBe('source');
    useEditorStore.getState().toggleEditorMode();
    expect(useEditorStore.getState().editorMode).toBe('wysiwyg');
  });

  it('toggles sidebar', () => {
    expect(useEditorStore.getState().sidebarVisible).toBe(true);
    useEditorStore.getState().toggleSidebar();
    expect(useEditorStore.getState().sidebarVisible).toBe(false);
  });

  it('switches sidebar tab', () => {
    useEditorStore.getState().setSidebarTab('outline');
    expect(useEditorStore.getState().sidebarTab).toBe('outline');
  });

  it('tracks dirty state', () => {
    useEditorStore.getState().setIsDirty(true);
    expect(useEditorStore.getState().isDirty).toBe(true);
    useEditorStore.getState().setIsDirty(false);
    expect(useEditorStore.getState().isDirty).toBe(false);
  });

  it('updates word count and cursor position', () => {
    useEditorStore.getState().setWordCount(42);
    expect(useEditorStore.getState().wordCount).toBe(42);

    useEditorStore.getState().setCursorPosition(10, 24);
    expect(useEditorStore.getState().cursorLine).toBe(10);
    expect(useEditorStore.getState().cursorColumn).toBe(24);
  });

  it('manages theme', () => {
    useEditorStore.getState().setCurrentTheme('Night');
    expect(useEditorStore.getState().currentTheme).toBe('Night');
  });

  it('updates color map', () => {
    const newMap = { R: '#FF0000', CUSTOM: '#123456' };
    useEditorStore.getState().setColorMap(newMap);
    expect(useEditorStore.getState().colorMap).toEqual(newMap);
  });

  it('manages file list and folder path', () => {
    useEditorStore.getState().setFolderPath('/docs');
    expect(useEditorStore.getState().folderPath).toBe('/docs');

    const files: FileInfo[] = [
      { name: 'a.md', path: '/docs/a.md', size: 100, modified: '', isMdx: false, isMd: true, isDir: false },
      { name: 'b.mdx', path: '/docs/b.mdx', size: 200, modified: '', isMdx: true, isMd: false, isDir: false },
    ];
    useEditorStore.getState().setFileList(files);
    expect(useEditorStore.getState().fileList).toEqual(files);
  });
});
