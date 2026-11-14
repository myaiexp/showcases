// Horizontal timing bars: one labelled bar per measurement, scaled to the slowest
import './bars.css';

export interface Bars {
  el: HTMLElement;
  /** Sets bar `i`'s value (ms) and rescales every bar to the largest value. */
  set(i: number, ms: number, note?: string): void;
  /** Empties every bar and shows "…" while a new round runs. */
  clear(): void;
}

export function bars(parent: HTMLElement, labels: readonly string[], unit = 'ms'): Bars {
  const el = document.createElement('div');
  el.className = 'fz-bars';
  parent.append(el);
  const values: (number | undefined)[] = labels.map(() => undefined);
  const rows = labels.map((label) => {
    const row = document.createElement('div');
    row.className = 'fz-bars-row';
    const name = document.createElement('span');
    name.className = 'fz-bars-label';
    name.textContent = label;
    const track = document.createElement('div');
    track.className = 'fz-bars-track';
    const fill = document.createElement('div');
    fill.className = 'fz-bars-fill';
    track.append(fill);
    const num = document.createElement('span');
    num.className = 'fz-bars-num';
    row.append(name, track, num);
    el.append(row);
    return { fill, num };
  });
  const paint = (): void => {
    const max = Math.max(1e-9, ...values.map((v) => v ?? 0));
    values.forEach((v, i) => {
      rows[i]!.fill.style.width = v === undefined ? '0' : `${Math.max(1, (v / max) * 100)}%`;
    });
  };
  return {
    el,
    set(i, ms, note) {
      values[i] = ms;
      const shown = ms < 10 ? ms.toFixed(1) : Math.round(ms).toLocaleString('en');
      rows[i]!.num.textContent = note ? `${shown} ${unit} ${note}` : `${shown} ${unit}`;
      paint();
    },
    clear() {
      values.fill(undefined);
      rows.forEach((r) => (r.num.textContent = '…'));
      paint();
    },
  };
}
