// Helpers shared by the Transforms: Basic examples: seeded data, signal cycling, a text table of a dataset
import { changeset } from 'vega';
import type { Data, Mark, View } from 'vega';
import { button } from './controls.ts';
import type { Stage } from './stage.ts';

/** A small deterministic generator (mulberry32), so every mount draws the same data. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal draws (Box-Muller) from a uniform generator. */
export function normals(rand: () => number): () => number {
  return () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
}

/** Cards only: step a signal through values on a timer. The full view's controls stay in charge. */
export function cycle(stage: Stage, view: View, name: string, values: unknown[], ms = 1500): void {
  if (!stage.preview) return;
  stage.every(ms, (i) => {
    view.signal(name, values[i % values.length]);
    return view.runAsync().then(() => undefined);
  });
}

export interface Column {
  field: string;
  title?: string;
  /** Pixel width of the column; default 52. */
  width?: number;
}

/** A numbered copy of a dataset (field `_r`, from 1), the source of a text table. */
export function rowsOf(name: string, source: string, maxRows = 12): Data {
  return {
    name,
    source,
    transform: [
      { type: 'window', ops: ['row_number'], as: ['_r'] },
      { type: 'filter', expr: `datum._r <= ${maxRows}` },
    ],
  };
}

const cell = (f: string): string =>
  `isArray(datum["${f}"]) ? toString(datum["${f}"]) : isObject(datum["${f}"]) ? "{…}" : isNumber(datum["${f}"]) ? format(datum["${f}"], ".4~g") : isDate(datum["${f}"]) ? timeFormat(datum["${f}"], "%b %d %Y") : isValid(datum["${f}"]) ? toString(datum["${f}"]) : "–"`;

/** Text marks listing a dataset made by rowsOf(), to the right of the data rectangle. */
export function tableMarks(data: string, columns: Column[], opts: { gap?: number; top?: number } = {}): Mark[] {
  const gap = opts.gap ?? 36;
  const top = opts.top ?? 0;
  const marks: Mark[] = [];
  let off = 0;
  for (const col of columns) {
    const x = { signal: `width + ${gap + off}` };
    marks.push({
      type: 'text',
      encode: {
        enter: {
          x,
          y: { value: top },
          text: { value: col.title ?? col.field },
          fill: { value: '#a6acb8' },
          fontWeight: { value: 'bold' },
          fontSize: { value: 11 },
        },
      },
    });
    marks.push({
      type: 'text',
      from: { data },
      encode: {
        update: {
          x,
          y: { signal: `${top + 16} + (datum._r - 1) * 14` },
          text: { signal: cell(col.field) },
          fill: { value: '#ddd' },
          fontSize: { value: 11 },
        },
      },
    });
    off += col.width ?? 52;
  }
  return marks;
}

/**
 * Replaces a dataset's rows with make(n), n counting from 1: on a timer in cards, and in the
 * full view on a button, so the transform visibly reruns on fresh input.
 */
export function reshuffle(
  stage: Stage,
  view: View,
  name: string,
  make: (n: number) => object[],
  ms = 1800,
): void {
  const swap = (n: number): Promise<void> =>
    view
      .change(name, changeset().remove(() => true).insert(make(n)))
      .runAsync()
      .then(() => undefined);
  if (stage.preview) stage.every(ms, (i) => swap(i + 1));
  else if (stage.bar) {
    let n = 1;
    button(stage.bar, 'New data', () => void swap(++n));
  }
}

/** n seeded normal draws around mean, as `{v}` rows rounded to 2 decimals and clamped to [lo, hi]. */
export function gaussRows(seed: number, n: number, mean: number, sd: number, lo = 0, hi = 100): { v: number }[] {
  const gauss = normals(rng(seed));
  return Array.from({ length: n }, () => ({
    v: Math.round(Math.min(hi, Math.max(lo, mean + gauss() * sd)) * 100) / 100,
  }));
}
