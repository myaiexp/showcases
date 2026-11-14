// Two columns, "fetch" against "wretch": numbered steps and a counter for each
import { pane, grid, type Pane } from './pane.ts';
import type { Tone } from './wire.ts';

export interface Column extends Pane {
  /** Adds a numbered step and bumps the counter. */
  step(text: string, tone?: Tone): HTMLElement;
  /** Adds the closing line (the outcome), set apart from the steps. */
  done(text: string, tone?: Tone): HTMLElement;
  /** Where to put extra views (an envelope) under the steps. */
  extra: HTMLElement;
  /** Forgets the steps and the counter (extra views stay). */
  reset(): void;
}

function column(parent: HTMLElement, name: string, unit: string): Column {
  const p = pane(parent, name);
  const count = document.createElement('span');
  count.className = 'wr-count';
  p.head.append(count);
  const extra = document.createElement('div');
  p.el.append(extra);
  let n = 0;
  const show = (): void => {
    count.textContent = `${n} ${unit}${n === 1 ? '' : 's'}`;
  };
  show();
  return {
    ...p,
    extra,
    step(text, tone) {
      n += 1;
      show();
      return p.add(`${n}. ${text}`, tone);
    },
    done(text, tone) {
      const line = p.add(text, tone);
      line.classList.add('wr-done');
      return line;
    },
    reset() {
      n = 0;
      show();
      p.clear();
    },
  };
}

/** Left is plain fetch, right is wretch. `unit` names what the counter counts ("step", "line"). */
export function compare(parent: HTMLElement, unit = 'step', names: [string, string] = ['plain fetch', 'wretch']): [Column, Column] {
  const g = grid(parent);
  return [column(g, names[0], unit), column(g, names[1], unit)];
}
