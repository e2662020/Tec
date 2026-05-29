import { $node } from '@milkdown/utils';

export const columnsNode = $node('columns', (_ctx) => ({
  group: 'block',
  content: 'block+',
  isolating: true,
  attrs: { count: { default: 2 } },
  parseDOM: [{
    tag: 'div[data-columns]',
    getAttrs: (dom) => {
      if (typeof dom === 'string') return { count: 2 };
      return { count: parseInt((dom as HTMLElement).getAttribute('data-count') || '2') };
    },
  }],
  toDOM: (node) => [
    'div',
    {
      'data-columns': 'true',
      'data-count': node.attrs.count,
      style: `display: grid; grid-template-columns: repeat(${node.attrs.count}, 1fr); gap: 20px;`,
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
