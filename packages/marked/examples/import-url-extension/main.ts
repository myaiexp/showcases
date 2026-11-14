// An extension plus async walkTokens pulls another page's content in
import { Marked, type Token, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane } from '../../shared/panes.ts';
import { button, readout } from '../../shared/controls.ts';

const TEXT = `# Camping trip

:https://notes.test/packing:

:https://notes.test/menu:

:https://notes.test/lost-page:`;

const CARD = `# Camping

:https://n.test/packing:

:https://n.test/gone:`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each :address: line is replaced by the page it points to' });

  // Pages that "exist", as blob: addresses created here. Anything else gets a revoked blob and fails.
  const pages: Record<string, string> = {
    packing: '<h3>Packing</h3><ul><li>Tent</li><li>Sleeping bags</li><li>Torch</li></ul>',
    menu: '<h3>Menu</h3><ol><li>Pancakes</li><li>Soup</li></ol>',
  };
  const urls = new Map<string, string>();
  for (const [name, html] of Object.entries(pages)) {
    for (const host of ['notes.test', 'n.test']) urls.set(`https://${host}/${name}`, URL.createObjectURL(new Blob([html], { type: 'text/html' })));
  }
  const dead = URL.createObjectURL(new Blob(['x']));
  URL.revokeObjectURL(dead);
  stage.onDispose(() => urls.forEach((u) => URL.revokeObjectURL(u)));

  interface ImportToken extends Tokens.Generic {
    url: string;
    html: string;
  }

  const m = new Marked({
    async: true,
    extensions: [
      {
        name: 'importUrl',
        level: 'block',
        start(src) {
          return src.indexOf('\n:');
        },
        tokenizer(src) {
          const match = /^:(https?:\/\/.+?):/.exec(src);
          if (match) return { type: 'importUrl', raw: match[0], url: match[1]!, html: '' }; // html is filled in by walkTokens
          return undefined;
        },
        renderer(token) {
          return (token as ImportToken).html;
        },
      },
    ],
    async walkTokens(token: Token) {
      if (token.type !== 'importUrl') return;
      const t = token as ImportToken;
      await stage.wait(600);
      try {
        const res = await fetch(urls.get(t.url) ?? dead);
        t.html = await res.text();
      } catch {
        t.html = `<p><em>Could not load ${t.url.replace(/^https:\/\//, '')}</em></p>`;
      }
    },
  });

  const src = sourcePane(stage, stage.preview ? CARD : TEXT);
  const doc = docPane(stage, 'The page, once everything arrived');
  const status = readout(stage.root);
  row(stage.root, src.el, doc.el);
  stage.root.append(status);

  let run = 0;
  const go = async (): Promise<void> => {
    const mine = ++run;
    status.textContent = 'parse() returned a pending Promise';
    doc.show('<p><em>Fetching pages...</em></p>');
    try {
      const html = await m.parse(src.value());
      if (mine !== run || stage.disposed) return;
      doc.show(html);
      status.textContent = 'Promise resolved';
    } catch (err) {
      if (!stage.disposed) throw err;
    }
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      void go();
      await wait(4200);
    });
  } else {
    src.onInput(() => void go());
    button(stage.bar!, 'Reload', () => void go());
    note(stage.root, 'The extension turns a :address: line into a token; walkTokens fetches the page behind it and stores its HTML on the token. The last address does not exist, so it shows an error note instead.');
    void go();
  }
  return () => stage.dispose();
};

export default mount;
