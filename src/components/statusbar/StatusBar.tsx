import { useEditorStore } from '../../store/editorStore';

export function StatusBar() {
  const editorMode = useEditorStore((s) => s.editorMode);
  const currentTheme = useEditorStore((s) => s.currentTheme);
  const wordCount = useEditorStore((s) => s.wordCount);
  const cursorLine = useEditorStore((s) => s.cursorLine);
  const cursorColumn = useEditorStore((s) => s.cursorColumn);
  const isDirty = useEditorStore((s) => s.isDirty);
  const statusMessage = useEditorStore((s) => s.statusMessage);
  const statusType = useEditorStore((s) => s.statusType);

  return (
    <footer className="statusbar">
      <div className="statusbar-left">
        <span className="statusbar-item">
          {editorMode === 'wysiwyg' ? 'WYSIWYG' : '源码'}
        </span>
        {isDirty && <span className="statusbar-item modified">已修改</span>}
        {statusMessage && (
          <span className={`statusbar-item status-message status-${statusType ?? 'info'}`}>
            {statusMessage}
          </span>
        )}
      </div>
      <div className="statusbar-center">
        <span className="statusbar-item">字数: {wordCount}</span>
      </div>
      <div className="statusbar-right">
        <span className="statusbar-item">{currentTheme}</span>
        <span className="statusbar-item">
          行 {cursorLine}, 列 {cursorColumn}
        </span>
      </div>
    </footer>
  );
}

export default StatusBar;
