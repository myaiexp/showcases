// async: true lets walkTokens await; parse() then returns a Promise
import { Marked, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage, STOPPED } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane } from '../../shared/panes.ts';
import { readout } from '../../shared/controls.ts';

const TEXT = `Dinner ideas:

- https://recipes.test/pasta
- https://recipes.test/curry`;

// A pretend page-title lookup, so nothing touches the network.
const TITLES: Record<string, string> = {
  'https://recipes.test/pasta': 'Creamy mushroom pasta',
  'https://recipes.test/curry': 'Chickpea curry in 20 minutes',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each web address is looked up, which takes a moment' });
  const src = sourcePane(stage, TEXT);
  const doc = docPane(stage, 'When the Promise resolves');
  const status = readout(stage.root);
  row(stage.root, src.el, doc.el);
  stage.root.append(status);

  const marked = new Marked({
    async: true,
    async walkTokens(token: Token) {
      if (token.type !== 'link') return;
      // Awaiting here is only allowed because async is true.
      await stage.wait(700);
      const title = TITLES[token.href];
      if (title) {
        // A bare address is an autolink, which prints token.text rather than its child tokens.
        token.text = title;
        token.tokens = [{ type: 'text', raw: title, text: title }];
      }
    },
  });

  let run = 0;
  const go = async (md: string): Promise<void> => {
    const mine = ++run;
    const started = performance.now();
    const promise = marked.parse(md); // a Promise, not a string
    status.textContent = `parse() returned: ${promise instanceof Promise ? 'Promise { <pending> }' : 'a string'}`;
    doc.show('<p><em>waiting for lookups...</em></p>');
    try {
      const html = await promise;
      if (mine !== run) return;
      doc.show(html);
      status.textContent = `Promise resolved after ${Math.round(performance.now() - started)} ms`;
    } catch (err) {
      // Marked rewrites a rejection's message, so a stopped wait no longer equals STOPPED: ignore all after dispose.
      if (!stage.disposed && err !== STOPPED) throw err;
    }
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      void go(TEXT);
      await wait(3600);
    });
  } else {
    src.onInput((t) => void go(t));
    note(stage.root, 'While the lookups run, parse() has already returned a pending Promise. When it resolves, each bare address has become its page title.');
    void go(TEXT);
  }
  return () => stage.dispose();
};

export default mount;
