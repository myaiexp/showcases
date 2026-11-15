// Compile kit: time a parse loop in small chunks and draw two timing bars
import './compile-race.css';
import type { Stage } from './stage.ts';

/**
 * Times `count` calls of `run`, in chunks so the page is never blocked long between pauses
 * (a card passes one chunk). Only the chunks are timed, not the pauses.
 */
export async function timeCalls(stage: Stage, run: () => unknown, count: number, chunk = 500): Promise<number> {
  for (let i = 0; i < 400; i++) run(); // warm-up, untimed: the first calls are always slow
  let total = 0;
  for (let done = 0; done < count; done += chunk) {
    const n = Math.min(chunk, count - done);
    const t0 = performance.now();
    for (let i = 0; i < n; i++) run();
    total += performance.now() - t0;
    if (done + chunk < count) await stage.wait(0);
  }
  return total;
}

export interface RaceBars {
  /** Draws both bars (lengths relative to the slower) and the one-line verdict. */
  show(ms: readonly [number, number], verdict: string, tone?: 'ok' | 'info'): void;
  /** Empties the bars and says `text`. */
  reset(text: string): void;
}

/** Two bars, the first the standard way and the second the faster candidate. */
export function raceBars(parent: HTMLElement, labels: readonly [string, string]): RaceBars {
  const box = document.createElement('div');
  box.className = 'cr';
  const rows = labels.map((label, i) => {
    const row = document.createElement('div');
    row.className = 'cr-row';
    const name = document.createElement('span');
    name.className = 'cr-label';
    name.textContent = label;
    name.title = label;
    const track = document.createElement('div');
    track.className = 'cr-track';
    const bar = document.createElement('div');
    bar.className = 'cr-bar';
    track.append(bar);
    const ms = document.createElement('span');
    ms.className = 'cr-ms';
    if (i === 1) row.dataset['fast'] = '';
    row.append(name, track, ms);
    box.append(row);
    return { bar, ms };
  });
  const verdict = document.createElement('div');
  verdict.className = 'cr-verdict';
  box.append(verdict);
  parent.append(box);
  return {
    show(ms, text, tone = 'info') {
      const max = Math.max(ms[0], ms[1], 0.001);
      rows.forEach((r, i) => {
        const width = `${Math.max(2, (ms[i]! / max) * 100)}%`;
        r.bar.animate([{ width: r.bar.style.width || '0%' }, { width }], { duration: 400, fill: 'forwards', easing: 'ease-out' });
        r.bar.style.width = width;
        r.ms.textContent = `${ms[i]! < 10 ? ms[i]!.toFixed(1) : Math.round(ms[i]!)} ms`;
      });
      verdict.textContent = text;
      verdict.dataset['tone'] = tone;
    },
    reset(text) {
      rows.forEach((r) => {
        r.bar.style.width = '0%';
        r.bar.getAnimations().forEach((a) => a.cancel());
        r.ms.textContent = '';
      });
      verdict.textContent = text;
      verdict.dataset['tone'] = 'info';
    },
  };
}

/** "8.4x less time" style words for two timings, without claiming more than was measured. */
export function ratioText(slow: number, fast: number): string {
  if (slow <= 0) return 'too quick to tell';
  // The clock ticks in 0.1 ms steps: a fast side under one tick is only known as "at least".
  if (fast < 0.1) return `at least ${Math.floor(slow / 0.1)}x faster`;
  const r = slow / fast;
  if (r >= 1.15) return `${r < 10 ? r.toFixed(1) : Math.round(r)}x faster`;
  if (r <= 0.87) return `${(1 / r).toFixed(1)}x slower`;
  return 'about the same speed';
}
