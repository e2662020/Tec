import { useEffect } from 'react';
import { MenuBar } from './components/menubar/MenuBar';
import { Sidebar } from './components/sidebar/Sidebar';
import { EditorArea } from './components/editor/EditorArea';
import { SearchReplace } from './components/editor/SearchReplace';
import { StatusBar } from './components/statusbar/StatusBar';
import { ImagePanel } from './components/gallery/ImagePanel';
import { ThemeSelector } from './components/theme/ThemeSelector';
import { useEditorStore } from './store/editorStore';
import { useFileOps } from './hooks/useFileOps';
import { useAutoSave } from './hooks/useAutoSave';
import './styles/variables.css';
import './styles/layout.css';
import './styles/theme-index.css';

function App() {
  const { openMdFile, saveFile } = useFileOps();
  const closeFile = useEditorStore((s) => s.closeFile);
  const currentTheme = useEditorStore((s) => s.currentTheme);

  useAutoSave(30000);

  useEffect(() => {
    // Restore theme
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
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveFile, openMdFile, closeFile]);

  return (
    <div className="app-container">
      <MenuBar />
      <div className="app-main">
        <Sidebar />
        <div className="editor-main">
          <div className="editor-toolbar">
            <ThemeSelector />
          </div>
          <EditorArea />
          <SearchReplace />
        </div>
        <ImagePanel />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
