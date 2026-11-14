// An inline extension turns ||text|| into a hidden bar; click to reveal
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { button } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Book club thread, chapter 12:
- The butler did it: ||it was the butler||
- Best twist: ||the letter was forged||
- Final line: ||"And she never came back."||

No spoilers in this line.`;

const CARD = `Who did it?
||It was the butler||
Twist: ||forged letter||`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap a secret in ||two bars||' });

  const forum = new Marked({
    extensions: [
      {
        name: 'spoiler',
        level: 'inline',
        start: (src) => src.indexOf('||'),
        tokenizer(src) {
          const match = /^\|\|([^|\n]+)\|\|/.exec(src);
          return match ? { type: 'spoiler', raw: match[0], tokens: this.lexer.inlineTokens(match[1]!) } : undefined;
        },
        renderer(token) {
          return `<button type="button" class="spoiler">${this.parser.parseInline(token.tokens ?? [])}</button>`;
        },
      },
    ],
  });

  // Cards have no pointer, so a timer reveals and hides every spoiler together.
  let shown = false;
  const live = liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(forum, md),
    caption: 'The secret text is hidden behind a bar until you click it. Click again to hide it. The reveal is plain page code; Marked only writes the buttons.',
    after: (doc) => {
      if (stage.preview) doc.body.querySelectorAll('.spoiler').forEach((s) => s.classList.toggle('revealed', shown));
    },
  });
  if (stage.preview) {
    stage.every(1600, () => {
      shown = !shown;
      live.doc.body.querySelectorAll('.spoiler').forEach((s) => s.classList.toggle('revealed', shown));
    });
  } else {
    // One listener on the pane works for every spoiler, even after the page is re-rendered.
    stage.listen(live.doc.body, 'click', (e) => {
      (e.target as Element).closest('.spoiler')?.classList.toggle('revealed');
    });
    button(stage.bar!, 'Reveal all', () => live.doc.body.querySelectorAll('.spoiler').forEach((s) => s.classList.add('revealed')));
    button(stage.bar!, 'Hide all', () => live.doc.body.querySelectorAll('.spoiler').forEach((s) => s.classList.remove('revealed')));
  }

  return () => stage.dispose();
};

export default mount;
