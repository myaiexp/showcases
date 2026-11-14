// use() inside a function adds the extension again on every call
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row } from '../../shared/panes.ts';
import { button } from '../../shared/controls.ts';

const TEXT = 'Milk';

/** An extension that adds one "!" to every piece of text and counts how often it ran on the paragraph. */
function excite(counter: { ran: number }) {
  return {
    walkTokens(token: { type: string; text?: string }) {
      if (token.type === 'paragraph') counter.ran++;
      if (token.type === 'text' && token.text !== undefined) token.text += '!';
    },
  };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press Render several times' });

  const wrong = docPane(stage, 'use() inside render()');
  const right = docPane(stage, 'use() once, at the start');
  row(stage.root, wrong.el, right.el);

  // Private instances: the global marked is never given the extension.
  let badCounter = { ran: 0 };
  let goodCounter = { ran: 0 };
  let bad = new Marked();
  let good = new Marked();
  let n = 0;
  const lines: [string, string] = ['', ''];

  const setup = (): void => {
    badCounter = { ran: 0 };
    goodCounter = { ran: 0 };
    bad = new Marked();
    good = new Marked();
    good.use(excite(goodCounter)); // once, right after creating the instance
    n = 0;
    lines[0] = '';
    lines[1] = '';
    wrong.show('');
    right.show('');
  };

  const render = (): void => {
    n++;
    // The mistake: every call to render() adds the same extension once more.
    bad.use(excite(badCounter));
    badCounter.ran = 0;
    goodCounter.ran = 0;
    const a = bad.parse(TEXT, { async: false }).replace(/<\/?p>/g, '').trim();
    const b = good.parse(TEXT, { async: false }).replace(/<\/?p>/g, '').trim();
    lines[0] += `<div>${a} <small>(render ${n}: ran ${badCounter.ran}x)</small></div>`;
    lines[1] += `<div>${b} <small>(render ${n}: ran ${goodCounter.ran}x)</small></div>`;
    wrong.show(lines[0]!);
    right.show(lines[1]!);
  };

  setup();
  if (stage.preview) {
    stage.play(async (wait) => {
      setup();
      for (let i = 0; i < 5; i++) {
        await wait(900);
        render();
      }
      await wait(2200);
    });
  } else {
    button(stage.bar!, 'Render', render);
    button(stage.bar!, 'Start over', setup);
    note(stage.root, 'Left: each Render calls use() first, so the extension is registered again and "!" is added once more per call. Right: use() ran a single time, so the answer is stable.');
  }
  return () => stage.dispose();
};

export default mount;
