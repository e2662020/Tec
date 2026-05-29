import { $mark } from '@milkdown/utils';

export const highlightMark = $mark('highlight', (_ctx) => ({
  group: 'inline',
  inline: true,
  parseDOM: [
    { tag: 'mark' },
    { tag: 'span[data-highlight]' },
  ],
  toDOM: () => [
    'mark',
    {
      'data-highlight': 'true',
      style: 'background: #FFF176; padding: 2px 0;',
    },
    0,
  ],
  parseMarkdown: {
    match: () => false,
    runner: (_state, _node, _type) => { /* no-op */ },
  },
  toMarkdown: {
    match: () => false,
    runner: (_state, _mark) => { /* no-op */ },
  },
}));
