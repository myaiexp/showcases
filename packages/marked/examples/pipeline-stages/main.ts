// Marked's pipeline one stage at a time: lexer, walkTokens, renderer
import { Marked, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage, STOPPED } from '../../shared/stage.ts';
import { docPane, htmlPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { button } from '../../shared/controls.ts';
import { tokenTree } from '../../shared/token-tree.ts';

const NOTE = `# Trip notes

Pack **light** :)

- Passport
- Charger`;

const CARD_NOTE = '# Trip\n\nPack **light** :)\n\n- Passport';

const STAGES = ['1 Source', '2 Lexer', '3 walkTokens', '4 Renderer', '5 HTML', '6 Page'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the note, then click a stage or press Play' });

  // The instance holds the two edits the pipeline applies: a walkTokens step and a renderer.
  const changes: string[] = [];
  const edit = (token: Token): void => {
    if (token.type === 'heading' && token.depth < 6) {
      changes.push(`heading "${token.text}": depth ${token.depth} -> ${token.depth + 1}`);
      token.depth++;
    }
    if (token.type === 'text' && 'text' in token && token.text.includes(':)')) {
      changes.push(`text "${token.text.trim()}": :) -> a smiley`);
      token.text = token.text.replace(':)', '🙂');
    }
  };
  const m = new Marked({
    renderer: {
      strong({ tokens }) {
        return `<mark>${this.parser.parseInline(tokens)}</mark>`;
      },
    },
  });

  const src = sourcePane(stage, stage.preview ? CARD_NOTE : NOTE);
  const views = [
    textPane(stage, '1 Source: one string'),
    tokenTree(stage, '2 Lexer: tokens'),
    textPane(stage, '3 walkTokens: edits'),
    textPane(stage, '4 Renderer: HTML per block'),
    htmlPane(stage, '5 Parser: joined HTML'),
    docPane(stage, '6 Page: sanitized and shown'),
  ];
  const viewport = document.createElement('div');
  viewport.className = 'mk-row';
  viewport.style.gridTemplateColumns = '1fr';
  for (const v of views) {
    v.el.style.display = 'none';
    viewport.append(v.el);
  }

  const strip = document.createElement('div');
  strip.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;justify-content:center;font-size:' + (stage.preview ? '9px' : '12px');
  const chips = STAGES.map((name, i) => {
    const c = document.createElement(stage.preview ? 'span' : 'button');
    c.textContent = name;
    if (!stage.preview) (c as HTMLButtonElement).type = 'button';
    c.style.cssText = `padding:${stage.preview ? '0 5px' : '2px 10px'};border:1px solid var(--border);border-radius:99px;background:transparent;color:var(--fg-2);font:inherit;cursor:pointer`;
    stage.listen(c, 'click', () => show(i));
    strip.append(c);
    return c;
  });

  const show = (i: number): void => {
    chips.forEach((c, k) => {
      c.style.background = k === i ? 'var(--accent)' : 'transparent';
      c.style.color = k === i ? 'var(--bg)' : 'var(--fg-2)';
    });
    views.forEach((v, k) => (v.el.style.display = k === i ? '' : 'none'));
  };

  /** Runs every stage on the current text and fills each view. */
  const run = (): void => {
    const text = src.value();
    (views[0] as ReturnType<typeof textPane>).show(`${JSON.stringify(text).slice(1, -1).replace(/\\n/g, '⏎')}`);
    const tokens = m.lexer(text); // stage 2: text in, token tree out
    (views[1] as ReturnType<typeof tokenTree>).show(tokens);
    changes.length = 0;
    m.walkTokens(tokens, edit); // stage 3: every token is visited and may be changed
    (views[2] as ReturnType<typeof textPane>).show(changes.length ? changes.join('\n') : 'nothing to change');
    const perBlock = tokens
      .filter((t) => t.type !== 'space')
      .map((t) => `${t.type.padEnd(9)} -> ${m.parser([t]).replace(/\n/g, ' ').trim()}`); // stage 4
    (views[3] as ReturnType<typeof textPane>).show(perBlock.join('\n'));
    const html = m.parser(tokens); // stage 5: every block's HTML, joined
    (views[4] as ReturnType<typeof htmlPane>).show(html);
    (views[5] as ReturnType<typeof docPane>).show(html); // stage 6
  };

  if (stage.preview) {
    stage.root.append(strip, viewport);
    run();
    stage.play(async (wait) => {
      for (let i = 0; i < STAGES.length; i++) {
        show(i);
        await wait(1500);
      }
    });
  } else {
    row(stage.root, src.el, viewport);
    stage.root.append(strip);
    let playing = 0;
    button(stage.bar!, 'Play', () => {
      const mine = ++playing;
      void (async () => {
        for (let i = 0; i < STAGES.length && mine === playing; i++) {
          show(i);
          await stage.wait(1400);
        }
      })().catch((err: unknown) => {
        if (err !== STOPPED) throw err;
      });
    });
    note(stage.root, 'Stage 3 changes the heading depth and the smiley before any HTML exists; stage 4 shows what the renderer made of each block, and the bold becomes a highlighter there.');
    src.onInput(run);
    run();
    show(1);
  }
  return () => stage.dispose();
};

export default mount;
