// An inline extension turns ==text== into a yellow <mark> highlight
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Trip checklist:
- Bring ==passport== and ==€50 cash==
- Train leaves at ==07:42==, **not** 08:00
- Pack a *light* jacket`;

const CARD = `Bring ==passport==
and ==€50 cash==
at ==07:42==`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap words in == on both sides' });

  const highlighter = new Marked({
    extensions: [
      {
        name: 'highlight',
        level: 'inline',
        start: (src) => src.indexOf('=='),
        tokenizer(src) {
          const match = /^==([^=\n]+)==/.exec(src);
          if (!match) return undefined;
          // The text between the marks may hold more Markdown, so it is lexed as inline tokens.
          return { type: 'highlight', raw: match[0], tokens: this.lexer.inlineTokens(match[1]!) };
        },
        renderer(token) {
          return `<mark>${this.parser.parseInline(token.tokens ?? [])}</mark>`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(highlighter, md),
    caption: 'Text between double equals signs gets a yellow highlighter stroke, and **bold** or *italic* still work inside it.',
  });

  return () => stage.dispose();
};

export default mount;
