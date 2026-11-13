// Kanban board whose tasks advance one column at a time on a timer; Restart replays the sprint
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

const COLUMNS = ['Backlog', 'In progress', 'Review', 'Done'];

interface Task {
  id: string;
  title: string;
  meta: string;
  stage: number;
}

const START: readonly Task[] = [
  { id: 't1', title: 'Design the login form', meta: "ticket: SH-101, assigned: 'ana', priority: 'High'", stage: 0 },
  { id: 't2', title: 'Write API tests', meta: "ticket: SH-102, assigned: 'ben', priority: 'Low'", stage: 0 },
  { id: 't3', title: 'Fix the checkout crash', meta: "ticket: SH-103, assigned: 'cy', priority: 'Very High'", stage: 0 },
  { id: 't4', title: 'Update the docs', meta: "assigned: 'dee', priority: 'Very Low'", stage: 0 },
];

// Which task moves on each tick (index into START); every task goes through all 3 moves.
const MOVES = [2, 0, 2, 1, 0, 3, 2, 1, 0, 3, 1, 3];

// What the generated definition looks like at one moment: columns are top-level lines,
// tasks are indented under them, and @{ } carries assigned, ticket and priority.
export const SAMPLE = `kanban
  c0[Backlog]
    t2[Write API tests]@{ ticket: SH-102, assigned: 'ben', priority: 'Low' }
  c1[In progress]
    t1[Design the login form]@{ ticket: SH-101, assigned: 'ana', priority: 'High' }
  c2[Review]
  c3[Done]
    t3[Fix the checkout crash]@{ ticket: SH-103, assigned: 'cy', priority: 'Very High' }`;

const definition = (tasks: readonly Task[]): string =>
  'kanban\n' +
  COLUMNS.map((name, c) => {
    const rows = tasks.filter((t) => t.stage === c).map((t) => `    ${t.id}[${t.title}]@{ ${t.meta} }`);
    return [`  c${c}[${name}]`, ...rows].join('\n');
  }).join('\n');

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = statusLine(el);
  let tasks = START.map((t) => ({ ...t }));
  let step = 0;
  let timer = 0;
  let busy = false;
  let stopped = false;

  const draw = async (): Promise<void> => {
    busy = true;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, definition(tasks), signal);
      if (stopped || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report(`Move ${step} of ${MOVES.length}`);
    } catch (err) {
      if (!stopped && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    } finally {
      busy = false;
    }
  };

  const restart = (): void => {
    tasks = START.map((t) => ({ ...t }));
    step = 0;
    void draw();
  };

  // Ticks are skipped while a render runs. After the last move the board rests one tick, then replays.
  const tick = (): void => {
    if (busy) return;
    if (step >= MOVES.length) {
      restart();
      return;
    }
    tasks[MOVES[step]!]!.stage++;
    step++;
    void draw();
  };

  if (!preview) {
    const row = document.createElement('div');
    row.className = 'mm-row';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mm-tab';
    button.textContent = 'Restart';
    button.addEventListener('click', restart);
    row.append(button);
    el.insertBefore(row, box);
  }

  void draw();
  timer = window.setInterval(tick, preview ? 1600 : 1800);
  return () => {
    stopped = true;
    clearInterval(timer);
  };
};

export default mount;
