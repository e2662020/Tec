import { $mark } from '@milkdown/utils';

export const coloredTextMark = $mark('colored_text', (_ctx) => ({
  group: 'inline',
  inline: true,
  attrs: {
    color: { default: '#E74C3C' },
  },
  parseDOM: [{
    tag: 'span[data-colored-text]',
    getAttrs: (dom) => {
      if (typeof dom === 'string') return { color: '#E74C3C' };
      return { color: (dom as HTMLElement).getAttribute('data-color') || '#E74C3C' };
    },
  }],
  toDOM: (mark) => [
    'span',
    {
      'data-colored-text': 'true',
      'data-color': mark.attrs.color,
      style: `color: ${mark.attrs.color};`,
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
