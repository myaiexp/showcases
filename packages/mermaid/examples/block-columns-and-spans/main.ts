// Block diagram whose column count changes: blocks rewrap, spans and a nested group adapt
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

// A platform overview in three columns: "wide:2" spans two, "block:group:2" nests its own columns.
const SAMPLE = `block
  columns 3
  gateway["Gateway"] wide["Edge cache (spans 2)"]:2
  block:group:2
    columns 2
    auth["Auth"] users["Users"] billing["Billing"] search["Search"]
  end
  queue["Queue"]
  db[("Database")]:3`;

const MIN = 2;
const MAX = 5;

/** The same blocks laid out in `n` columns (the span and nested group stay put). */
function diagram(n: number): string {
  return SAMPLE.replace('columns 3', `columns ${n}`);
}

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  let report: ((t: string, e?: boolean) => void) | undefined;
  let slider: HTMLInputElement | undefined;
  let label: HTMLElement | undefined;
  let ticket = 0;
  let timer = 0;

  const draw = async (n: number): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, diagram(n), signal);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report?.(`columns ${n}`);
    } catch (err) {
      if (mine !== ticket || signal.aborted) return;
      if (!report) throw err;
      report(err instanceof Error ? err.message : String(err), true);
    }
  };

  const onInput = (): void => {
    if (!slider || !label) return;
    label.textContent = `columns ${slider.value}`;
    void draw(Number(slider.value));
  };

  if (preview) {
    // No controls in a card: step through the column counts, waiting for each render.
    let n = 3;
    const step = async (): Promise<void> => {
      await draw(n).catch(() => undefined);
      if (signal.aborted) return;
      n = n >= MAX ? MIN : n + 1;
      timer = window.setTimeout(() => void step(), 2200);
    };
    void step();
  } else {
    const row = document.createElement('div');
    row.className = 'mm-row';
    label = document.createElement('span');
    label.textContent = 'columns 3';
    slider = document.createElement('input');
    slider.type = 'range';
    slider.min = String(MIN);
    slider.max = String(MAX);
    slider.value = '3';
    slider.setAttribute('aria-label', 'Number of columns');
    row.append(slider, label);
    el.insertBefore(row, box);
    report = statusLine(el);
    slider.addEventListener('input', onInput);
    void draw(3);
  }

  return () => {
    ticket++;
    clearTimeout(timer);
    slider?.removeEventListener('input', onInput);
  };
};

export default mount;
