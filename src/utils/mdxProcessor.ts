const COLOR_MAP: Record<string, string> = {
  R: '#E74C3C',
  G: '#2ECC71',
  B: '#3498DB',
  O: '#E67E22',
  P: '#9B59B6',
  Y: '#F1C40F',
  C: '#1ABC9C',
  K: '#2C3E50',
  W: '#95A5A6',
  H: '#E91E63',
};

const COLOR_REVERSE: Record<string, string> = {};
for (const [k, v] of Object.entries(COLOR_MAP)) {
  COLOR_REVERSE[v] = k;
}

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

const EMOJI_REVERSE: Record<string, string> = {};
for (const [k, v] of Object.entries(EMOJI_MAP)) {
  EMOJI_REVERSE[v] = k;
}

export function preprocessMdx(md: string): string {
  let result = md;

  result = result.replace(
    /\|\|(\d{1,2})(?::(\w+))?\n([\s\S]*?)\n\|\|\|/g,
    (_, count: string, mode: string, content: string) => {
      const n = parseInt(count);
      if (mode === 'print') {
        const blocks = content.split(/\n\|\|\n/);
        const rendered = blocks.map((b: string) => `<div class="tec-column-cell">${b.trim()}</div>`).join('\n');
        return `<div data-columns="true" data-count="${n}" data-mode="print">${rendered}</div>`;
      }
      if (content.includes('\n||\n')) {
        const blocks = content.split(/\n\|\|\n/);
        const rendered = blocks.map((b: string) => `<div class="tec-column-cell">${b.trim()}</div>`).join('\n');
        return `<div data-columns="true" data-count="${n}">${rendered}</div>`;
      }
      const paragraphs = content.split(/\n\n+/);
      const rendered = paragraphs.map((p: string) => `<div class="tec-column-cell">${p.trim()}</div>`).join('\n');
      return `<div data-columns="true" data-count="${n}">${rendered}</div>`;
    },
  );

  result = result.replace(
    /&([A-Za-z]|#[0-9A-Fa-f]{6})(.+?)&\1/g,
    (_, code: string, text: string) => {
      const color = code.startsWith('#') ? code : (COLOR_MAP[code] || '#E74C3C');
      return `<span data-colored-text="true" data-color="${color}">${text}</span>`;
    },
  );

  result = result.replace(/==([^=]+)==/g, '<mark>$1</mark>');

  result = result.replace(/\^([^^]+)\^/g, '<sup>$1</sup>');

  result = result.replace(/~([^~]+)~/g, '<sub>$1</sub>');

  for (const [code, emoji] of Object.entries(EMOJI_MAP)) {
    result = result.replace(new RegExp(`:${code}:`, 'g'), emoji);
  }

  result = result.replace(
    /^=== (.+?) ===$/gm,
    '<div data-aligned="true" data-align="center">$1</div>',
  );
  result = result.replace(
    /^>>> (.+?) >>>$/gm,
    '<div data-aligned="true" data-align="right">$1</div>',
  );
  result = result.replace(
    /^<<< (.+?) <<<$/gm,
    '<div data-aligned="true" data-align="left">$1</div>',
  );

  return result;
}

export function postprocessMdx(md: string): string {
  let result = md;

  result = result.replace(
    /<div data-columns="true" data-count="(\d+)"(?: data-mode="(\w+)")?>([\s\S]*?)<\/div>/g,
    (_, count: string, mode: string, content: string) => {
      const cells = content.match(/<div class="tec-column-cell">([\s\S]*?)<\/div>/g);
      if (!cells) return `||${count}\n${content.trim()}\n|||`;
      const cellContents = cells.map((c: string) => {
        const m = c.match(/<div class="tec-column-cell">([\s\S]*?)<\/div>/);
        return m ? m[1].trim() : '';
      });
      const modeSuffix = mode === 'print' ? ':print' : '';
      const hasManualSplit = cellContents.length > 1 && content.includes('\n||\n');
      if (hasManualSplit || cellContents.length > 1) {
        return `||${count}${modeSuffix}\n${cellContents.join('\n||\n')}\n|||`;
      }
      return `||${count}${modeSuffix}\n${cellContents.join('\n\n')}\n|||`;
    },
  );

  result = result.replace(
    /<span data-colored-text="true" data-color="([^"]+)">([^<]*)<\/span>/g,
    (_, color: string, text: string) => {
      const code = COLOR_REVERSE[color] || color;
      return `&${code}${text}&${code}`;
    },
  );

  result = result.replace(/<mark>([^<]*)<\/mark>/g, '==$1==');

  result = result.replace(/<sup>([^<]*)<\/sup>/g, '^$1^');

  result = result.replace(/<sub>([^<]*)<\/sub>/g, '~$1~');

  for (const [emoji, code] of Object.entries(EMOJI_REVERSE)) {
    result = result.replace(new RegExp(emoji, 'g'), `:${code}:`);
  }

  result = result.replace(
    /<div data-aligned="true" data-align="center">\s*([^<]*?)\s*<\/div>/g,
    '=== $1 ===',
  );
  result = result.replace(
    /<div data-aligned="true" data-align="right">\s*([^<]*?)\s*<\/div>/g,
    '>>> $1 >>>',
  );
  result = result.replace(
    /<div data-aligned="true" data-align="left">\s*([^<]*?)\s*<\/div>/g,
    '<<< $1 <<<',
  );

  return result;
}