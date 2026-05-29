import { $node } from '@milkdown/utils';

export const footnoteRefNode = $node('footnote_ref', (_ctx) => ({
  group: 'inline',
  inline: true,
  atom: true,
  attrs: { id: { default: '' }, label: { default: '1' } },
  parseDOM: [{
    tag: 'sup[data-footnote-ref]',
    getAttrs: (dom) => {
      if (typeof dom === 'string') return { id: '', label: '1' };
      return {
        id: (dom as HTMLElement).getAttribute('data-id') || '',
        label: (dom as HTMLElement).textContent?.replace(/[\[\]]/g, '') || '1',
      };
    },
  }],
  toDOM: (node) => [
    'sup',
    { 'data-footnote-ref': node.attrs.id, style: 'color: var(--tec-accent); cursor: pointer;' },
    `[${node.attrs.label}]`,
  ],
  parseMarkdown: {
    match: () => false,
    runner: (_state, _node, _type) => { /* no-op */ },
  },
  toMarkdown: {
    match: () => false,
    runner: (_state, _node) => { /* no-op */ },
  },
}));

export const footnoteDefNode = $node('footnote_def', (_ctx) => ({
  group: 'block',
  content: 'block+',
  attrs: { id: { default: '' }, label: { default: '1' } },
  parseDOM: [{ tag: 'div[data-footnote-def]' }],
  toDOM: (node) => [
    'div',
    {
      'data-footnote-def': node.attrs.id,
      style: 'font-size: 0.9em; color: var(--tec-text-secondary); border-top: 1px solid var(--tec-border-light); padding-top: 8px; margin-top: 16px;',
    },
    ['sup', {}, node.attrs.label],
    ' ',
    0,
  ],
  parseMarkdown: {
    match: () => false,
    runner: (_state, _node, _type) => { /* no-op */ },
  },
  toMarkdown: {
    match: () => false,
    runner: (_state, _node) => { /* no-op */ },
  },
}));
