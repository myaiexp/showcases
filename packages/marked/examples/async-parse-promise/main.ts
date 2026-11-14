// An async instance returns a Promise; without await you print [object Promise]
import { Marked, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { button } from '../../shared/controls.ts';

const TEXT = `# Meeting notes

We recieve teh report on friday.

Definately send it tomorow.`;

const CARD = `Teh report is due
tomorow, definately.`;

const FIXES: Record<string, string> = { teh: 'the', recieve: 'receive', definately: 'definitely', tomorow: 'tomorrow' };
const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The spell check is slow on purpose' });

  const m = new Marked({
    async: true,
    async walkTokens(token: Token) {
      // A pretend spell-check service that needs a moment per piece of text.
      if (token.type !== 'text' || 'tokens' in token) return;
      await stage.wait(1100);
      token.text = token.text.replace(/\b[a-z]+\b/gi, (w: string) => {
        const fix = FIXES[w.toLowerCase()];
        // Keep a capital at the start of a sentence: "Teh" becomes "The", not "the".
        return fix ? (w[0] === w[0]!.toUpperCase() ? fix[0]!.toUpperCase() + fix.slice(1) : fix) : w;
      });
    },
  });

  const src = sourcePane(stage, stage.preview ? CARD : TEXT);
  const forgot = textPane(stage, 'Printed without await');
  const doc = docPane(stage, 'Printed with await');
  const state = textPane(stage, 'The Promise');
  row(stage.root, src.el, doc.el);
  if (!stage.preview) stage.root.append(forgot.el);
  stage.root.append(state.el);
  if (!stage.preview) note(stage.root, 'While the spell check runs, the promise is pending and a spinner can show. Printing the Promise itself gives [object Promise], not the HTML: you must await it.');

  let run = 0;
  let spin = 0;
  let waiting = false;
  stage.every(100, () => {
    if (waiting) state.show(`${FRAMES[spin++ % FRAMES.length]} pending`);
  });

  const go = async (): Promise<void> => {
    const mine = ++run;
    waiting = true;
    const promise = m.parse(src.value());
    forgot.show(String(promise)); // "[object Promise]": the value, not the page
    doc.show('<p><em>waiting...</em></p>');
    try {
      const html = await promise;
      if (mine !== run || stage.disposed) return;
      waiting = false;
      state.show('✓ fulfilled with a string');
      doc.show(html);
    } catch (err) {
      if (!stage.disposed) throw err;
    }
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      void go();
      await wait(4000);
    });
  } else {
    src.onInput(() => void go());
    button(stage.bar!, 'Run again', () => void go());
    void go();
  }
  return () => stage.dispose();
};

export default mount;
