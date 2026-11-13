// Tick a box to collapse a subgraph into one node with `id@{ view: collapsed }`; the diagram redraws
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

// Two groups in a pipeline. Subgraph ids (build, ship) carry the titles in brackets.
const BASE = `flowchart TD
    Commit --> build
    subgraph build [Build stage]
        Compile --> Test
        Test --> Package
    end
    build --> ship
    subgraph ship [Ship stage]
        Stage --> Approve
        Approve --> Release
    end
    ship --> Done`;

// Metadata lines appended to the definition (docs: attach view: collapsed to the subgraph id).
const GROUPS = [
  { id: 'build', label: 'Collapse "Build stage"', meta: '\n    build@{ view: collapsed }' },
  { id: 'ship', label: 'Collapse "Ship stage"', meta: '\n    ship@{ view: collapsed }' },
] as const;

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = preview ? () => {} : statusLine(el);
  const collapsed = new Set<string>();
  let ticket = 0;
  let timer = 0;

  const draw = async (): Promise<void> => {
    const mine = ++ticket;
    const code = GROUPS.reduce((acc, g) => (collapsed.has(g.id) ? acc + g.meta : acc), BASE);
    const staging = document.createElement('div');
    try {
      await renderInto(staging, code, signal);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report(collapsed.size ? `Collapsed: ${[...collapsed].join(', ')}` : 'Both subgraphs expanded');
    } catch (err) {
      if (mine === ticket && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    // Cycle through the four combinations without input.
    let i = 0;
    const next = (): void => {
      collapsed.clear();
      if (i % 4 === 1 || i % 4 === 3) collapsed.add('build');
      if (i % 4 === 2 || i % 4 === 3) collapsed.add('ship');
      void draw();
      i++;
      timer = window.setTimeout(next, 2200);
    };
    next();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const bar = document.createElement('div');
  bar.className = 'mm-tabs';
  const undo: Array<() => void> = [];
  for (const g of GROUPS) {
    const wrap = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    const onChange = (): void => {
      if (cb.checked) collapsed.add(g.id);
      else collapsed.delete(g.id);
      void draw();
    };
    cb.addEventListener('change', onChange);
    undo.push(() => cb.removeEventListener('change', onChange));
    wrap.append(cb, ` ${g.label}`);
    bar.append(wrap);
  }
  el.insertBefore(bar, box);
  void draw();
  return () => {
    ticket++;
    for (const u of undo) u();
  };
};

export default mount;
