import { useEffect, useState } from 'react';
import { MenuBar } from './components/menubar/MenuBar';
import { Sidebar } from './components/sidebar/Sidebar';
import { EditorArea } from './components/editor/EditorArea';
import { SearchReplace } from './components/editor/SearchReplace';
import { StatusBar } from './components/statusbar/StatusBar';
import { ImagePanel } from './components/gallery/ImagePanel';
import { Dialog } from './components/common/Dialog';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { useEditorStore } from './store/editorStore';
import { useFileOps } from './hooks/useFileOps';
import { useAutoSave } from './hooks/useAutoSave';
import './styles/variables.css';
import './styles/layout.css';
import './styles/theme-index.css';
import './styles/dialog.css';
import './styles/settings.css';

function App() {
  const { openMdFile, saveFile } = useFileOps();
  const closeFile = useEditorStore((s) => s.closeFile);
  const currentTheme = useEditorStore((s) => s.currentTheme);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useAutoSave(30000);

  useEffect(() => {
    const savedTheme = localStorage.getItem('tec-theme') || 'Tec Light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    useEditorStore.getState().setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

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
            closeFile();
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
  }, [saveFile, openMdFile, closeFile]);

  return (
    <div className="app-container">
      <MenuBar
        onAbout={() => setAboutOpen(true)}
        onSettings={() => setSettingsOpen(true)}
      />
      <div className="app-main">
        <Sidebar />
        <div className="editor-main">
          <EditorArea />
          <SearchReplace />
        </div>
        <ImagePanel />
      </div>
      <StatusBar />

      <Dialog
        open={aboutOpen}
        title="关于 Tec"
        onClose={() => setAboutOpen(false)}
        actions={[{ label: '确定', primary: true, onClick: () => setAboutOpen(false) }]}
      >
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ width: 64, height: 64, margin: '0 auto 16px', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <img src="/tec-icon.svg" alt="Tec" style={{ width: '100%', height: '100%', display: 'block' }} />
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
    </div>
  );
}

export default App;
