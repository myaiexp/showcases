// mermaid.run({ querySelector, suppressErrors, postRenderCallback }) on blocks of this example only, one broken on demand
import type { Mount } from '@/types.ts';
import { mermaid } from '../../shared/setup.ts';
import { statusLine } from '../../shared/playground.ts';
import './style.css';

const GOOD = [
  `flowchart LR
    Draft --> Review --> Publish`,
  `pie title Reviews
    "Approved" : 70
    "Changes" : 30`,
  `stateDiagram-v2
    [*] --> Open
    Open --> Done`,
];

// Not valid Mermaid: a deliberate typo in the keyword, so run() cannot draw it.
const BROKEN = `flowchar LR
    A --> B`;

// run() rejects with Mermaid's parse error, which may be a plain object rather than an Error.
const firstLine = (err: unknown): string => {
  const o = err as { message?: string; str?: string } | null;
  const text = typeof err === 'string' ? err : (o?.message ?? o?.str ?? String(err));
  return text.split('\n')[0]!;
};

const mount: Mount = (el, { preview, signal }) => {
  const grid = document.createElement('div');
  grid.className = preview ? 'rq-grid rq-card' : 'rq-grid';
  // rq-block exists only in this example, and the selector below also starts at the
  // example's own rq-scope wrapper, so run() can never reach another page's .mermaid elements.
  grid.classList.add('rq-scope');
  const blocks = GOOD.map(() => {
    const pre = document.createElement('pre');
    pre.className = 'mermaid rq-block';
    grid.append(pre);
    return pre;
  });
  const SELECTOR = '.rq-scope .rq-block';
  let report: (text: string, error?: boolean) => void = () => undefined;
  let busy = false;
  let timer = 0;
  let round = 0;

  // run() marks a node data-processed and swaps its text for the SVG, so each run first
  // writes the source back as text (never markup) and clears the mark.
  const fill = (broken: boolean): void => {
    blocks.forEach((pre, i) => {
      pre.removeAttribute('data-processed');
      pre.textContent = broken && i === 1 ? BROKEN : GOOD[(i + round) % GOOD.length]!;
    });
  };

  const draw = async (broken: boolean, suppress: boolean): Promise<void> => {
    if (busy || signal.aborted) return;
    busy = true;
    fill(broken);
    const ids: string[] = [];
    try {
      await mermaid.run({
        querySelector: SELECTOR,
        suppressErrors: suppress,
        postRenderCallback: (id) => void ids.push(id),
      });
      report(
        `run({ suppressErrors: ${suppress} }) finished without throwing.\npostRenderCallback fired ${ids.length} time(s): ${ids.join(', ') || '-'}`,
      );
    } catch (err) {
      report(
        `run({ suppressErrors: ${suppress} }) threw: ${firstLine(err)}\npostRenderCallback fired ${ids.length} time(s): ${ids.join(', ') || '-'}`,
        true,
      );
    }
    busy = false;
  };

  el.append(grid);
  if (preview) {
    // A card has no buttons: rotate which diagram sits in which block and run() again.
    const cycle = (): void => {
      void draw(false, false);
      round++;
    };
    cycle();
    timer = window.setInterval(cycle, 3000);
  } else {
    const actions = document.createElement('div');
    actions.className = 'rq-actions';
    const add = (label: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mm-tab';
      b.textContent = label;
      b.addEventListener('click', fn);
      actions.append(b);
    };
    add('Run three valid blocks', () => void draw(false, false));
    add('Break block 2, run()', () => void draw(true, false));
    add('Break block 2, run with suppressErrors', () => void draw(true, true));
    el.insertBefore(actions, grid);
    report = statusLine(el);
    void draw(false, false);
  }
  return () => clearInterval(timer);
};

export default mount;
