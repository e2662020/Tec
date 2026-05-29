import { useCallback } from 'react';
import { useEditorStore } from '../../store/editorStore';

const BUILT_IN_THEMES = [
  { id: 'Tec Light', name: 'Tec Light', type: '浅色' },
  { id: 'Tec Dark', name: 'Tec Dark', type: '深色' },
  { id: 'GitHub', name: 'GitHub', type: '浅色' },
  { id: 'Newsprint', name: 'Newsprint', type: '浅色' },
  { id: 'Night', name: 'Night', type: '深色' },
  { id: 'Pixyll', name: 'Pixyll', type: '浅色' },
  { id: 'Whitey', name: 'Whitey', type: '浅色' },
  { id: 'Gothic', name: 'Gothic', type: '深色' },
];

export function ThemeSelector() {
  const currentTheme = useEditorStore((s) => s.currentTheme);
  const setCurrentTheme = useEditorStore((s) => s.setCurrentTheme);

  const handleThemeChange = useCallback(
    (themeId: string) => {
      setCurrentTheme(themeId);
      document.documentElement.setAttribute('data-theme', themeId);
      localStorage.setItem('tec-theme', themeId);
    },
    [setCurrentTheme],
  );

  return (
    <div className="theme-selector">
      {BUILT_IN_THEMES.map((theme) => (
        <button
          key={theme.id}
          className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
          onClick={() => handleThemeChange(theme.id)}
          title={`${theme.name} (${theme.type})`}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}

export default ThemeSelector;
