import { useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { WysiwygEditor } from './WysiwygEditor';
import { SourceEditor } from './SourceEditor';

export function EditorArea() {
  const editorMode = useEditorStore((s) => s.editorMode);
  const content = useEditorStore((s) => s.content);
  const toggleEditorMode = useEditorStore((s) => s.toggleEditorMode);
  const currentFileName = useEditorStore((s) => s.currentFileName);
  const isNewFile = useEditorStore((s) => s.isNewFile);
  const currentFilePath = useEditorStore((s) => s.currentFilePath);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        toggleEditorMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleEditorMode]);

  // 有文件名 或 新建文件状态 → 显示编辑器
  if (currentFileName || isNewFile) {
    return (
      <div className="editor-area">
        <div className="editor-title-bar">
          <span className="editor-file-name">
            {isNewFile && !currentFilePath ? '未命名' : currentFileName}
          </span>
          {isNewFile && !currentFilePath && (
            <span className="editor-unsaved-badge">未保存</span>
          )}
        </div>
        {editorMode === 'wysiwyg' ? (
          <WysiwygEditor key={currentFilePath ?? 'new'} />
        ) : (
          <SourceEditor initialContent={content} />
        )}
      </div>
    );
  }

  // 什么都没打开 — 欢迎页
  return (
    <div className="editor-area">
      <div className="editor-empty">
        <div className="editor-empty-content">
          <h2>Tec</h2>
          <p>一个简洁优雅的 Markdown 编辑器</p>
          <div className="editor-empty-shortcuts">
            <span>Ctrl+N 新建文件</span>
            <span>Ctrl+O 打开文件</span>
            <span>Ctrl+S 保存文件</span>
          </div>
        </div>
        <img src="/tec-icon.svg" alt="" className="editor-empty-watermark" />
      </div>
    </div>
  );
}

export default EditorArea;
