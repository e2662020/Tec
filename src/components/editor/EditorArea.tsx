import { useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { WysiwygEditor } from './WysiwygEditor';
import { SourceEditor } from './SourceEditor';

export function EditorArea() {
  const editorMode = useEditorStore((s) => s.editorMode);
  const content = useEditorStore((s) => s.content);
  const toggleEditorMode = useEditorStore((s) => s.toggleEditorMode);
  const currentFileName = useEditorStore((s) => s.currentFileName);

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

  return (
    <div className="editor-area">
      {!currentFileName ? (
        <div className="editor-empty">
          <div className="editor-empty-content">
            <h2>Tec (Beta)</h2>
            <p>Typora 风格的 Markdown 编辑器</p>
            <div className="editor-empty-shortcuts">
              <span>Ctrl+O 打开文件</span>
              <span>Ctrl+N 新建文档</span>
              <span>Ctrl+/ 切换源码模式</span>
            </div>
          </div>
        </div>
      ) : editorMode === 'wysiwyg' ? (
        <WysiwygEditor key={useEditorStore.getState().currentFilePath ?? 'new'} />
      ) : (
        <SourceEditor initialContent={content} />
      )}
    </div>
  );
}

export default EditorArea;
