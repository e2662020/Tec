import { $mark } from '@milkdown/utils';

export const superscriptMark = $mark('superscript', (_ctx) => ({
  group: 'inline',
  inline: true,
  excludes: '_',
  parseDOM: [{ tag: 'sup' }],
  toDOM: () => ['sup', 0],
  parseMarkdown: {
    match: () => false,
    runner: (_state, _node, _type) => { /* no-op */ },
  },
  toMarkdown: {
    match: () => false,
    runner: (_state, _mark) => { /* no-op */ },
  },
}));

export const subscriptMark = $mark('subscript', (_ctx) => ({
  group: 'inline',
  inline: true,
  excludes: '_',
  parseDOM: [{ tag: 'sub' }],
  toDOM: () => ['sub', 0],
  parseMarkdown: {
    match: () => false,
    runner: (_state, _node, _type) => { /* no-op */ },
  },
  toMarkdown: {
    match: () => false,
    runner: (_state, _mark) => { /* no-op */ },
  },
}));
