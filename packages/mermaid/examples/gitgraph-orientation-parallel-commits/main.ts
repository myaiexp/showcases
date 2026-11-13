// Git graph with a select for orientation (LR, TB, BT) and a toggle for parallelCommits
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

// One history; "gitGraph LR:" is swapped for the chosen orientation before rendering.
const HISTORY = `gitGraph LR:
  commit id: "init"
  branch develop
  commit id: "api"
  commit id: "ui"
  checkout main
  commit id: "docs"
  commit id: "ci"
  merge develop tag: "v1.0"
  commit id: "patch"`;

const ORIENTATIONS = ['LR', 'TB', 'BT'] as const;
type Orientation = (typeof ORIENTATIONS)[number];

/** Frontmatter sets gitGraph.parallelCommits; the header line carries the orientation. */
function diagram(o: Orientation, parallel: boolean): string {
  const config = ['---', 'config:', '  gitGraph:', `    parallelCommits: ${parallel}`, '---'].join('\n');
  return `${config}\n${HISTORY.replace('gitGraph LR:', `gitGraph ${o}:`)}`;
}

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  let report: ((t: string, e?: boolean) => void) | undefined;
  let ticket = 0;
  let timer = 0;

  const draw = async (o: Orientation, parallel: boolean): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, diagram(o, parallel), signal);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report?.(`gitGraph ${o}: with parallelCommits: ${parallel}`);
    } catch (err) {
      if (mine !== ticket || signal.aborted) return;
      if (!report) throw err;
      report(err instanceof Error ? err.message : String(err), true);
    }
  };

  let onChange: (() => void) | undefined;
  let controls: HTMLElement | undefined;

  if (preview) {
    // Walk through every orientation, then the parallel variant of each.
    const combos: [Orientation, boolean][] = [
      ['LR', false],
      ['TB', false],
      ['BT', false],
      ['LR', true],
    ];
    let i = 0;
    const step = async (): Promise<void> => {
      const [o, p] = combos[i % combos.length]!;
      i++;
      await draw(o, p).catch(() => undefined);
      if (signal.aborted) return;
      timer = window.setTimeout(() => void step(), 2500);
    };
    void step();
  } else {
    controls = document.createElement('div');
    controls.className = 'mm-row';
    const select = document.createElement('select');
    select.setAttribute('aria-label', 'Orientation');
    for (const o of ORIENTATIONS) select.append(new Option(`${o}:`, o));
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'gitgraph-parallel';
    const text = document.createElement('label');
    text.htmlFor = checkbox.id;
    text.textContent = 'parallelCommits';
    controls.append(select, checkbox, text);
    el.insertBefore(controls, box);
    report = statusLine(el);
    onChange = (): void => void draw(select.value as Orientation, checkbox.checked);
    select.addEventListener('change', onChange);
    checkbox.addEventListener('change', onChange);
    controls.addEventListener('change', onChange);
    void draw('LR', false);
  }

  return () => {
    ticket++;
    clearTimeout(timer);
    if (onChange && controls) controls.removeEventListener('change', onChange);
  };
};

export default mount;
