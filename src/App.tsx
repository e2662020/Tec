import { useEffect, useState, useCallback, useRef } from 'react';
import { MenuBar } from './components/menubar/MenuBar';
import { Sidebar } from './components/sidebar/Sidebar';
import { EditorArea } from './components/editor/EditorArea';
import { SearchReplace } from './components/editor/SearchReplace';
import { StatusBar } from './components/statusbar/StatusBar';
import { ImagePanel } from './components/gallery/ImagePanel';
import { Dialog } from './components/common/Dialog';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { ContextMenu, showContextMenu } from './components/common/ContextMenu';
import type { ContextMenuEntry } from './components/common/ContextMenu';
import { useEditorStore } from './store/editorStore';
import { useGalleryStore } from './store/galleryStore';
import { useFileOps } from './hooks/useFileOps';
import { useAutoSave } from './hooks/useAutoSave';
import './styles/variables.css';
import './styles/layout.css';
import './styles/theme-index.css';
import './styles/dialog.css';
import './styles/context-menu.css';
import './styles/settings.css';

function App() {
  const { openMdFile, saveFile, newFile, openFolder } = useFileOps();
  const closeFile = useEditorStore((s) => s.closeFile);
  const isNewFile = useEditorStore((s) => s.isNewFile);
  const isDirty = useEditorStore((s) => s.isDirty);
  const currentFilePath = useEditorStore((s) => s.currentFilePath);
  const currentFileName = useEditorStore((s) => s.currentFileName);
  const currentTheme = useEditorStore((s) => s.currentTheme);
  const followSystemTheme = useEditorStore((s) => s.followSystemTheme);
  const autoSaveOnClose = useEditorStore((s) => s.autoSaveOnClose);
  const sidebarVisible = useEditorStore((s) => s.sidebarVisible);
  const setSidebarVisible = useEditorStore((s) => s.setSidebarVisible);
  const setCurrentTheme = useEditorStore((s) => s.setCurrentTheme);
  const setFollowSystemTheme = useEditorStore((s) => s.setFollowSystemTheme);
  const galleryVisible = useGalleryStore((s) => s.visible);
  const setGalleryVisible = useGalleryStore((s) => s.setVisible);

  const fileOpsRef = useRef({ openMdFile, saveFile, newFile, openFolder });
  fileOpsRef.current = { openMdFile, saveFile, newFile, openFolder };

  const [aboutOpen, setAboutOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileDrawers = useCallback(() => {
    if (sidebarVisible) setSidebarVisible(false);
    if (galleryVisible) setGalleryVisible(false);
  }, [sidebarVisible, galleryVisible, setSidebarVisible, setGalleryVisible]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 关闭文件前检查未保存更改
  const handleCloseFile = useCallback(async () => {
    if (!currentFilePath && !isDirty) {
      closeFile();
      return;
    }
    if (!isDirty) {
      closeFile();
      return;
    }
    // 有未保存更改
    if (autoSaveOnClose) {
      await saveFile();
      closeFile();
    } else {
      setCloseConfirmOpen(true);
    }
  }, [currentFilePath, isDirty, autoSaveOnClose, saveFile, closeFile]);

  useAutoSave(30000);

  // ── 全局右键菜单：替换浏览器默认菜单 ──
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      // 如果点击的是 input / textarea，保留浏览器默认菜单
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      e.preventDefault();
      e.stopPropagation();

      const editorState = useEditorStore.getState();
      const galleryState = useGalleryStore.getState();
      const hasFile = !!(editorState.currentFilePath || editorState.isNewFile);

      const items: ContextMenuEntry[] = hasFile
        ? [
            {
              label: '撤销',
              shortcut: 'Ctrl+Z',
              icon: 'bi-arrow-counterclockwise',
              action: () => document.execCommand('undo'),
            },
            {
              label: '重做',
              shortcut: 'Ctrl+Y',
              icon: 'bi-arrow-clockwise',
              action: () => document.execCommand('redo'),
            },
            { divider: true },
            {
              label: '剪切',
              shortcut: 'Ctrl+X',
              icon: 'bi-scissors',
              action: () => document.execCommand('cut'),
            },
            {
              label: '复制',
              shortcut: 'Ctrl+C',
              icon: 'bi-copy',
              action: () => document.execCommand('copy'),
            },
            {
              label: '粘贴',
              shortcut: 'Ctrl+V',
              icon: 'bi-clipboard',
              action: () => document.execCommand('paste'),
            },
            {
              label: '全选',
              shortcut: 'Ctrl+A',
              icon: 'bi-check2-square',
              action: () => document.execCommand('selectAll'),
            },
            { divider: true },
            {
              label: editorState.editorMode === 'source' ? '切换到所见即所得' : '切换到源码模式',
              shortcut: 'Ctrl+/',
              icon: 'bi-code-slash',
              action: () => editorState.toggleEditorMode(),
            },
            { divider: true },
            {
              label: editorState.sidebarVisible ? '隐藏侧边栏' : '显示侧边栏',
              shortcut: 'Ctrl+Shift+L',
              icon: editorState.sidebarVisible ? 'bi-layout-sidebar-inset-reverse' : 'bi-layout-sidebar-inset',
              action: () => editorState.setSidebarVisible(!editorState.sidebarVisible),
            },
            {
              label: galleryState.visible ? '隐藏图片库' : '显示图片库',
              icon: galleryState.visible ? 'bi-image-alt' : 'bi-image',
              action: () => galleryState.setVisible(!galleryState.visible),
            },
          ]
        : [
            {
              label: '新建文件',
              shortcut: 'Ctrl+N',
              icon: 'bi-file-earmark-plus',
              action: () => editorState.newFile(),
            },
            {
              label: '打开文件...',
              shortcut: 'Ctrl+O',
              icon: 'bi-file-earmark',
              action: () => fileOpsRef.current.openMdFile(),
            },
            {
              label: '打开文件夹...',
              icon: 'bi-folder2-open',
              action: () => fileOpsRef.current.openFolder(),
            },
            { divider: true },
            {
              label: editorState.sidebarVisible ? '隐藏侧边栏' : '显示侧边栏',
              shortcut: 'Ctrl+Shift+L',
              icon: editorState.sidebarVisible ? 'bi-layout-sidebar-inset-reverse' : 'bi-layout-sidebar-inset',
              action: () => editorState.setSidebarVisible(!editorState.sidebarVisible),
            },
            {
              label: galleryState.visible ? '隐藏图片库' : '显示图片库',
              icon: galleryState.visible ? 'bi-image-alt' : 'bi-image',
              action: () => galleryState.setVisible(!galleryState.visible),
            },
          ];

      showContextMenu(e, items);
    };

    document.addEventListener('contextmenu', onContextMenu);
    return () => document.removeEventListener('contextmenu', onContextMenu);
  }, []);

  // 初始化：读取 localStorage 中的主题设置
  useEffect(() => {
    const savedTheme = localStorage.getItem('tec-theme') || 'Tec Light';
    const savedFollow = localStorage.getItem('tec-follow-system') === 'true';

    setFollowSystemTheme(savedFollow);

    if (savedFollow) {
      // 跟随系统模式：根据系统配色方案决定初始主题
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = prefersDark ? 'Tec Dark' : 'Tec Light';
      document.documentElement.setAttribute('data-theme', resolved);
      setCurrentTheme(resolved);
    } else {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setCurrentTheme(savedTheme);
    }
  }, [setCurrentTheme, setFollowSystemTheme]);

  // 监听系统配色方案变化（跟随系统模式）
  useEffect(() => {
    if (!followSystemTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const theme = e.matches ? 'Tec Dark' : 'Tec Light';
      document.documentElement.setAttribute('data-theme', theme);
      setCurrentTheme(theme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [followSystemTheme, setCurrentTheme]);

  // 手动切换主题时同步到 DOM 和 localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (!followSystemTheme) {
      localStorage.setItem('tec-theme', currentTheme);
    }
  }, [currentTheme, followSystemTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            saveFile();
            break;
          case 'o':
            e.preventDefault();
            openMdFile();
            break;
          case 'n':
            e.preventDefault();
            // 如果有未保存内容且不是新建文件，用新文件替换（清空编辑器）
            // 如果是新建文件状态，先用保存对话框保存
            if (isDirty && !isNewFile) {
              // 有未保存的修改 → 可以后续添加确认对话框
            }
            newFile();
            break;
          case 'w':
            e.preventDefault();
            handleCloseFile();
            break;
          case ',':
            e.preventDefault();
            setSettingsOpen(true);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveFile, openMdFile, handleCloseFile, newFile, isDirty, isNewFile]);

  return (
    <div className={`app-container${mobileMenuOpen ? ' mobile-menubar-open' : ''}`}>
      <MenuBar
        onAbout={() => setAboutOpen(true)}
        onSettings={() => setSettingsOpen(true)}
      >
        {isMobile && (
          <>
            <button
              className="mobile-hamburger"
              onClick={toggleMobileMenu}
              aria-label="菜单"
            >
              <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
            <span className="mobile-title">{currentFileName || 'Tec'}</span>
          </>
        )}
      </MenuBar>
      <div className="app-main">
        {isMobile && (
          <div
            className={`mobile-overlay${(sidebarVisible || galleryVisible) ? ' active' : ''}`}
            onClick={closeMobileDrawers}
          />
        )}
        <Sidebar />
        <div className="editor-main">
          <EditorArea />
          <SearchReplace />
        </div>
        <ImagePanel />
      </div>
      <StatusBar />
      <ContextMenu />

      <Dialog
        open={aboutOpen}
        title="关于 Tec"
        onClose={() => setAboutOpen(false)}
        actions={[{ label: '确定', primary: true, onClick: () => setAboutOpen(false) }]}
      >
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ width: 80, height: 80, margin: '0 auto 16px', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
            <img src="./tec-icon.svg" alt="Tec" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
          <h2 style={{ fontSize: 18, margin: '0 0 8px', color: 'var(--tec-text-primary)' }}>
            Tec (Beta)
          </h2>
          <p style={{ margin: '0 0 16px', color: 'var(--tec-text-secondary)' }}>
            Typora 风格的 Markdown 编辑器
          </p>
          <p style={{ fontSize: 12, color: 'var(--tec-text-tertiary)', margin: 0 }}>
            版本 0.1.0 · 基于 React + Tauri 构建
          </p>
        </div>
      </Dialog>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* 关闭确认对话框 */}
      <Dialog
        open={closeConfirmOpen}
        title="未保存的更改"
        onClose={() => setCloseConfirmOpen(false)}
        actions={[
          {
            label: '取消',
            onClick: () => setCloseConfirmOpen(false),
          },
          {
            label: '不保存',
            onClick: () => {
              setCloseConfirmOpen(false);
              closeFile();
            },
          },
          {
            label: '保存',
            primary: true,
            onClick: async () => {
              setCloseConfirmOpen(false);
              await saveFile();
              closeFile();
            },
          },
        ]}
      >
        <p style={{ margin: '8px 0', color: 'var(--tec-text-secondary)' }}>
          文件未保存，是否在关闭前保存更改？
        </p>
      </Dialog>
    </div>
  );
}

export default App;
