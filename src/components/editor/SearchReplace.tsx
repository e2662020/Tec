import { useState, useCallback, useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';

export function SearchReplace() {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const content = useEditorStore((s) => s.content);
  const setContent = useEditorStore((s) => s.setContent);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setVisible(true);
      }
      if (e.key === 'Escape' && visible) {
        setVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  const findMatches = useCallback(() => {
    if (!searchTerm) return [];
    try {
      const pattern = useRegex ? new RegExp(searchTerm, 'gi') : searchTerm;
      const matches: { index: number; text: string }[] = [];
      if (useRegex && pattern instanceof RegExp) {
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(content)) !== null) {
          matches.push({ index: match.index, text: match[0] });
        }
      } else {
        let idx = 0;
        const term = searchTerm.toLowerCase();
        const lower = content.toLowerCase();
        while ((idx = lower.indexOf(term, idx)) !== -1) {
          matches.push({ index: idx, text: content.slice(idx, idx + term.length) });
          idx += term.length;
        }
      }
      return matches;
    } catch {
      return [];
    }
  }, [content, searchTerm, useRegex]);

  const replaceAll = useCallback(() => {
    if (!searchTerm) return;
    try {
      if (useRegex) {
        const pattern = new RegExp(searchTerm, 'gi');
        setContent(content.replace(pattern, replaceTerm));
      } else {
        setContent(content.split(searchTerm).join(replaceTerm));
      }
    } catch { /* invalid regex */ }
  }, [content, searchTerm, replaceTerm, useRegex, setContent]);

  if (!visible) return null;

  const matches = findMatches();

  return (
    <div className="search-replace-dialog">
      <div className="search-replace-row">
        <i className="fas fa-search" style={{ color: 'var(--tec-text-tertiary)' }}></i>
        <input
          type="text"
          placeholder="搜索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        <span className="search-count">
          {matches.length} 个匹配
        </span>
      </div>
      <div className="search-replace-row">
        <i className="fas fa-exchange-alt" style={{ color: 'var(--tec-text-tertiary)' }}></i>
        <input
          type="text"
          placeholder="替换为..."
          value={replaceTerm}
          onChange={(e) => setReplaceTerm(e.target.value)}
        />
        <button onClick={replaceAll}><i className="fas fa-retweet"></i> 全部替换</button>
      </div>
      <div className="search-replace-options">
        <label>
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
          />
          正则表达式
        </label>
        <button onClick={() => setVisible(false)}><i className="fas fa-times"></i> 关闭</button>
      </div>
    </div>
  );
}

export default SearchReplace;
