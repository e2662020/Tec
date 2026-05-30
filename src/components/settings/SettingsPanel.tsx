import { useState, useCallback } from 'react';
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

const FONT_OPTIONS = [
  { id: 'system', name: '系统默认', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif' },
  { id: 'serif', name: '衬线字体', value: '"Charter", "Georgia", "Noto Serif", "Times New Roman", serif' },
  { id: 'mono', name: '等宽字体', value: '"Cascadia Code", "Fira Code", "JetBrains Mono", "Consolas", monospace' },
];

const LINE_HEIGHT_OPTIONS = [
  { id: 'compact', name: '紧凑 (1.4)', value: 1.4 },
  { id: 'normal', name: '标准 (1.6)', value: 1.6 },
  { id: 'relaxed', name: '宽松 (1.8)', value: 1.8 },
  { id: 'loose', name: '松散 (2.0)', value: 2.0 },
];

const CONTENT_WIDTH_OPTIONS = [
  { id: 'narrow', name: '窄 (720px)', value: 720 },
  { id: 'medium', name: '标准 (860px)', value: 860 },
  { id: 'wide', name: '宽 (1000px)', value: 1000 },
  { id: 'full', name: '全宽 (1200px)', value: 1200 },
];

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

type TabId = 'general' | 'editor' | 'theme' | 'advanced';

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('general');
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

  if (!open) return null;

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'general', label: '通用', icon: 'fa-sliders-h' },
    { id: 'editor', label: '编辑器', icon: 'fa-pen' },
    { id: 'theme', label: '主题', icon: 'fa-palette' },
    { id: 'advanced', label: '高级', icon: 'fa-cog' },
  ];

  return (
    <div className="settings-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="settings-panel">
        <div className="settings-header">
          <h2 className="settings-title"><i className="fas fa-cog"></i> 设置</h2>
          <button className="settings-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="settings-body">
          <nav className="settings-sidebar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={`fas ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="settings-content">
            {activeTab === 'general' && (
              <div className="settings-section">
                <h3>通用设置</h3>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>自动保存</span>
                    <span className="settings-desc">每隔一段时间自动保存文档</span>
                  </label>
                  <label className="settings-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>自动保存间隔</span>
                    <span className="settings-desc">自动保存的时间间隔（秒）</span>
                  </label>
                  <select className="settings-select" defaultValue="30">
                    <option value="10">10 秒</option>
                    <option value="30">30 秒</option>
                    <option value="60">1 分钟</option>
                    <option value="300">5 分钟</option>
                  </select>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>显示状态栏</span>
                    <span className="settings-desc">在窗口底部显示状态栏</span>
                  </label>
                  <label className="settings-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>图片自动压缩</span>
                    <span className="settings-desc">拖入图片时自动压缩为 WebP</span>
                  </label>
                  <label className="settings-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'editor' && (
              <div className="settings-section">
                <h3>编辑器设置</h3>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>默认字体</span>
                    <span className="settings-desc">编辑器的默认字体</span>
                  </label>
                  <select className="settings-select" defaultValue="system">
                    {FONT_OPTIONS.map((font) => (
                      <option key={font.id} value={font.id}>{font.name}</option>
                    ))}
                  </select>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>行高</span>
                    <span className="settings-desc">正文的行高倍数</span>
                  </label>
                  <select className="settings-select" defaultValue="normal">
                    {LINE_HEIGHT_OPTIONS.map((lh) => (
                      <option key={lh.id} value={lh.id}>{lh.name}</option>
                    ))}
                  </select>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>内容宽度</span>
                    <span className="settings-desc">编辑区内容的最大宽度</span>
                  </label>
                  <select className="settings-select" defaultValue="medium">
                    {CONTENT_WIDTH_OPTIONS.map((cw) => (
                      <option key={cw.id} value={cw.id}>{cw.name}</option>
                    ))}
                  </select>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>标题缩放</span>
                    <span className="settings-desc">标题相对于正文的缩放比例</span>
                  </label>
                  <div className="settings-range">
                    <input type="range" min="0.8" max="1.3" step="0.1" defaultValue="1.0" />
                    <span>1.0x</span>
                  </div>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>拼写检查</span>
                    <span className="settings-desc">启用浏览器拼写检查</span>
                  </label>
                  <label className="settings-toggle">
                    <input type="checkbox" />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>打字机模式</span>
                    <span className="settings-desc">光标始终保持在屏幕中央</span>
                  </label>
                  <label className="settings-toggle">
                    <input type="checkbox" />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>聚焦模式</span>
                    <span className="settings-desc">只高亮当前段落，其他内容变暗</span>
                  </label>
                  <label className="settings-toggle">
                    <input type="checkbox" />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="settings-section">
                <h3>主题设置</h3>
                <div className="settings-theme-grid">
                  {BUILT_IN_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      className={`settings-theme-card ${currentTheme === theme.id ? 'active' : ''}`}
                      onClick={() => handleThemeChange(theme.id)}
                    >
                      <div className="settings-theme-preview" data-theme={theme.id}>
                        <div className="settings-theme-preview-content">
                          <div className="settings-theme-preview-title">Aa</div>
                          <div className="settings-theme-preview-line"></div>
                          <div className="settings-theme-preview-line short"></div>
                        </div>
                      </div>
                      <div className="settings-theme-info">
                        <span className="settings-theme-name">{theme.name}</span>
                        <span className="settings-theme-type">{theme.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="settings-section">
                <h3>高级设置</h3>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>LaTeX 渲染引擎</span>
                    <span className="settings-desc">选择数学公式渲染方式</span>
                  </label>
                  <select className="settings-select" defaultValue="katex">
                    <option value="katex">KaTeX（快速）</option>
                    <option value="mathjax">MathJax（完整）</option>
                  </select>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>代码高亮主题</span>
                    <span className="settings-desc">代码块的语法高亮样式</span>
                  </label>
                  <select className="settings-select" defaultValue="github">
                    <option value="github">GitHub</option>
                    <option value="monokai">Monokai</option>
                    <option value="dracula">Dracula</option>
                    <option value="nord">Nord</option>
                  </select>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>相似图片检测阈值</span>
                    <span className="settings-desc">dHash 汉明距离阈值（越小越严格）</span>
                  </label>
                  <div className="settings-range">
                    <input type="range" min="5" max="15" step="1" defaultValue="8" />
                    <span>8</span>
                  </div>
                </div>
                <div className="settings-item">
                  <label className="settings-label">
                    <span>SSIM 相似度阈值</span>
                    <span className="settings-desc">结构相似度阈值（越大越严格）</span>
                  </label>
                  <div className="settings-range">
                    <input type="range" min="0.7" max="0.95" step="0.05" defaultValue="0.85" />
                    <span>0.85</span>
                  </div>
                </div>
                <div className="settings-item danger">
                  <label className="settings-label">
                    <span>重置所有设置</span>
                    <span className="settings-desc">恢复默认设置（不可撤销）</span>
                  </label>
                  <button className="settings-btn-danger">重置</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
