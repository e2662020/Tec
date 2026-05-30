import { useEffect, useRef, useState } from 'react';

export interface ContextMenuItem {
  label: string;
  shortcut?: string;
  icon?: string;
  action?: () => void;
  disabled?: boolean;
}

interface ContextMenuDivider {
  divider: true;
}

export type ContextMenuEntry = ContextMenuItem | ContextMenuDivider;

export interface ContextMenuState {
  x: number;
  y: number;
  items: ContextMenuEntry[];
}

// ── 模块级事件总线 ──
const MENU_SHOW = 'tec-cmenu-show';
const MENU_CLOSE = 'tec-cmenu-close';

let _pending: ContextMenuState | null = null;

/** 显示右键菜单。任意组件可调用，传入菜单项列表。 */
export function showContextMenu(e: MouseEvent, items: ContextMenuEntry[]) {
  e.preventDefault();
  e.stopPropagation();
  _pending = { x: e.clientX, y: e.clientY, items };
  window.dispatchEvent(new CustomEvent(MENU_SHOW));
}

/** 关闭右键菜单 */
export function closeContextMenu() {
  _pending = null;
  window.dispatchEvent(new CustomEvent(MENU_CLOSE));
}

// ── 常量 ──
const MENU_W = 220;
const ITEM_H = 32;
const PAD = 8;

function menuHeight(items: ContextMenuEntry[]): number {
  let h = PAD;
  for (const it of items) {
    h += 'divider' in it && it.divider ? 7 : ITEM_H;
  }
  return h;
}

// ── React 组件 ──
export function ContextMenu() {
  const [menu, setMenu] = useState<ContextMenuState | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const frozenRef = useRef<ContextMenuState | null>(null);

  useEffect(() => {
    const onShow = () => {
      frozenRef.current = _pending;
      setMenu(_pending);
    };
    const onClose = () => {
      frozenRef.current = null;
      setMenu(null);
    };
    window.addEventListener(MENU_SHOW, onShow);
    window.addEventListener(MENU_CLOSE, onClose);
    return () => {
      window.removeEventListener(MENU_SHOW, onShow);
      window.removeEventListener(MENU_CLOSE, onClose);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;

    const close = () => {
      frozenRef.current = null;
      setMenu(null);
    };

    const onMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onScroll = () => close();

    const t = setTimeout(() => {
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('keydown', onKey);
      window.addEventListener('scroll', onScroll, true);
    }, 0);

    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [menu]);

  const active = menu || frozenRef.current;
  if (!active) return null;

  const h = menuHeight(active.items);
  let left = active.x;
  let top = active.y;

  if (left + MENU_W > window.innerWidth) left = window.innerWidth - MENU_W - 8;
  if (top + h > window.innerHeight) top = window.innerHeight - h - 8;
  left = Math.max(4, left);
  top = Math.max(4, top);

  return (
    <div ref={menuRef} className="context-menu" style={{ left, top }} role="menu">
      {active.items.map((item, i) => {
        if ('divider' in item && item.divider) {
          return <div key={`d-${i}`} className="context-menu-divider" />;
        }
        const mi = item as ContextMenuItem;
        return (
          <button
            key={`k-${i}`}
            className={`context-menu-item ${mi.disabled ? 'disabled' : ''}`}
            disabled={mi.disabled}
            onClick={() => {
              if (!mi.disabled && mi.action) mi.action();
              frozenRef.current = null;
              setMenu(null);
            }}
            role="menuitem"
          >
            <span className="context-menu-item-label">
              {mi.icon && <i className={`bi ${mi.icon}`} />}
              {mi.label}
            </span>
            {mi.shortcut && <span className="context-menu-shortcut">{mi.shortcut}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default ContextMenu;
