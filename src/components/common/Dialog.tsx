import { useCallback, useEffect, useRef } from 'react';

export interface DialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: {
    label: string;
    primary?: boolean;
    onClick: () => void;
  }[];
}

export function Dialog({ open, title, children, onClose, actions }: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="dialog-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div ref={contentRef} className="dialog-content">
        <div className="dialog-header">
          <h3 className="dialog-title">{title}</h3>
          <button className="dialog-close" onClick={onClose} aria-label="关闭">
            <i className="bi bi-x"></i>
          </button>
        </div>
        <div className="dialog-body">{children}</div>
        {actions && actions.length > 0 && (
          <div className="dialog-actions">
            {actions.map((action) => (
              <button
                key={action.label}
                className={`dialog-action ${action.primary ? 'primary' : ''}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dialog;
