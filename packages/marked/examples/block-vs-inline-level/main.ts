// One [[badge]] syntax as a block extension and as an inline one
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `[[New]]

The trail map is [[New]] this week, and
the café menu is [[Updated]] too.

[[Sale ends Friday]]`;

const CARD = `[[New]]

Map is [[New]] now.`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Put [[badges]] alone on a line and inside a sentence' });

  const blockLevel = new Marked({
    extensions: [
      {
        name: 'badge',
        level: 'block',
        start: (src) => src.indexOf('[['),
        tokenizer(src) {
          // A block token must start a block: the whole line is the badge.
          const match = /^\[\[([^\]\n]+)\]\][ \t]*(?:\n|$)/.exec(src);
          return match ? { type: 'badge', raw: match[0], text: match[1]! } : undefined;
        },
        renderer: (token) => `<div class="banner">${esc(String(token.text))}</div>\n`,
      },
    ],
  });
  const inlineLevel = new Marked({
    extensions: [
      {
        name: 'badge',
        level: 'inline',
        start: (src) => src.indexOf('[['),
        tokenizer(src) {
          const match = /^\[\[([^\]\n]+)\]\]/.exec(src);
          return match ? { type: 'badge', raw: match[0], text: match[1]! } : undefined;
        },
        renderer: (token) => `<span class="chip">${esc(String(token.text))}</span>`,
      },
    ],
  });

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    sides: [
      { label: 'level: block', render: (md) => render(blockLevel, md) },
      { label: 'level: inline', render: (md) => render(inlineLevel, md) },
    ],
    caption:
      'The block version only sees a badge that starts a block, so a lone [[New]] becomes a full-width banner and the ones inside sentences stay as typed. The inline version finds every badge inside text, and a lone one ends up inside a paragraph.',
  });

  return () => stage.dispose();
};

export default mount;
