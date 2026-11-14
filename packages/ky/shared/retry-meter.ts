// A body meter: bytes of an answer received so far, with the size limit
import { panel } from './panels.ts';
import type { Server } from './server.ts';
import './retry.css';

export interface Meter {
  el: HTMLElement;
  /** Empties the bar and shows `text`. */
  reset(text?: string): void;
  /** Moves the red limit line (a fraction of the whole body, 0 to 1), or hides it with null. */
  limit(fraction: number | null): void;
  /** Replaces the line of text under the bar. */
  say(text: string): void;
}

/** Fills as the server streams pieces of the answer; stops listening when `signal` fires. */
export function bodyMeter(parent: HTMLElement, server: Server, signal: AbortSignal, title: string, unit: (n: number) => string): Meter {
  const p = panel(parent, title);
  const bar = document.createElement('div');
  bar.className = 'retry-meter';
  bar.dataset['tone'] = 'info';
  const fill = document.createElement('div');
  fill.className = 'retry-fill';
  const line = document.createElement('div');
  line.className = 'retry-limit';
  line.hidden = true;
  bar.append(fill, line);
  const text = document.createElement('div');
  text.className = 'retry-meter-text';
  p.body.append(bar, text);

  const off = server.on((e) => {
    if (e.kind !== 'piece') return;
    fill.style.width = `${(e.sent / e.total) * 100}%`;
    text.textContent = `${unit(e.sent)} of ${unit(e.total)} received`;
  });
  signal.addEventListener('abort', off, { once: true });

  return {
    el: p.el,
    reset(t = 'nothing yet') {
      fill.style.width = '0';
      text.textContent = t;
    },
    limit(f) {
      line.hidden = f === null;
      if (f !== null) line.style.left = `${f * 100}%`;
    },
    say(t) {
      text.textContent = t;
    },
  };
}
