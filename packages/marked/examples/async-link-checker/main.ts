// An async walkTokens checks every link; dead ones get a title and a cross
import { Marked, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { button } from '../../shared/controls.ts';
import { esc } from '../../shared/renderer-kit.ts';

const TEXT = `Weekend reading:

- [Pasta recipe](https://recipes.test/pasta)
- [Old bakery menu](https://oldbakery.test/menu)
- [Bike route](https://maps.test/route-7)`;

const CARD = `[Pasta](https://recipes.test/pasta)

[Bakery](https://oldbakery.test/menu)

[Bike route](https://maps.test/route-7)`;

/** The pretend internet: these addresses answer, every other one is dead. */
const ALIVE = ['https://recipes.test/pasta', 'https://maps.test/route-7', 'https://news.test/today'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change an address to https://news.test/today to see a live one, or anything else for a dead one' });

  // "fetch" only ever talks to blob: addresses made here. A revoked blob address fails like a dead link.
  const live = new Map<string, string>();
  for (const url of ALIVE) live.set(url, URL.createObjectURL(new Blob(['<html>ok</html>'], { type: 'text/html' })));
  const deadBlob = URL.createObjectURL(new Blob(['gone']));
  URL.revokeObjectURL(deadBlob);
  stage.onDispose(() => live.forEach((u) => URL.revokeObjectURL(u)));

  const status = textPane(stage, 'Checks, as they come back');
  let lines: string[] = [];
  let queued = 0;
  let run = 0;

  const checker = new Marked({
    async: true,
    async walkTokens(token: Token) {
      if (token.type !== 'link') return;
      // walkTokens starts as parse() begins, so `run` here is the run this check belongs to.
      const mine = run;
      const n = queued++;
      await stage.wait(500 + n * 650); // each check "takes a while", one after another
      try {
        const res = await fetch(live.get(token.href) ?? deadBlob);
        if (!res.ok) throw new Error(String(res.status));
        if (mine === run) lines.push(`✅ ${token.href.replace(/^https:\/\//, '')}`);
      } catch {
        token.title = 'invalid'; // the docs' example marks a failed link this way
        if (mine === run) lines.push(`❌ ${token.href.replace(/^https:\/\//, '')}`);
      }
      // A check from an earlier edit still sleeping must not write into the new run's log.
      if (mine !== run || stage.disposed) return;
      status.show(lines.join('\n'));
    },
    renderer: {
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const dead = title === 'invalid';
        return `<a href="${esc(href)}">${dead ? `<del>${text}</del>` : text}</a> ${dead ? '❌ dead link' : '✅'}`;
      },
    },
  });

  const src = sourcePane(stage, stage.preview ? CARD : TEXT);
  const doc = docPane(stage, 'The page');
  row(stage.root, src.el, doc.el);
  stage.root.append(status.el);

  const go = async (): Promise<void> => {
    const mine = ++run;
    lines = [];
    queued = 0;
    status.show('checking...');
    doc.show('<p><em>Checking the links...</em></p>');
    try {
      const html = await checker.parse(src.value());
      if (mine !== run || stage.disposed) return;
      doc.show(html);
    } catch (err) {
      // Marked rewraps a rejection once async is on, so ignore every error after dispose.
      if (!stage.disposed) throw err;
    }
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      void go();
      await wait(5200);
    });
  } else {
    src.onInput(() => void go());
    button(stage.bar!, 'Check again', () => void go());
    note(stage.root, 'Every link is fetched in turn. The two live addresses answer; the dead one is marked invalid in walkTokens and the renderer draws it struck through with a cross.');
    void go();
  }
  return () => stage.dispose();
};

export default mount;
