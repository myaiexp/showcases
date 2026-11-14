// A row of handler names that light up when that handler runs, so you see which one fired
import type { Tone } from './wire.ts';
import './chips.css';

export interface Chips {
  el: HTMLElement;
  /** Lights `name` (and dims the rest unless `keep`); `detail` shows under the row. */
  fire(name: string, tone?: Tone, detail?: string, keep?: boolean): void;
  /** Dims every chip and clears the detail. */
  reset(): void;
}

/** `names` are the labels, such as ".notFound()" or ".json()". */
export function chips(parent: HTMLElement, names: readonly string[], title = 'Which handler ran'): Chips {
  const el = document.createElement('div');
  el.className = 'wr-chips';
  const head = document.createElement('div');
  head.className = 'wr-chips-title';
  head.textContent = title;
  const row = document.createElement('div');
  row.className = 'wr-chips-row';
  const detail = document.createElement('div');
  detail.className = 'wr-chips-detail';
  const byName = new Map<string, HTMLElement>();
  for (const n of names) {
    const c = document.createElement('span');
    c.className = 'wr-chip';
    c.textContent = n;
    byName.set(n, c);
    row.append(c);
  }
  el.append(head, row, detail);
  parent.append(el);

  const reset = (): void => {
    byName.forEach((c) => (c.className = 'wr-chip'));
    detail.textContent = '';
  };
  return {
    el,
    reset,
    fire(name, tone = 'ok', text = '', keep = false) {
      if (!keep) reset();
      const c = byName.get(name);
      if (c) {
        c.className = `wr-chip wr-on wr-${tone}`;
        c.animate([{ transform: 'scale(1.18)' }, { transform: 'none' }], { duration: 300, easing: 'ease-out' });
      }
      if (text) detail.textContent = text;
    },
  };
}
