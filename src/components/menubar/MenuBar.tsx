import { useState, useCallback, useRef, useEffect } from 'react';
import { useFileOps } from '../../hooks/useFileOps';
import { useEditorStore } from '../../store/editorStore';

type MenuId = 'file' | 'edit' | 'view' | 'help';

interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  icon?: string;
}

interface MenuBarProps {
  onAbout?: () => void;
  onSettings?: () => void;
}

export function MenuBar({ onAbout, onSettings }: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { saveFile, openMdFile, openFolder } = useFileOps();
  const toggleSidebar = useEditorStore((s) => s.toggleSidebar);
  const toggleEditorMode = useEditorStore((s) => s.toggleEditorMode);
  const sidebarVisible = useEditorStore((s) => s.sidebarVisible);

  const handleMenuClick = useCallback((menu: MenuId) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  }, []);

  const handleAction = useCallback(
    (action?: () => void) => {
      if (action) action();
      setOpenMenu(null);
    },
    [],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openMenu]);

  const menus: Record<MenuId, MenuItem[]> = {
    file: [
      { label: '新建', shortcut: 'Ctrl+N', icon: 'fa-file', action: () => useEditorStore.getState().closeFile() },
      { label: '打开文件', shortcut: 'Ctrl+O', icon: 'fa-folder-open', action: () => openMdFile() },
      { label: '打开文件夹', icon: 'fa-folder', action: () => openFolder() },
      { label: '保存', shortcut: 'Ctrl+S', icon: 'fa-save', action: () => saveFile() },
    ],
    edit: [
      { label: '撤销', shortcut: 'Ctrl+Z', icon: 'fa-undo' },
      { label: '重做', shortcut: 'Ctrl+Y', icon: 'fa-redo' },
      { label: '切换源码模式', shortcut: 'Ctrl+/', icon: 'fa-code', action: () => toggleEditorMode() },
    ],
    view: [
      {
        label: sidebarVisible ? '隐藏侧边栏' : '显示侧边栏',
        shortcut: 'Ctrl+Shift+L',
        icon: sidebarVisible ? 'fa-eye-slash' : 'fa-eye',
        action: () => toggleSidebar(),
      },
    ],
    help: [
      { label: '设置', shortcut: 'Ctrl+,', icon: 'fa-cog', action: () => onSettings?.() },
      { label: '关于 Tec', icon: 'fa-info-circle', action: () => onAbout?.() },
    ],
  };

  const menuLabels: Record<MenuId, string> = {
    file: '文件',
    edit: '编辑',
    view: '视图',
    help: '帮助',
  };

  return (
    <nav className="menubar" ref={menuRef}>
      {(Object.keys(menus) as MenuId[]).map((menuId) => (
        <div key={menuId} className="menubar-dropdown">
          <button
            className={`menubar-item ${openMenu === menuId ? 'active' : ''}`}
            onClick={() => handleMenuClick(menuId)}
          >
            {menuLabels[menuId]}
          </button>
          {openMenu === menuId && (
            <div className="menubar-dropdown-content">
              {menus[menuId].map((item) => (
                <button
                  key={item.label}
                  className="menubar-dropdown-item"
                  onClick={() => handleAction(item.action)}
                >
                  <span>
                    {item.icon && <i className={`fas ${item.icon}`} style={{ marginRight: 8, width: 16, textAlign: 'center' }}></i>}
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <span className="menubar-shortcut">{item.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default MenuBar;
