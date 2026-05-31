import { useState, useCallback, useRef, useEffect } from 'react';
import { useFileOps } from '../../hooks/useFileOps';
import { useEditorStore } from '../../store/editorStore';
import { useGalleryStore } from '../../store/galleryStore';

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
  children?: React.ReactNode;
}

export function MenuBar({ onAbout, onSettings, children }: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { saveFile, openMdFile, openFolder, newFile } = useFileOps();
  const toggleSidebar = useEditorStore((s) => s.toggleSidebar);
  const toggleEditorMode = useEditorStore((s) => s.toggleEditorMode);
  const closeFile = useEditorStore((s) => s.closeFile);
  const sidebarVisible = useEditorStore((s) => s.sidebarVisible);
  const galleryVisible = useGalleryStore((s) => s.visible);
  const toggleGallery = useGalleryStore((s) => s.toggleVisible);

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
      { label: '新建', shortcut: 'Ctrl+N', icon: 'bi-file-earmark-plus', action: () => newFile() },
      { label: '打开文件', shortcut: 'Ctrl+O', icon: 'bi-file-earmark', action: () => openMdFile() },
      { label: '打开文件夹', icon: 'bi-folder', action: () => openFolder() },
      { label: '保存', shortcut: 'Ctrl+S', icon: 'bi-floppy', action: () => saveFile() },
      { label: '关闭文件', shortcut: 'Ctrl+W', icon: 'bi-x-circle', action: () => closeFile() },
    ],
    edit: [
      { label: '撤销', shortcut: 'Ctrl+Z', icon: 'bi-arrow-counterclockwise' },
      { label: '重做', shortcut: 'Ctrl+Y', icon: 'bi-arrow-clockwise' },
      { label: '切换源码模式', shortcut: 'Ctrl+/', icon: 'bi-code-slash', action: () => toggleEditorMode() },
    ],
    view: [
      {
        label: sidebarVisible ? '隐藏侧边栏' : '显示侧边栏',
        shortcut: 'Ctrl+Shift+L',
        icon: sidebarVisible ? 'bi-eye-slash' : 'bi-eye',
        action: () => toggleSidebar(),
      },
      {
        label: galleryVisible ? '隐藏图片库' : '显示图片库',
        icon: galleryVisible ? 'bi-images' : 'bi-image',
        action: () => toggleGallery(),
      },
    ],
    help: [
      { label: '设置', shortcut: 'Ctrl+,', icon: 'bi-gear', action: () => onSettings?.() },
      { label: '关于 Tec', icon: 'bi-info-circle', action: () => onAbout?.() },
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
                  <span className="menubar-item-label">
                    {item.icon && <i className={`bi ${item.icon}`}></i>}
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
      {children}
    </nav>
  );
}

export default MenuBar;
