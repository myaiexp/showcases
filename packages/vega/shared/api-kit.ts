// API helpers: an in-spec console, input/output tables, value printing
import type { Data, Mark, Spec, View } from 'vega';
import type { Stage } from './stage.ts';

/** A compact one-line rendering of any value, for tables and consoles. */
export function show(v: unknown, digits = 5): string {
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : String(Number(v.toPrecision(digits)));
  if (typeof v === 'string') return JSON.stringify(v);
  if (v instanceof Date) return Number.isNaN(+v) ? 'Invalid Date' : v.toISOString().replace('.000Z', 'Z');
  if (typeof v === 'function') return `ƒ ${(v as { name?: string }).name ?? ''}`.trim();
  if (Array.isArray(v)) return `[${v.map((x) => show(x, digits)).join(', ')}]`;
  if (v && typeof v === 'object') {
    const entries = Object.entries(v as Record<string, unknown>).map(([k, x]) => `${k}: ${show(x, digits)}`);
    return `{${entries.join(', ')}}`;
  }
  return String(v);
}

/** Runs fn; a throw becomes its message, so a table can show what an invalid call does. */
export function attempt(fn: () => unknown): string {
  try {
    return show(fn());
  } catch (err) {
    return `throws: ${(err as Error).message}`;
  }
}

const mono = { font: { value: 'monospace' }, fontSize: { value: 11 }, baseline: { value: 'top' as const } };

export interface ConsoleOptions {
  /** Left edge, top edge and pixel width of the console inside the view. */
  x: number;
  y: number;
  width: number;
  rows?: number;
  lineHeight?: number;
  /** A heading drawn above the first line. */
  title?: string;
}

/** Data and marks for a console of text lines drawn in the spec (works in cards and full views). */
export function consoleParts(o: ConsoleOptions): { data: Data; marks: Mark[]; height: number } {
  const lh = o.lineHeight ?? 14;
  const head = o.title ? 18 : 0;
  const marks: Mark[] = [];
  if (o.title) {
    marks.push({
      type: 'text',
      encode: { enter: { x: { value: o.x }, y: { value: o.y }, text: { value: o.title }, fill: { value: '#a6acb8' }, ...mono, fontWeight: { value: 'bold' } } },
    });
  }
  marks.push({
    type: 'text',
    from: { data: 'console' },
    encode: {
      update: {
        x: { value: o.x },
        y: { signal: `${o.y + head} + datum.i * ${lh}` },
        text: { field: 'line' },
        limit: { value: o.width },
        fill: { signal: 'datum.i == length(data("console")) - 1 ? "#f59e0b" : "#ddd"' },
        ...mono,
      },
    },
  } as Mark);
  return { data: { name: 'console', values: [] }, marks, height: head + (o.rows ?? 6) * lh };
}

export interface ConsoleLog {
  push(...lines: string[]): void;
  clear(): void;
  /** Writes the last lines into the console data set and runs the view. */
  show(): Promise<void>;
  /** show() a moment later, once: for listeners that fire in the middle of a dataflow run. */
  soon(): void;
  readonly lines: string[];
}

/** Collects lines and shows the last `rows` of them in the spec's console data set. */
export function makeConsole(view: View, stage: Stage, rows = 6): ConsoleLog {
  const lines: string[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;
  const log: ConsoleLog = {
    lines,
    push: (...more) => void lines.push(...more),
    clear: () => void (lines.length = 0),
    show: async () => {
      if (stage.disposed) return;
      view.data(
        'console',
        lines.slice(-rows).map((line, i) => ({ i, line })),
      );
      await view.runAsync();
    },
    soon: () => {
      if (timer || stage.disposed) return;
      timer = setTimeout(() => {
        timer = null;
        void log.show();
      }, 40);
    },
  };
  stage.own(() => timer && clearTimeout(timer));
  return log;
}

export interface Column {
  title: string;
  width: number;
}

/** The rows of a table as data tuples (`i`, `c0`, `c1`, ...), e.g. for view.data('table', ...). */
export function tableData(rows: string[][]): Record<string, string | number>[] {
  return rows.map((r, i) => ({ i, ...Object.fromEntries(r.map((cell, c) => [`c${c}`, cell])) }));
}

/** Data (`table`) and marks for a text table; the `shown` signal reveals the first N rows. */
export function tableParts(
  columns: Column[],
  rows: string[][],
  o: { x?: number; y?: number; rowHeight?: number; accent?: boolean } = {},
): { data: Data; marks: Mark[]; width: number; height: number } {
  const rh = o.rowHeight ?? 17;
  const x0 = o.x ?? 0;
  const y0 = o.y ?? 0;
  const marks: Mark[] = [];
  let off = x0;
  columns.forEach((col, c) => {
    marks.push({
      type: 'text',
      encode: { enter: { x: { value: off }, y: { value: y0 }, text: { value: col.title }, fill: { value: '#a6acb8' }, ...mono, fontWeight: { value: 'bold' } } },
    });
    marks.push({
      type: 'text',
      from: { data: 'table' },
      encode: {
        update: {
          x: { value: off },
          y: { signal: `${y0 + rh} + datum.i * ${rh}` },
          text: { field: `c${c}` },
          limit: { value: col.width - 8 },
          fill: { signal: `datum.i < shown ? (${c} == ${columns.length - 1} && ${o.accent ?? true} ? "#f59e0b" : "#ddd") : "transparent"` },
          ...mono,
        },
      },
    } as Mark);
    off += col.width;
  });
  return { data: { name: 'table', values: tableData(rows) }, marks, width: off - x0, height: (rows.length + 1) * rh };
}

/** A whole spec that is just a table of input and output columns. */
export function tableSpec(columns: Column[], rows: string[][], o: { rowHeight?: number; accent?: boolean } = {}): Spec {
  const t = tableParts(columns, rows, { y: 0, rowHeight: o.rowHeight, accent: o.accent });
  return {
    width: t.width,
    height: t.height,
    padding: 8,
    signals: [{ name: 'shown', value: rows.length }],
    data: [t.data],
    marks: t.marks,
  };
}

/** Cards only: reveals a table's rows one by one, holds, and starts again. */
export function revealRows(stage: Stage, view: View, count: number, ms = 380): void {
  if (!stage.preview) return;
  view.signal('shown', 0);
  stage.every(ms, (i) => {
    view.signal('shown', i % (count + 6));
    return view.runAsync().then(() => undefined);
  });
}
