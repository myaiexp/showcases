// An inline extension swaps :shortcode: for an emoji from a small local table
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { note } from '../../shared/panes.ts';
import { render } from '../../shared/renderer-kit.ts';

const EMOJI: Record<string, string> = {
  smile: '😄',
  coffee: '☕',
  tada: '🎉',
  pizza: '🍕',
  sunny: '☀️',
  heart: '❤️',
  rocket: '🚀',
};

const SAMPLE = `Lunch :pizza: at 12:30, then coffee :coffee:
Release shipped :rocket: :tada:
Sunny weekend ahead :sunny: :smile:
Not a code: :unknown:`;

const CARD = `Pizza :pizza: at 12
Shipped :rocket: :tada:
Coffee :coffee: :smile:`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type :name: between colons' });

  const chat = new Marked({
    extensions: [
      {
        name: 'emoji',
        level: 'inline',
        start: (src) => src.indexOf(':'),
        tokenizer(src) {
          const match = /^:([a-z0-9_+-]+):/.exec(src);
          const glyph = match && EMOJI[match[1]!];
          return match && glyph ? { type: 'emoji', raw: match[0], glyph } : undefined;
        },
        renderer: (token) => String(token.glyph),
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(chat, md),
    caption: 'Each known :shortcode: is replaced by its emoji; the unknown one and the clock time 12:30 are left as typed.',
  });
  if (!stage.preview) note(stage.root, `Known codes: ${Object.keys(EMOJI).map((k) => `:${k}:`).join(' ')}`);

  return () => stage.dispose();
};

export default mount;
