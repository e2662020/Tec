import { $node } from '@milkdown/utils';

export const frontmatterNode = $node('frontmatter', (_ctx) => ({
  group: 'block',
  isolating: true,
  content: 'text*',
  attrs: { data: { default: '{}' } },
  parseDOM: [{
    tag: 'div[data-frontmatter]',
    getAttrs: (dom) => {
      if (typeof dom === 'string') return { data: '{}' };
      return { data: (dom as HTMLElement).getAttribute('data-data') || '{}' };
    },
  }],
  toDOM: (node) => {
    const dom = document.createElement('div');
    dom.setAttribute('data-frontmatter', 'true');
    dom.style.cssText = 'padding: 12px; background: var(--tec-bg-secondary); border-radius: 6px; margin-bottom: 16px; font-size: 13px;';
    try {
      const data = JSON.parse(node.attrs.data);
      const rows = Object.entries(data)
        .map(([k, v]) => `<tr><td style="padding:2px 8px;font-weight:600;">${k}</td><td style="padding:2px 8px;">${v}</td></tr>`)
        .join('');
      dom.innerHTML = `<table style="border-collapse:collapse;">${rows}</table>`;
    } catch { /* empty */ }
    return dom;
  },
  parseMarkdown: {
    match: () => false,
    runner: (_state, _node, _type) => { /* no-op */ },
  },
  toMarkdown: {
    match: () => false,
    runner: (_state, _node) => { /* no-op */ },
  },
}));
