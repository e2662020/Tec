import { useCallback, useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { useFileOps } from '../../hooks/useFileOps';
import type { FileInfo } from '../../types';

function FileTree() {
  const fileList = useEditorStore((s) => s.fileList);
  const folderPath = useEditorStore((s) => s.folderPath);
  const currentFilePath = useEditorStore((s) => s.currentFilePath);
  const { openMdFile, openFolder, refreshFolder } = useFileOps();

  const handleFileClick = useCallback(
    (file: FileInfo) => {
      openMdFile(file.path);
    },
    [openMdFile],
  );

  return (
    <div className="sidebar-file-tree">
      <div className="sidebar-toolbar">
        <span className="sidebar-folder-path" title={folderPath ?? ''}>
          {folderPath
            ? folderPath.split(/[\\/]/).pop() || folderPath
            : '未打开文件夹'}
        </span>
        <div className="sidebar-toolbar-actions">
          <button onClick={openFolder} title="打开文件夹">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 3.5a.5.5 0 01.5-.5h4.5l1 1H14.5a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V3.5z" />
            </svg>
          </button>
          <button onClick={refreshFolder} title="刷新">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.534 7.5A4.002 4.002 0 018 5c-1.36 0-2.566.7-3.237 1.77l1.53.73H2V3.3l1.38.82A5.002 5.002 0 0113 8h-1.466zM4.466 8.5A4.002 4.002 0 008 11c1.36 0 2.566-.7 3.237-1.77l-1.53-.73H14V12.7l-1.38-.82A5.002 5.002 0 013 8h1.466z" />
            </svg>
          </button>
        </div>
      </div>
      <ul className="sidebar-file-list">
        {fileList.map((file) => (
          <li
            key={file.path}
            className={`sidebar-file-item ${file.path === currentFilePath ? 'active' : ''}`}
            onClick={() => handleFileClick(file)}
          >
            <span className="file-icon">
              {file.isMdx ? '📦' : '📄'}
            </span>
            <span className="file-name">{file.name}</span>
          </li>
        ))}
        {fileList.length === 0 && (
          <li className="sidebar-file-empty">打开文件夹以浏览文件</li>
        )}
      </ul>
    </div>
  );
}

function OutlinePanel() {
  const outline = useEditorStore((s) => s.outline);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="sidebar-outline">
      {outline.length === 0 ? (
        <div className="sidebar-outline-empty">当前文档无标题</div>
      ) : (
        <ul className="sidebar-outline-list">
          {outline.map((item) => (
            <li
              key={item.id}
              className={`sidebar-outline-item level-${item.level}`}
              style={{ paddingLeft: `${12 + (item.level - 1) * 16}px` }}
              onClick={() => scrollToHeading(item.id)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Sidebar() {
  const sidebarVisible = useEditorStore((s) => s.sidebarVisible);
  const sidebarTab = useEditorStore((s) => s.sidebarTab);
  const setSidebarTab = useEditorStore((s) => s.setSidebarTab);
  const sidebarWidth = useEditorStore((s) => s.sidebarWidth);
  const setSidebarWidth = useEditorStore((s) => s.setSidebarWidth);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === '1') {
        e.preventDefault();
        setSidebarTab('files');
      } else if (e.ctrlKey && e.shiftKey && e.key === '2') {
        e.preventDefault();
        setSidebarTab('outline');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSidebarTab]);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = sidebarWidth;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;
        const newWidth = Math.max(180, Math.min(400, startWidth + delta));
        setSidebarWidth(newWidth);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [sidebarWidth, setSidebarWidth],
  );

  if (!sidebarVisible) return null;

  return (
    <aside className="sidebar" style={{ width: sidebarWidth }}>
      <div className="sidebar-tabs">
        <button
          className={`sidebar-tab ${sidebarTab === 'files' ? 'active' : ''}`}
          onClick={() => setSidebarTab('files')}
        >
          文件
        </button>
        <button
          className={`sidebar-tab ${sidebarTab === 'outline' ? 'active' : ''}`}
          onClick={() => setSidebarTab('outline')}
        >
          大纲
        </button>
      </div>
      <div className="sidebar-content">
        {sidebarTab === 'files' ? <FileTree /> : <OutlinePanel />}
      </div>
      <div className="sidebar-resize-handle" onMouseDown={handleResizeStart} />
    </aside>
  );
}

export default Sidebar;
