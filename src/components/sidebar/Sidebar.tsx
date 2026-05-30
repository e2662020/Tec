import { useCallback, useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { useFileOps } from '../../hooks/useFileOps';
import type { FileInfo } from '../../types';

function FileTree() {
  const fileList = useEditorStore((s) => s.fileList);
  const folderPath = useEditorStore((s) => s.folderPath);
  const currentFilePath = useEditorStore((s) => s.currentFilePath);
  const setFolderPath = useEditorStore((s) => s.setFolderPath);
  const setFileList = useEditorStore((s) => s.setFileList);
  const { openMdFile, openFolder, refreshFolder } = useFileOps();

  const handleFileClick = useCallback(
    (file: FileInfo) => {
      if (file.isDir) {
        // 进入文件夹
        setFolderPath(file.path);
        // 重新读取子目录
        import('@tauri-apps/api/core').then(({ invoke }) => {
          invoke<FileInfo[]>('list_folder', { path: file.path })
            .then(setFileList)
            .catch(() => {});
        });
      } else {
        openMdFile(file.path);
      }
    },
    [openMdFile, setFolderPath, setFileList],
  );

  const handleParentClick = useCallback(() => {
    if (!folderPath) return;
    const parent = folderPath.split(/[\\/]/).slice(0, -1).join('/');
    if (!parent) return;
    setFolderPath(parent);
    import('@tauri-apps/api/core').then(({ invoke }) => {
      invoke<FileInfo[]>('list_folder', { path: parent })
        .then(setFileList)
        .catch(() => {});
    });
  }, [folderPath, setFolderPath, setFileList]);

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
            <i className="bi bi-folder2-open"></i>
          </button>
          <button onClick={refreshFolder} title="刷新">
            <i className="bi bi-arrow-repeat"></i>
          </button>
        </div>
      </div>
      <ul className="sidebar-file-list">
        {/* 返回上级 */}
        {folderPath && (
          <li className="sidebar-file-item folder-up" onClick={handleParentClick}>
            <span className="file-icon">
              <i className="bi bi-folder2-open"></i>
            </span>
            <span className="file-name">..</span>
          </li>
        )}
        {fileList.map((file, index) => (
          <li
            key={file.path}
            className={`sidebar-file-item ${file.isDir ? 'is-folder' : ''} ${!file.isDir && file.path === currentFilePath ? 'active' : ''}`}
            style={{ animationDelay: `${index * 30}ms` }}
            onClick={() => handleFileClick(file)}
          >
            <span className="file-icon">
              {file.isDir ? (
                <i className="bi bi-folder"></i>
              ) : file.isMdx ? (
                <i className="bi bi-box-seam"></i>
              ) : (
                <i className="bi bi-file-earmark-text"></i>
              )}
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

  return (
    <aside
      className={`sidebar ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}
      style={{ width: sidebarVisible ? sidebarWidth : 0 }}
    >
      <div className="sidebar-tabs">
        <button
          className={`sidebar-tab ${sidebarTab === 'files' ? 'active' : ''}`}
          onClick={() => setSidebarTab('files')}
        >
          <i className="bi bi-folder"></i> 文件
        </button>
        <button
          className={`sidebar-tab ${sidebarTab === 'outline' ? 'active' : ''}`}
          onClick={() => setSidebarTab('outline')}
        >
          <i className="bi bi-list-ul"></i> 大纲
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
