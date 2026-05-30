import { create } from 'zustand';
import type { EditorMode, FileInfo, SidebarTab, ColorMap } from '../types';
import { DEFAULT_COLOR_MAP } from '../types';

export interface MdxAsset {
  hash: string;
  name: string;
  data: number[]; // compressed WebP bytes
  width: number;
  height: number;
}

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
  isNewFile: boolean; // 新建未保存文件状态

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

  // MDX assets (in-memory image pool for .mdx ZIP)
  mdxAssets: MdxAsset[];

  // Theme
  currentTheme: string;
  followSystemTheme: boolean;
  colorMap: ColorMap;

  // Settings
  openInNewWindow: boolean;
  autoSaveOnClose: boolean;
  plugins: PluginInfo[];

  // Status
  wordCount: number;
  cursorLine: number;
  cursorColumn: number;
  statusMessage: string | null;
  statusType: 'info' | 'error' | null;

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

  // MDX assets
  setMdxAssets: (assets: MdxAsset[]) => void;
  addMdxAsset: (asset: MdxAsset) => void;
  clearMdxAssets: () => void;

  setCurrentTheme: (theme: string) => void;
  setFollowSystemTheme: (value: boolean) => void;
  setColorMap: (map: ColorMap) => void;
  setOpenInNewWindow: (value: boolean) => void;
  setAutoSaveOnClose: (value: boolean) => void;
  togglePlugin: (pluginId: string) => void;
  setWordCount: (count: number) => void;
  setCursorPosition: (line: number, column: number) => void;
  setStatusMessage: (message: string | null, type?: 'info' | 'error') => void;
  newFile: () => void;
  openFile: (path: string, name: string, content: string) => void;
  fileSaved: (path: string, name: string) => void;
  closeFile: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentFilePath: null,
  currentFileName: null,
  content: '',
  isDirty: false,
  isNewFile: false,

  editorMode: 'wysiwyg',

  sidebarVisible: false,
  sidebarTab: 'files',
  sidebarWidth: 240,
  outline: [],

  folderPath: null,
  fileList: [],
  mdxAssets: [],

  currentTheme: 'Tec Light',
  followSystemTheme: false,
  colorMap: { ...DEFAULT_COLOR_MAP },

  openInNewWindow: true,
  autoSaveOnClose: false,
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
  statusMessage: null,
  statusType: null,

  setContent: (content) => set({ content, isDirty: true }),

  setCurrentFile: (path, name) =>
    set({ currentFilePath: path, currentFileName: name, isNewFile: false }),

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

  setMdxAssets: (assets) => set({ mdxAssets: assets }),
  addMdxAsset: (asset) => set((s) => ({
    mdxAssets: s.mdxAssets.some((a) => a.hash === asset.hash)
      ? s.mdxAssets
      : [...s.mdxAssets, asset],
  })),
  clearMdxAssets: () => set({ mdxAssets: [] }),

  setCurrentTheme: (theme) => set({ currentTheme: theme }),

  setFollowSystemTheme: (value) => set({ followSystemTheme: value }),

  setColorMap: (map) => set({ colorMap: map }),

  setOpenInNewWindow: (value) => set({ openInNewWindow: value }),
  setAutoSaveOnClose: (value) => set({ autoSaveOnClose: value }),

  togglePlugin: (pluginId) =>
    set((s) => ({
      plugins: s.plugins.map((p) =>
        p.id === pluginId ? { ...p, enabled: !p.enabled } : p,
      ),
    })),

  setWordCount: (count) => set({ wordCount: count }),

  setCursorPosition: (line, column) =>
    set({ cursorLine: line, cursorColumn: column }),

  setStatusMessage: (message, type = 'info') => {
    set({ statusMessage: message, statusType: message ? type : null });
    if (message) {
      setTimeout(() => {
        set((s) => {
          if (s.statusMessage === message) {
            return { statusMessage: null, statusType: null };
          }
          return {};
        });
      }, 6000);
    }
  },

  // 新建空白文件 — 编辑器立即可用，标题显示"未命名"
  newFile: () =>
    set({
      currentFilePath: null,
      currentFileName: '未命名',
      content: '',
      isDirty: false,
      isNewFile: true,
      editorMode: 'wysiwyg',
      outline: [],
      statusMessage: '📝 新建文件 — 按 Ctrl+S 保存',
      statusType: 'info',
    }),

  openFile: (path, name, content) =>
    set({
      currentFilePath: path,
      currentFileName: name,
      content,
      isDirty: false,
      isNewFile: false,
      editorMode: 'wysiwyg',
    }),

  // 文件保存成功后更新路径（保留当前编辑内容不变）
  fileSaved: (path, name) =>
    set({
      currentFilePath: path,
      currentFileName: name,
      isDirty: false,
      isNewFile: false,
    }),

  closeFile: () =>
    set({
      currentFilePath: null,
      currentFileName: null,
      content: '',
      isDirty: false,
      isNewFile: false,
      outline: [],
      mdxAssets: [],
    }),
}));
