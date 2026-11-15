// A strip of whole numbers where the values a schema accepts light up
import './tour.css';
import { select, slider } from './controls.ts';
import type { Stage } from './stage.ts';
import { codeLine } from './widgets.ts';

export interface NumberStrip {
  el: HTMLElement;
  /** Lights every cell `accepts` says yes to. */
  paint(accepts: (n: number) => boolean): void;
  /** Puts the probe on `n` (or removes it with null), green or red. */
  probe(n: number | null, ok?: boolean): void;
}

export function numberStrip(parent: HTMLElement, stage: Stage, min: number, max: number, tick = 5): NumberStrip {
  const el = document.createElement('div');
  el.className = 'zd-strip';
  const cells = new Map<number, HTMLElement>();
  for (let n = min; n <= max; n++) {
    const cell = document.createElement('div');
    cell.className = 'zd-cell';
    const label = document.createElement('span');
    label.textContent = n % tick === 0 ? String(n) : '';
    cell.append(label);
    cells.set(n, cell);
    el.append(cell);
  }
  parent.append(el);
  let last: HTMLElement | null = null;
  return {
    el,
    paint(accepts) {
      let i = 0;
      for (const [n, cell] of cells) {
        const was = cell.dataset['ok'];
        const now = String(accepts(n));
        cell.dataset['ok'] = now;
        if (was !== now && !stage.disposed) cell.animate([{ transform: 'scaleY(0.4)' }, { transform: 'none' }], { duration: 260, delay: i * 12, easing: 'ease-out', fill: 'backwards' });
        i++;
      }
    },
    probe(n, ok = true) {
      last?.classList.remove('zd-probe');
      last = n === null ? null : (cells.get(n) ?? null);
      if (last) {
        last.classList.add('zd-probe');
        last.dataset['probe'] = String(ok);
      }
    },
  };
}

export interface StripVariant {
  code: string;
  label: string;
  schema: { safeParse(input: unknown): { success: boolean; error?: { issues: readonly { message: string }[] } } };
  /** Plain English for the caption. */
  say: string;
}

/**
 * One schema at a time over a strip of whole numbers: cycled in cards, picked from a menu
 * in the full view, where a slider also tries single values. `probe` is the number the
 * card keeps its marker on.
 */
export function stripTour(stage: Stage, variants: readonly StripVariant[], min: number, max: number, probe: number, tick = 5): void {
  const code = codeLine(stage.root, '');
  const strip = numberStrip(stage.root, stage, min, max, tick);
  let current = variants[0]!;
  const tryValue = (n: number): void => {
    const r = current.schema.safeParse(n);
    strip.probe(n, r.success);
    stage.say(r.success ? `✓ ${n} gets in` : `✗ ${n}: ${r.error?.issues[0]?.message ?? 'rejected'}`, r.success ? 'ok' : 'bad');
  };
  const at = stage.cycle(variants, 3400, (v) => {
    current = v;
    code.textContent = v.code;
    strip.paint((n) => v.schema.safeParse(n).success);
    strip.probe(probe, v.schema.safeParse(probe).success);
    stage.say(v.say, 'info');
  });
  if (stage.bar) {
    select(stage.bar, 'Rule', variants.map((v, i) => [i, v.label] as const), (i) => at(i));
    slider(stage.bar, 'Try', min, max, 1, probe, tryValue);
  }
}
