// Gantt click lines: href links and call callbacks with arguments; securityLevel loose raised and restored
import type { Mount } from '@/types.ts';
import { playground, statusLine } from '../../shared/playground.ts';
import { BASE_CONFIG, mermaid } from '../../shared/setup.ts';

// The docs' clickable example: one task links out, two call page functions, with and without arguments.
// click taskId call fn(args) passes the arguments; with no arguments the function gets the task id.
const CLICKABLE = `gantt
    dateFormat YYYY-MM-DD

    section Clickable
    Visit mermaid docs      :active, cl1, 2014-01-07, 3d
    Print arguments         :cl2, after cl1, 3d
    Print task              :cl3, after cl2, 3d

    click cl1 href "https://mermaid.js.org/"
    click cl2 call printArguments("test1", "test2", test3)
    click cl3 call printTask()`;

// Only href lines: every task is a link.
const LINKS = `gantt
    dateFormat YYYY-MM-DD
    axisFormat %d %b
    section Reading
    Intro       :r1, 2025-03-03, 3d
    Syntax      :r2, after r1, 4d
    Config      :r3, after r2, 3d

    click r1 href "https://mermaid.js.org/intro/"
    click r2 href "https://mermaid.js.org/syntax/gantt.html"
    click r3 href "https://mermaid.js.org/config/usage.html"`;

const VARIANTS = [
  { label: 'href and call', code: CLICKABLE },
  { label: 'Links only', code: LINKS },
];

// A card has no pointer, so it gets the charts without click lines.
const stripped = (code: string): string =>
  code.split('\n').filter((l) => !l.trim().startsWith('click')).join('\n');

type Win = Window & {
  printArguments?: (a: string, b: string, c: string) => void;
  printTask?: (taskId: string) => void;
};

const mount: Mount = (el, ctx) => {
  if (ctx.preview) {
    return playground(el, ctx, { variants: VARIANTS.map((v) => ({ ...v, code: stripped(v.code) })) });
  }
  // Disabled at the default 'strict' level (gantt.md § Interaction): raise it for this page only.
  mermaid.initialize({ ...BASE_CONFIG, securityLevel: 'loose' });
  const win = window as Win;
  const stop = playground(el, ctx, { variants: VARIANTS });
  const readout = statusLine(el);
  readout('Click a task bar: a link opens in the current tab, a call shows its arguments here.');
  // Callbacks are looked up on window by name, as in the docs' example.
  win.printArguments = (a, b, c): void => readout(`printArguments called with: ${a}, ${b}, ${c}`);
  win.printTask = (taskId): void => readout(`printTask called with taskId: ${taskId}`);
  return () => {
    stop();
    delete win.printArguments;
    delete win.printTask;
    mermaid.initialize(BASE_CONFIG);
  };
};

export default mount;
