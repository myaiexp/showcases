// XY chart over a rolling window of readings: each tick shifts the data and re-renders
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

const WINDOW = 10;

// Shape of the generated definition: a categorical x-axis plus a bar and a line series.
export const SAMPLE = `xychart
    title "Requests per second"
    x-axis [t1, t2, t3]
    y-axis "req/s" 0 --> 200
    bar [80, 120, 95]
    line [80, 120, 95]`;

const definition = (labels: string[], data: number[]): string =>
  `xychart
    title "Requests per second"
    x-axis [${labels.join(', ')}]
    y-axis "req/s" 0 --> 200
    bar [${data.join(', ')}]
    line [${data.join(', ')}]`;

const mount: Mount = (el, { preview, signal }) => {
  let tickNo = WINDOW;
  const labels = Array.from({ length: WINDOW }, (_, i) => `t${i + 1}`);
  const data = Array.from({ length: WINDOW }, (_, i) => 100 + Math.round(60 * Math.sin(i / 1.5)));
  const box = diagramBox(el, preview);
  const report = preview ? () => undefined : statusLine(el);
  let timer = 0;
  let period = preview ? 900 : 800;
  let busy = false;
  let paused = false;

  const draw = async (): Promise<void> => {
    if (busy) return;
    busy = true;
    try {
      const staging = document.createElement('div');
      await renderInto(staging, definition(labels, data), signal);
      if (!signal.aborted) {
        box.replaceChildren(...staging.childNodes);
        report(`Rendered as xychart, window of ${WINDOW} readings`);
      }
    } catch (err) {
      if (!signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    } finally {
      busy = false;
    }
  };

  const tick = (): void => {
    tickNo++;
    labels.push(`t${tickNo}`);
    labels.shift();
    const last = data[data.length - 1]!;
    data.push(Math.round(Math.min(190, Math.max(10, 0.6 * last + 0.4 * 100 + (Math.random() - 0.5) * 120))));
    data.shift();
    void draw();
  };
  const schedule = (): void => {
    clearInterval(timer);
    if (!paused) timer = window.setInterval(tick, period);
  };
  schedule();
  void draw();

  const cleanups: Array<() => void> = [];
  if (!preview) {
    const row = document.createElement('div');
    row.className = 'mm-row';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mm-tab';
    toggle.textContent = 'Pause';
    const speed = document.createElement('input');
    speed.type = 'range';
    speed.min = '300';
    speed.max = '2000';
    speed.step = '100';
    speed.value = String(period);
    speed.setAttribute('aria-label', 'Milliseconds per reading');
    const caption = document.createElement('span');
    caption.textContent = `${period} ms per reading`;
    const onToggle = (): void => {
      paused = !paused;
      toggle.textContent = paused ? 'Resume' : 'Pause';
      schedule();
    };
    const onSpeed = (): void => {
      period = Number(speed.value);
      caption.textContent = `${period} ms per reading`;
      schedule();
    };
    toggle.addEventListener('click', onToggle);
    speed.addEventListener('input', onSpeed);
    cleanups.push(() => toggle.removeEventListener('click', onToggle), () => speed.removeEventListener('input', onSpeed));
    row.append(toggle, speed, caption);
    el.insertBefore(row, box);
  }

  return () => {
    clearInterval(timer);
    for (const off of cleanups) off();
  };
};

export default mount;
