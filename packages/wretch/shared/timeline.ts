// Requests on a time axis: a bar per request from send to answer, plus marks
import type { Server, ServerEvent } from './server.ts';
import './timeline.css';
import type { Stage } from './stage.ts';
import { statusTone, type Tone } from './wire.ts';

export interface TimelineOptions {
  parent?: HTMLElement;
  /** Milliseconds the axis shows at first; it stretches when time runs past. Default 3000. */
  span?: number;
  /** Text inside each bar. Default: "#id status". */
  label?: (id: number, method: string, path: string, status: string) => string;
}

export interface Timeline {
  el: HTMLElement;
  /** A vertical tick at the current time on the server's clock, such as "call 2" or "cache hit". */
  mark(text: string, tone?: Tone): void;
  /** Clears the bars and marks and restarts the server's clock (calls `server.reset()`). */
  reset(): void;
}

interface Bar {
  el: HTMLElement;
  start: number;
  end: number | null;
}

const div = (cls: string, text = ''): HTMLDivElement => {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
};

/** Draws the axis and follows `server` until the stage is disposed. */
export function timeline(stage: Stage, server: Server, opts: TimelineOptions = {}): Timeline {
  const baseSpan = opts.span ?? 3000;
  let span = baseSpan;
  const label = opts.label ?? ((id, _m, _p, status) => `#${id} ${status}`);
  const el = div('wr-timeline');
  const plot = div('wr-tl-plot');
  const axis = div('wr-tl-axis');
  const cursor = div('wr-tl-cursor');
  plot.append(cursor);
  el.append(plot, axis);
  (opts.parent ?? stage.root).append(el);

  const bars = new Map<number, Bar>();
  const marks: { el: HTMLElement; at: number }[] = [];
  let frame = 0;

  const pct = (ms: number): string => `${(ms / span) * 100}%`;

  const drawAxis = (): void => {
    const step = span <= 2000 ? 500 : span <= 6000 ? 1000 : span <= 15000 ? 2000 : 5000;
    axis.replaceChildren();
    for (let t = 0; t <= span; t += step) {
      const tick = div('wr-tl-tick', t === 0 ? '0' : `${t / 1000}s`);
      tick.style.left = pct(t);
      axis.append(tick);
    }
  };

  const layout = (): void => {
    const now = server.now();
    if (now > span * 0.95 && (frame || bars.size)) {
      span = Math.ceil((now * 1.25) / 1000) * 1000;
      drawAxis();
    }
    const n = Math.max(bars.size, 1);
    const rowH = 100 / Math.max(n, stage.preview ? 4 : 6);
    [...bars.values()].forEach((b, i) => {
      b.el.style.left = pct(b.start);
      b.el.style.width = `max(3px, ${pct((b.end ?? now) - b.start)})`;
      b.el.style.top = `${i * rowH}%`;
      b.el.style.height = `calc(${rowH}% - 2px)`;
    });
    for (const m of marks) m.el.style.left = pct(m.at);
    cursor.style.left = pct(Math.min(now, span));
  };

  const tick = (): void => {
    frame = 0;
    if (stage.disposed) return;
    layout();
    if ([...bars.values()].some((b) => b.end === null)) frame = requestAnimationFrame(tick);
  };
  const kick = (): void => {
    if (!frame && !stage.disposed) frame = requestAnimationFrame(tick);
  };

  const onEvent = (e: ServerEvent): void => {
    const { req } = e;
    if (e.type === 'request') {
      const b: Bar = { el: div('wr-tl-bar wr-dim', label(req.id, req.method, req.path, '…')), start: req.at, end: null };
      bars.set(req.id, b);
      plot.append(b.el);
    } else {
      const b = bars.get(req.id);
      if (!b) return;
      b.end = server.now();
      const status = e.type === 'response' ? String(e.status) : e.reason === 'network' ? 'lost' : 'aborted';
      const tone: Tone = e.type === 'response' ? statusTone(e.status) : e.reason === 'network' ? 'bad' : 'dim';
      b.el.className = `wr-tl-bar wr-${tone}`;
      b.el.textContent = label(req.id, req.method, req.path, status);
    }
    kick();
  };
  const off = server.on(onEvent);
  stage.onDispose(() => {
    off();
    cancelAnimationFrame(frame);
  });
  drawAxis();
  layout();

  return {
    el,
    mark(text, tone = 'info') {
      if (stage.disposed) return;
      const m = div(`wr-tl-mark wr-${tone}`, text);
      plot.append(m);
      marks.push({ el: m, at: server.now() });
      layout();
    },
    reset() {
      server.reset();
      bars.forEach((b) => b.el.remove());
      bars.clear();
      marks.splice(0).forEach((m) => m.el.remove());
      span = baseSpan;
      drawAxis();
      layout();
    },
  };
}
