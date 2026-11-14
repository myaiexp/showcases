// A progress bar with a percentage and byte counts, for downloads and uploads
import './meter.css';

export interface Meter {
  el: HTMLElement;
  /** Fills the bar from byte counts. A total of 0 shows an unknown size. */
  set(loaded: number, total: number): void;
  /** Empties the bar. */
  reset(): void;
  /** Replaces the label with a note, such as "no progress arrived". */
  note(text: string, tone?: 'ok' | 'warn' | 'bad' | 'dim'): void;
  /** How many times `set` was called since the last reset. */
  readonly calls: number;
}

const div = (cls: string, text = ''): HTMLDivElement => {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
};

const kb = (n: number): string => (n < 1024 ? `${n} B` : `${(n / 1024).toFixed(1)} kB`);

/** A titled bar; `set(loaded, total)` moves it. */
export function meter(parent: HTMLElement, title: string): Meter {
  const el = div('wr-meter');
  const fill = div('wr-meter-fill');
  const track = div('wr-meter-track');
  const label = div('wr-meter-label', 'waiting');
  track.append(fill);
  el.append(div('wr-meter-title', title), track, label);
  parent.append(el);
  let calls = 0;
  const reset = (): void => {
    calls = 0;
    fill.style.width = '0%';
    label.textContent = 'waiting';
    label.dataset['tone'] = 'dim';
  };
  return {
    el,
    reset,
    get calls() {
      return calls;
    },
    set(loaded, total) {
      calls += 1;
      const pct = total > 0 ? Math.min(100, (loaded / total) * 100) : 0;
      fill.style.width = `${pct}%`;
      label.textContent = total > 0 ? `${pct.toFixed(0)}% · ${kb(loaded)} of ${kb(total)}` : `${kb(loaded)} (size unknown)`;
      label.dataset['tone'] = pct >= 100 ? 'ok' : 'info';
    },
    note(text, tone = 'dim') {
      label.textContent = text;
      label.dataset['tone'] = tone;
    },
  };
}
