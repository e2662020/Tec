import { $node } from '@milkdown/utils';

export const tocNode = $node('toc', (_ctx) => ({
  group: 'block',
  atom: true,
  parseDOM: [{ tag: 'div[data-toc]' }],
  toDOM: () => ['div', { 'data-toc': 'true', class: 'toc-container' }, 0],
  parseMarkdown: {
    match: () => false,
    runner: (_state, _node, _type) => { /* no-op */ },
  },
  toMarkdown: {
    match: () => false,
    runner: (_state, _node) => { /* no-op */ },
  },
}));
