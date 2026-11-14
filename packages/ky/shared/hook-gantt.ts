// A time axis of hook work next to the requests it waits for or runs between
import { panel } from './panels.ts';
import type { Server } from './server.ts';
import type { HookLane } from './hook-lane.ts';

export interface HookGantt {
  el: HTMLElement;
  /** Clears the bars; the next hook or request starts the clock. */
  reset(): void;
}

/** One row for hooks, one for requests. `signal` is the stage's. */
export function hookGantt(parent: HTMLElement, lane: HookLane, server: Server, signal: AbortSignal, span = 3000): HookGantt {
  const p = panel(parent, 'Hooks and requests over time');
  p.body.classList.add('hook-gantt');
  const rows = (['hooks', 'requests'] as const).map((name) => {
    const row = document.createElement('div');
    row.className = 'hook-gantt-row';
    const tag = document.createElement('span');
    tag.textContent = name;
    row.append(tag);
    p.body.append(row);
    return row;
  });
  const axis = document.createElement('div');
  axis.className = 'ky-axis';
  const step = span <= 2000 ? 500 : 1000;
  for (let t = 0; t <= span; t += step) {
    const tick = document.createElement('span');
    tick.style.left = `${(t / span) * 100}%`;
    tick.textContent = t === 0 ? '0' : `${t / 1000}s`;
    axis.append(tick);
  }
  p.body.append(axis);

  let t0: number | null = null;
  const pct = (ms: number): string => `${Math.min(100, (ms / span) * 100)}%`;
  const bar = (row: HTMLElement, at: number, text: string, tone: string): HTMLElement => {
    const b = document.createElement('div');
    b.className = 'hook-bar';
    b.dataset['tone'] = tone;
    b.style.left = pct(at);
    b.textContent = text;
    row.append(b);
    return b;
  };
  const grow = (b: HTMLElement, from: number, until: Promise<unknown>): void => {
    let live = true;
    const width = (): void => {
      if (t0 !== null) b.style.width = `calc(${pct(performance.now() - t0)} - ${pct(from)})`;
    };
    const tick = (): void => {
      if (!live || signal.aborted || !b.isConnected) return;
      width();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    void until.then(() => {
      live = false;
      width();
    });
  };

  lane.onCall((c) => {
    t0 ??= c.start;
    const at = c.start - t0;
    grow(bar(rows[0]!, at, c.label, 'info'), at, c.done);
  });
  const open = new Map<number, { b: HTMLElement; at: number }>();
  const off = server.on((e) => {
    if (e.kind === 'send') {
      t0 ??= performance.now();
      const at = performance.now() - t0;
      const b = bar(rows[1]!, at, e.req.method, 'req');
      open.set(e.req.id, { b, at });
      grow(b, at, new Promise((resolve) => {
        const stop = server.on((ev) => {
          if (ev.req.id === e.req.id && (ev.kind === 'reply' || ev.kind === 'drop' || ev.kind === 'abort')) {
            stop();
            setTimeout(resolve, ev.kind === 'reply' ? server.latency : 0);
          }
        });
      }));
    } else if (e.kind === 'reply') {
      const o = open.get(e.req.id);
      if (o) o.b.dataset['tone'] = e.status < 300 ? 'ok' : e.status < 500 ? 'warn' : 'bad';
    }
  });
  signal.addEventListener('abort', off, { once: true });

  return {
    el: p.el,
    reset() {
      for (const r of rows) for (const b of r.querySelectorAll('.hook-bar')) b.remove();
      open.clear();
      t0 = null;
    },
  };
}
