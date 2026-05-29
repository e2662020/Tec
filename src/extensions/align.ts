import { $node } from '@milkdown/utils';

export const alignNode = $node('aligned_text', (_ctx) => ({
  group: 'block',
  content: 'inline*',
  attrs: { align: { default: 'center' } },
  parseDOM: [{
    tag: 'div[data-aligned]',
    getAttrs: (dom) => {
      if (typeof dom === 'string') return { align: 'center' };
      return { align: (dom as HTMLElement).getAttribute('data-align') || 'center' };
    },
  }],
  toDOM: (node) => [
    'div',
    {
      'data-aligned': 'true',
      'data-align': node.attrs.align,
      style: `text-align: ${node.attrs.align};`,
    },
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
