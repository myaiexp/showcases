// Flip gfm, breaks and pedantic and watch the page re-render
import { Marked, marked as globalMarked, type MarkedOptions } from 'marked';
import DOMPurify from 'dompurify';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, putHtml, row, sourcePane } from '../../shared/panes.ts';
import { checkbox } from '../../shared/controls.ts';

const SAMPLE = `#Camping list
Tent
Stove

| Item | Qty |
|---|---|
| Socks | 3 |

- [x] Torch
~~Radio~~ https://example.com/map`;

const CARD_SAMPLE = '#Camping\nTent\nStove\n\n- [x] Torch\n~~Radio~~';

type Flag = 'gfm' | 'breaks' | 'pedantic';
const FLAGS: Flag[] = ['gfm', 'breaks', 'pedantic'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch an option on or off' });
  const src = sourcePane(stage, stage.preview ? CARD_SAMPLE : SAMPLE);
  const doc = docPane(stage);
  row(stage.root, src.el, doc.el);

  const state: Record<Flag, boolean> = { gfm: true, breaks: false, pedantic: false };
  const chips = document.createElement('div');
  chips.style.cssText = 'display:flex;gap:6px;font:10px ui-monospace,monospace';
  const table = document.createElement('div');
  table.className = 'mk-doc';
  table.style.minHeight = '0';

  const draw = (): void => {
    // A fresh instance per change, so options never accumulate.
    const m = new Marked({ ...state });
    doc.show(m.parse(src.value(), { async: false }));
    chips.replaceChildren(
      ...FLAGS.map((f) => {
        const c = document.createElement('span');
        c.textContent = `${f} ${state[f] ? '✓' : '✗'}`;
        c.style.cssText = `padding:1px 6px;border-radius:99px;border:1px solid var(--border);color:${state[f] ? 'var(--fg-1)' : 'var(--fg-3)'}`;
        return c;
      }),
    );
    if (!stage.preview) drawTable(m.defaults);
  };

  /** The defaults come from marked.getDefaults(); the last column is what this instance uses now. */
  const drawTable = (current: MarkedOptions): void => {
    const defaults = globalMarked.getDefaults() as Record<string, unknown>;
    const now = current as Record<string, unknown>;
    const show = (v: unknown): string => (v === null ? 'null' : typeof v === 'object' ? 'object' : String(v));
    const rows = Object.keys(defaults)
      .sort()
      .map((k) => {
        const changed = show(defaults[k]) !== show(now[k]);
        return `<tr><td><code>${k}</code></td><td>${show(defaults[k])}</td><td${changed ? ' style="color:var(--accent-text);font-weight:600"' : ''}>${show(now[k])}</td></tr>`;
      })
      .join('');
    putHtml(table, DOMPurify.sanitize(`<table><thead><tr><th>option</th><th>default</th><th>in use now</th></tr></thead><tbody>${rows}</tbody></table>`));
  };

  if (stage.preview) {
    stage.root.insertBefore(chips, stage.root.firstChild);
    let i = 0;
    const steps: Partial<Record<Flag, boolean>>[] = [{}, { gfm: false }, { breaks: true }, { pedantic: true }];
    stage.play(async (wait) => {
      Object.assign(state, { gfm: true, breaks: false, pedantic: false }, steps[i % steps.length]);
      i++;
      draw();
      await wait(1900);
    });
  } else {
    src.onInput(draw);
    for (const f of FLAGS) {
      checkbox(stage.bar!, f, state[f], (v) => {
        state[f] = v;
        draw();
      });
    }
    stage.root.append(table);
    note(stage.root, 'The last column highlights options that differ from marked.getDefaults(). Pedantic overrides gfm, so with pedantic on the tables and task lists stop working whatever gfm says.');
    draw();
  }
  return () => stage.dispose();
};

export default mount;
