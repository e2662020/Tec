import { useState, useCallback } from 'react';
import { useFileOps } from '../../hooks/useFileOps';
import { useEditorStore } from '../../store/editorStore';

type MenuId = 'file' | 'edit' | 'view' | 'help';

interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
}

export function MenuBar() {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
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

  const menus: Record<MenuId, MenuItem[]> = {
    file: [
      { label: '新建', shortcut: 'Ctrl+N', action: () => useEditorStore.getState().closeFile() },
      { label: '打开文件', shortcut: 'Ctrl+O', action: () => openMdFile() },
      { label: '打开文件夹', action: () => openFolder() },
      { label: '保存', shortcut: 'Ctrl+S', action: () => saveFile() },
    ],
    edit: [
      { label: '撤销', shortcut: 'Ctrl+Z' },
      { label: '重做', shortcut: 'Ctrl+Y' },
      { label: '切换源码模式', shortcut: 'Ctrl+/', action: () => toggleEditorMode() },
    ],
    view: [
      {
        label: sidebarVisible ? '隐藏侧边栏' : '显示侧边栏',
        shortcut: 'Ctrl+Shift+L',
        action: () => toggleSidebar(),
      },
    ],
    help: [
      { label: '关于 Tec', action: () => alert('Tec (Beta) - Typora 风格 Markdown 编辑器') },
    ],
  };

  return (
    <nav className="menubar" onMouseLeave={() => setOpenMenu(null)}>
      {(Object.keys(menus) as MenuId[]).map((menuId) => (
        <div key={menuId} className="menubar-dropdown">
          <button
            className={`menubar-item ${openMenu === menuId ? 'active' : ''}`}
            onClick={() => handleMenuClick(menuId)}
            onMouseEnter={() => setOpenMenu(menuId)}
          >
            {menuId === 'file'
              ? '文件'
              : menuId === 'edit'
                ? '编辑'
                : menuId === 'view'
                  ? '视图'
                  : '帮助'}
          </button>
          {openMenu === menuId && (
            <div className="menubar-dropdown-content">
              {menus[menuId].map((item) => (
                <button
                  key={item.label}
                  className="menubar-dropdown-item"
                  onClick={() => handleAction(item.action)}
                >
                  <span>{item.label}</span>
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
