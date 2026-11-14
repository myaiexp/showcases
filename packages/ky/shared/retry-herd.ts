// A herd of clients on a time strip: one dot per request, stacked by moment
import { panel } from './panels.ts';
import type { Server } from './server.ts';
import './retry.css';

export interface Herd {
  el: HTMLElement;
  /** Clears the dots; the next request starts the clock. */
  reset(): void;
  /** The most requests that landed in one time slot so far. */
  peak(): number;
}

/** Dots are requests (grey in flight, green answered, red refused); `bucket` ms share a column. */
export function herdView(parent: HTMLElement, server: Server, signal: AbortSignal, span: number, bucket: number, title: string): Herd {
  const p = panel(parent, title);
  const stat = document.createElement('span');
  stat.className = 'retry-stat';
  p.title.append(stat);
  const strip = document.createElement('div');
  strip.className = 'retry-herd';
  const axis = document.createElement('div');
  axis.className = 'ky-axis';
  p.body.append(strip, axis);
  for (let t = 0; t <= span; t += span <= 3000 ? 500 : 1000) {
    const tick = document.createElement('span');
    tick.style.left = `${(t / span) * 100}%`;
    tick.textContent = t === 0 ? '0' : `${t / 1000}s`;
    axis.append(tick);
  }

  let t0: number | null = null;
  let peak = 0;
  const cols = new Map<number, HTMLElement>();
  const dots = new Map<number, HTMLElement>();
  const tone = (s: number): string => (s < 300 ? 'ok' : 'bad');

  const off = server.on((e) => {
    if (e.kind === 'send') {
      t0 ??= performance.now();
      const slot = Math.floor((performance.now() - t0) / bucket);
      let col = cols.get(slot);
      if (!col) {
        col = document.createElement('div');
        col.className = 'retry-col';
        col.style.left = `${(slot * bucket * 100) / span}%`;
        col.style.width = `${(bucket * 100) / span}%`;
        strip.append(col);
        cols.set(slot, col);
      }
      const dot = document.createElement('div');
      dot.className = 'retry-dot';
      dot.dataset['tone'] = 'req';
      col.append(dot);
      dots.set(e.req.id, dot);
      peak = Math.max(peak, col.childElementCount);
      stat.textContent = `busiest moment: ${peak} at once`;
    } else if (e.kind === 'reply') {
      const d = dots.get(e.req.id);
      if (d) d.dataset['tone'] = tone(e.status);
    }
  });
  signal.addEventListener('abort', off, { once: true });

  return {
    el: p.el,
    reset() {
      strip.replaceChildren();
      cols.clear();
      dots.clear();
      t0 = null;
      peak = 0;
      stat.textContent = '';
    },
    peak: () => peak,
  };
}
