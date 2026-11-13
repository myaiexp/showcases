// Quadrant chart whose points drift on a timer; the full view adds pause and step buttons
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

interface Point {
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// Shape of the generated definition: one `Name: [x, y]` line per point, x and y in 0..1.
export const SAMPLE = `quadrantChart
    title Service health
    x-axis Low traffic --> High traffic
    y-axis Slow --> Fast
    quadrant-1 Scale out
    quadrant-2 Healthy
    quadrant-3 Idle
    quadrant-4 Overloaded
    Checkout: [0.7, 0.6]`;

const start = (): Point[] => [
  { name: 'Checkout', x: 0.7, y: 0.6, vx: -0.05, vy: 0.04 },
  { name: 'Search', x: 0.4, y: 0.8, vx: 0.06, vy: -0.03 },
  { name: 'Billing', x: 0.2, y: 0.3, vx: 0.04, vy: 0.05 },
  { name: 'Reports', x: 0.8, y: 0.2, vx: -0.06, vy: 0.03 },
];

const definition = (pts: Point[]): string =>
  `quadrantChart
    title Service health
    x-axis Low traffic --> High traffic
    y-axis Slow --> Fast
    quadrant-1 Scale out
    quadrant-2 Healthy
    quadrant-3 Idle
    quadrant-4 Overloaded
${pts.map((p) => `    ${p.name}: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}]`).join('\n')}`;

/** Moves each point along its velocity and bounces it off the 0..1 edges. */
function step(pts: Point[]): void {
  for (const p of pts) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0.04 || p.x > 0.96) p.vx = -p.vx;
    if (p.y < 0.04 || p.y > 0.96) p.vy = -p.vy;
    p.x = Math.min(0.96, Math.max(0.04, p.x));
    p.y = Math.min(0.96, Math.max(0.04, p.y));
  }
}

const mount: Mount = (el, { preview, signal }) => {
  const pts = start();
  const box = diagramBox(el, preview);
  const report = preview ? () => undefined : statusLine(el);
  let timer = 0;
  let running = true;
  let busy = false;

  const draw = async (): Promise<void> => {
    if (busy) return; // drop ticks that arrive while a render is still in flight
    busy = true;
    try {
      const staging = document.createElement('div');
      await renderInto(staging, definition(pts), signal);
      if (!signal.aborted) {
        box.replaceChildren(...staging.childNodes);
        report('Rendered as quadrantChart');
      }
    } catch (err) {
      if (!signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    } finally {
      busy = false;
    }
  };

  const tick = (): void => {
    step(pts);
    void draw();
  };
  const play = (): void => {
    timer = window.setInterval(tick, preview ? 900 : 700);
  };
  play();
  void draw();

  const listeners: Array<() => void> = [];
  if (!preview) {
    const row = document.createElement('div');
    row.className = 'mm-row';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mm-tab';
    toggle.textContent = 'Pause';
    const once = document.createElement('button');
    once.type = 'button';
    once.className = 'mm-tab';
    once.textContent = 'Step once';
    const onToggle = (): void => {
      running = !running;
      clearInterval(timer);
      if (running) play();
      toggle.textContent = running ? 'Pause' : 'Resume';
    };
    const onOnce = (): void => {
      if (running) onToggle();
      tick();
    };
    toggle.addEventListener('click', onToggle);
    once.addEventListener('click', onOnce);
    listeners.push(() => toggle.removeEventListener('click', onToggle), () => once.removeEventListener('click', onOnce));
    row.append(toggle, once);
    el.insertBefore(row, box);
  }

  return () => {
    clearInterval(timer);
    for (const off of listeners) off();
  };
};

export default mount;
