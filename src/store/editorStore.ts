import { create } from 'zustand';
import type { EditorMode, FileInfo, SidebarTab, ColorMap } from '../types';
import { DEFAULT_COLOR_MAP } from '../types';

interface PluginInfo {
  id: string;
  name: string;
  version: string;
  description: string;
  enabled: boolean;
  author?: string;
}

interface EditorState {
  // Document
  currentFilePath: string | null;
  currentFileName: string | null;
  content: string;
  isDirty: boolean;

  // Editor
  editorMode: EditorMode;

  // Sidebar
  sidebarVisible: boolean;
  sidebarTab: SidebarTab;
  sidebarWidth: number;
  outline: { level: number; text: string; id: string }[];

  // Folder
  folderPath: string | null;
  fileList: FileInfo[];

  // Theme
  currentTheme: string;
  colorMap: ColorMap;

  // Settings
  openInNewWindow: boolean;
  plugins: PluginInfo[];

  // Status
  wordCount: number;
  cursorLine: number;
  cursorColumn: number;

  // Actions
  setContent: (content: string) => void;
  setCurrentFile: (path: string | null, name: string | null) => void;
  setIsDirty: (dirty: boolean) => void;
  setEditorMode: (mode: EditorMode) => void;
  toggleEditorMode: () => void;
  setSidebarVisible: (visible: boolean) => void;
  toggleSidebar: () => void;
  setSidebarTab: (tab: SidebarTab) => void;
  setSidebarWidth: (width: number) => void;
  setOutline: (outline: { level: number; text: string; id: string }[]) => void;
  setFolderPath: (path: string | null) => void;
  setFileList: (files: FileInfo[]) => void;
  setCurrentTheme: (theme: string) => void;
  setColorMap: (map: ColorMap) => void;
  setOpenInNewWindow: (value: boolean) => void;
  togglePlugin: (pluginId: string) => void;
  setWordCount: (count: number) => void;
  setCursorPosition: (line: number, column: number) => void;
  openFile: (path: string, name: string, content: string) => void;
  closeFile: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentFilePath: null,
  currentFileName: null,
  content: '',
  isDirty: false,

  editorMode: 'wysiwyg',

  sidebarVisible: false,
  sidebarTab: 'files',
  sidebarWidth: 240,
  outline: [],

  folderPath: null,
  fileList: [],

  currentTheme: 'Tec Light',
  colorMap: { ...DEFAULT_COLOR_MAP },

  openInNewWindow: true,
  plugins: [
    {
      id: 'math',
      name: '数学公式',
      version: '1.0.0',
      description: '支持 LaTeX 数学公式渲染（KaTeX / MathJax）',
      enabled: true,
    },
    {
      id: 'diagram',
      name: '图表绘制',
      version: '1.0.0',
      description: '支持 Mermaid 流程图、时序图、类图等',
      enabled: true,
    },
    {
      id: 'code-highlight',
      name: '代码高亮',
      version: '1.0.0',
      description: '代码块语法高亮支持',
      enabled: true,
    },
    {
      id: 'image-optimize',
      name: '图片优化',
      version: '1.0.0',
      description: '自动压缩图片为 WebP 格式，相似图片检测与合并',
      enabled: true,
    },
    {
      id: 'word-count',
      name: '字数统计',
      version: '1.0.0',
      description: '实时统计文档字数、行数、阅读时间',
      enabled: true,
    },
    {
      id: 'focus-mode',
      name: '专注模式',
      version: '1.0.0',
      description: '聚焦当前段落，淡化其他内容',
      enabled: false,
    },
    {
      id: 'typewriter',
      name: '打字机模式',
      version: '1.0.0',
      description: '光标始终保持在屏幕中央',
      enabled: false,
    },
    {
      id: 'vim-mode',
      name: 'Vim 模式',
      version: '1.0.0',
      description: 'Vim 键位绑定支持',
      enabled: false,
    },
  ],

  wordCount: 0,
  cursorLine: 1,
  cursorColumn: 1,

  setContent: (content) => set({ content }),

  setCurrentFile: (path, name) =>
    set({ currentFilePath: path, currentFileName: name }),

  setIsDirty: (dirty) => set({ isDirty: dirty }),

  setEditorMode: (mode) => set({ editorMode: mode }),

  toggleEditorMode: () =>
    set((s) => ({
      editorMode: s.editorMode === 'wysiwyg' ? 'source' : 'wysiwyg',
    })),

  setSidebarVisible: (visible) => set({ sidebarVisible: visible }),

  toggleSidebar: () => set((s) => ({ sidebarVisible: !s.sidebarVisible })),

  setSidebarTab: (tab) => set({ sidebarTab: tab }),

  setSidebarWidth: (width) => set({ sidebarWidth: width }),

  setOutline: (outline) => set({ outline }),

  setFolderPath: (path) => set({ folderPath: path }),

  setFileList: (files) => set({ fileList: files }),

  setCurrentTheme: (theme) => set({ currentTheme: theme }),

  setColorMap: (map) => set({ colorMap: map }),

  setOpenInNewWindow: (value) => set({ openInNewWindow: value }),

  togglePlugin: (pluginId) =>
    set((s) => ({
      plugins: s.plugins.map((p) =>
        p.id === pluginId ? { ...p, enabled: !p.enabled } : p
      ),
    })),

  setWordCount: (count) => set({ wordCount: count }),

  setCursorPosition: (line, column) =>
    set({ cursorLine: line, cursorColumn: column }),

  openFile: (path, name, content) =>
    set({
      currentFilePath: path,
      currentFileName: name,
      content,
      isDirty: false,
      editorMode: 'wysiwyg',
    }),

  closeFile: () =>
    set({
      currentFilePath: null,
      currentFileName: null,
      content: '',
      isDirty: false,
      outline: [],
    }),
}));
