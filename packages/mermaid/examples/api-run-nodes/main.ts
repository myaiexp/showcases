// pre blocks filled with textContent and drawn by one mermaid.run({ nodes }) call, scoped to this example
import type { Mount } from '@/types.ts';
import { mermaid } from '../../shared/setup.ts';
import { statusLine } from '../../shared/playground.ts';
import './style.css';

// Two sets of sources; "Reset and run again" swaps between them, and the card does it on a timer.
const SETS: string[][] = [
  [
    `flowchart LR
    Order --> Pack --> Ship`,
    `pie title Returns
    "Damaged" : 12
    "Wrong size" : 31
    "Changed mind" : 57`,
    `stateDiagram-v2
    [*] --> Open
    Open --> Closed
    Closed --> [*]`,
  ],
  [
    `flowchart TD
    Cart --> Pay{Paid?}
    Pay -->|yes| Ship
    Pay -->|no| Cart`,
    `pie title Channels
    "Web" : 64
    "Store" : 22
    "Phone" : 14`,
    `sequenceDiagram
    Shop->>Bank: Charge
    Bank-->>Shop: Approved`,
  ],
];

const mount: Mount = (el, { preview, signal }) => {
  const count = preview ? 2 : 3;
  const grid = document.createElement('div');
  grid.className = preview ? 'run-grid card' : 'run-grid';
  // The class below is unique to this example, so run() can never reach another .mermaid element.
  const blocks = Array.from({ length: count }, () => {
    const pre = document.createElement('pre');
    pre.className = 'mermaid run-nodes-block';
    grid.append(pre);
    return pre;
  });
  let report: (text: string, error?: boolean) => void = () => undefined;
  let set = 0;
  let busy = false;
  let timer = 0;

  const draw = async (): Promise<void> => {
    if (busy || signal.aborted) return;
    busy = true;
    // run() marks a node data-processed and replaces its text with the SVG, so a fresh run
    // needs the source written back first, as text and never as markup.
    blocks.forEach((pre, i) => {
      pre.removeAttribute('data-processed');
      pre.textContent = SETS[set % SETS.length]![i]!;
    });
    try {
      await mermaid.run({ nodes: blocks });
      report(`mermaid.run rendered ${blocks.length} nodes: ${blocks.filter((b) => b.querySelector('svg')).length} now hold an SVG`);
    } catch (err) {
      report(err instanceof Error ? err.message : String(err), true);
    }
    busy = false;
  };

  if (preview) {
    el.append(grid);
    const tick = (): void => {
      void draw();
      set++;
      timer = window.setTimeout(tick, 3200);
    };
    tick();
  } else {
    const actions = document.createElement('div');
    actions.className = 'run-actions';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mm-tab';
    button.textContent = 'Reset and run again with the other set';
    const onClick = (): void => {
      set++;
      void draw();
    };
    button.addEventListener('click', onClick);
    actions.append(button);
    el.append(actions, grid);
    report = statusLine(el);
    void draw();
    return () => button.removeEventListener('click', onClick);
  }
  return () => clearTimeout(timer);
};

export default mount;
