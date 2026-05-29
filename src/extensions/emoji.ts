import { $node } from '@milkdown/utils';

const EMOJI_MAP: Record<string, string> = {
  smile: '😊', grin: '😁', joy: '😂', laugh: '😆',
  heart: '❤️', wink: '😉', cry: '😢', angry: '😠',
  thumbsup: '👍', thumbsdown: '👎', clap: '👏',
  fire: '🔥', star: '⭐', rocket: '🚀',
  check: '✅', x: '❌', warning: '⚠️',
  plus: '➕', minus: '➖', info: 'ℹ️',
  sun: '☀️', moon: '🌙', cloud: '☁️', rain: '🌧️',
  coffee: '☕', pizza: '🍕', book: '📖',
  '100': '💯', tada: '🎉', sparkles: '✨',
};

export const emojiNode = $node('emoji', (_ctx) => ({
  group: 'inline',
  inline: true,
  atom: true,
  attrs: { code: { default: '' } },
  parseDOM: [{
    tag: 'span[data-emoji]',
    getAttrs: (dom) => {
      if (typeof dom === 'string') return { code: '' };
      return { code: (dom as HTMLElement).getAttribute('data-code') || '' };
    },
  }],
  toDOM: (node) => [
    'span',
    { 'data-emoji': 'true', 'data-code': node.attrs.code },
    EMOJI_MAP[node.attrs.code] || `:${node.attrs.code}:`,
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
