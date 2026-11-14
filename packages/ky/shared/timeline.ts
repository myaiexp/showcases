// A time axis of attempts: one bar per request, gaps show how long Ky waited
import type { Server, ServerEvent } from './server.ts';
import { panel } from './panels.ts';

export interface TimelineOptions {
  /** Width of the axis in ms. Default 4000. */
  span?: number;
  title?: string;
}

export interface Timeline {
  el: HTMLElement;
  /** Clears the bars; the next request starts the clock. */
  reset(): void;
  /** A vertical marker at this moment, such as 'gave up'. */
  mark(text: string, tone?: 'ok' | 'bad' | 'warn' | 'info'): void;
  /** Milliseconds since the clock started (0 before the first request). */
  now(): number;
}

/** `signal` is the stage's: the timeline stops listening when it fires. */
export function timeline(parent: HTMLElement, server: Server, signal: AbortSignal, opts: TimelineOptions = {}): Timeline {
  const span = opts.span ?? 4000;
  const p = panel(parent, opts.title ?? 'Attempts over time');
  p.body.classList.add('ky-timeline');
  const track = document.createElement('div');
  track.className = 'ky-track';
  const axis = document.createElement('div');
  axis.className = 'ky-axis';
  p.body.append(track, axis);
  const step = span <= 2000 ? 500 : span <= 6000 ? 1000 : 2000;
  for (let t = 0; t <= span; t += step) {
    const tick = document.createElement('span');
    tick.style.left = `${(t / span) * 100}%`;
    tick.textContent = t === 0 ? '0' : `${t / 1000}s`;
    axis.append(tick);
  }

  let t0: number | null = null;
  let lastEnd: number | null = null;
  const bars = new Map<number, HTMLElement>();
  const pct = (ms: number): string => `${Math.min(100, (ms / span) * 100)}%`;
  const now = (): number => (t0 === null ? 0 : performance.now() - t0);

  const gap = (from: number, to: number): void => {
    if (to - from < 120) return;
    const g = document.createElement('div');
    g.className = 'ky-gap';
    g.style.left = pct(from);
    g.style.width = `calc(${pct(to)} - ${pct(from)})`;
    g.textContent = `${Math.round(to - from)} ms`;
    track.append(g);
  };
  const close = (id: number, text: string, tone: string): void => {
    const b = bars.get(id);
    if (!b) return;
    bars.delete(id);
    const end = now();
    b.style.width = `calc(${pct(end)} - ${b.style.left})`;
    b.dataset['tone'] = tone;
    b.textContent = text;
    b.title = `${text} at ${Math.round(end)} ms`;
    lastEnd = end;
  };
  let raf = 0;
  const grow = (): void => {
    for (const b of bars.values()) b.style.width = `calc(${pct(now())} - ${b.style.left})`;
    raf = bars.size ? requestAnimationFrame(grow) : 0;
  };

  const off = server.on((e: ServerEvent) => {
    if (e.kind === 'send') {
      if (t0 === null) t0 = performance.now();
      const start = now();
      if (lastEnd !== null && bars.size === 0) gap(lastEnd, start);
      const b = document.createElement('div');
      b.className = 'ky-attempt';
      b.dataset['tone'] = 'req';
      b.style.left = pct(start);
      b.textContent = '…';
      track.append(b);
      bars.set(e.req.id, b);
      if (!raf) raf = requestAnimationFrame(grow);
    } else if (e.kind === 'reply') {
      // The answer still has to travel back; close the bar when Ky gets it.
      const id = e.req.id;
      const tone = e.status < 300 ? 'ok' : e.status < 500 ? 'warn' : 'bad';
      setTimeout(() => close(id, String(e.status), tone), server.latency);
    } else if (e.kind === 'drop') {
      close(e.req.id, '✕', 'bad');
    } else if (e.kind === 'abort') {
      close(e.req.id, '✕', 'bad');
    }
  });

  signal.addEventListener(
    'abort',
    () => {
      off();
      cancelAnimationFrame(raf);
    },
    { once: true },
  );

  return {
    el: p.el,
    now,
    reset() {
      track.replaceChildren();
      bars.clear();
      t0 = null;
      lastEnd = null;
    },
    mark(text, tone = 'info') {
      const m = document.createElement('div');
      m.className = 'ky-mark';
      m.dataset['tone'] = tone;
      m.style.left = pct(now());
      m.textContent = text;
      track.append(m);
    },
  };
}
