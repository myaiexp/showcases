// renderer.space marks where blank lines were, which Marked drops
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const VERSE = `First verse, two lines
of a made-up song.

Second verse follows after one blank line.



Third verse comes after a long pause.`;

const CARD = `Verse one

Verse two



Verse three`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or remove blank lines between paragraphs' });

  const gaps = new Marked({
    renderer: {
      // The token's raw text is the newlines: one ends the line, the rest are blank lines.
      space({ raw }) {
        const blank = raw.length - 1;
        return `<div class="gap" style="height:${0.9 + blank * 0.9}em"><span>${blank} blank ${blank === 1 ? 'line' : 'lines'}</span></div>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : VERSE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'space override', render: (md) => render(gaps, md) },
    ],
    caption:
      'Marked turns any number of blank lines into one paragraph break and drops them. A space renderer sees them, so here the page leaves a labelled gap as tall as the blank lines typed.',
  });

  return () => stage.dispose();
};

export default mount;
