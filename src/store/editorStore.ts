import { create } from 'zustand';
import type { EditorMode, FileInfo, SidebarTab, ColorMap } from '../types';
import { DEFAULT_COLOR_MAP } from '../types';

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

  sidebarVisible: true,
  sidebarTab: 'files',
  sidebarWidth: 240,
  outline: [],

  folderPath: null,
  fileList: [],

  currentTheme: 'Tec Light',
  colorMap: { ...DEFAULT_COLOR_MAP },

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
