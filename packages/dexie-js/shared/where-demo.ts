// Scene for WhereClause examples: a table, editable arguments, matches highlighted
import Dexie, { type Table } from 'dexie';
import type { MountContext } from '@/types.ts';
import { caption, columns, resultPanel } from './panels.ts';
import { createStage, type Stage } from './stage.ts';
import { tableView, type Column, type Row } from './table-view.ts';
import { readPath } from './format.ts';
import { tour } from './tour.ts';

/** Argument values by field key: numbers, strings, booleans (dates are 'YYYY-MM-DD'). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Args = Record<string, any>;

export type Field =
  | { key: string; label: string; kind: 'number'; value: number; min?: number; max?: number }
  | { key: string; label: string; kind: 'text'; value: string; width?: number }
  | { key: string; label: string; kind: 'date'; value: string }
  | { key: string; label: string; kind: 'check'; value: boolean }
  | { key: string; label: string; kind: 'select'; value: string; options: readonly string[] };

export interface Preset {
  /** Button text in the full view. */
  label: string;
  /** Field values for this step; others keep the field's own value. */
  values?: Args;
  hold?: number;
}

export interface WhereDemo {
  /** Table name (what the example's code calls `db.<table>`). */
  table: string;
  /** The Version.stores() schema string of that table. */
  stores: string;
  rows: readonly Row[];
  columns: readonly (string | Column)[];
  /** Arguments the reader can change in the full view (cards use the preset values). */
  fields?: readonly Field[];
  presets: readonly Preset[];
  /** The plain-words step and the call, for the current arguments. */
  describe(args: Args): { say: string; code: string };
  /** The query itself; the rows it returns are highlighted in the grid. */
  query(table: Table, args: Args): Promise<unknown[]>;
  /** Chip text for one returned row (default: its first two non-key fields). */
  show?(row: Row): string;
  /** 'mark' keeps every row visible and highlights hits; 'filter' lists only the hits. */
  view?: 'mark' | 'filter';
  height?: number;
  hint?: string;
}

export function whereDemo(el: HTMLElement, ctx: MountContext, cfg: WhereDemo): () => void {
  const stage = createStage(el, ctx, { height: cfg.height, hint: cfg.hint ?? 'Change a value, or pick a ready-made step.' });
  const db = stage.own(new Dexie(stage.dbName(cfg.table)));
  db.version(1).stores({ [cfg.table]: cfg.stores });
  const table = db.table(cfg.table) as Table;
  const pk = table.schema.primKey.keyPath as string | string[];

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  const filter = cfg.view === 'filter';
  let last: Row[] = [];
  const view = tableView(stage, left!, {
    table,
    // Cards are narrow: with three or more columns, drop the id one.
    columns: stage.preview && cfg.columns.length > 2 ? cfg.columns.filter((c) => (typeof c === 'string' ? c : c.field) !== 'id') : cfg.columns,
    ...(filter ? { read: async () => last } : {}),
  });
  const out = resultPanel(right!);
  const names = cfg.columns.map((c) => (typeof c === 'string' ? c : c.field));
  const chip =
    cfg.show ?? ((row: Row) => names.filter((n) => n !== pk).slice(0, 2).map((n) => String(row[n] ?? '')).join(' '));

  const args: Args = Object.fromEntries((cfg.fields ?? []).map((f) => [f.key, f.value]));
  const inputs = new Map<string, HTMLInputElement | HTMLSelectElement>();
  let seq = 0;

  const run = async (): Promise<void> => {
    const mine = ++seq;
    const { say: s, code } = cfg.describe(args);
    say.set(s, code);
    let rows: Row[];
    try {
      rows = (await cfg.query(table, args)) as Row[];
    } catch (err) {
      if (stage.disposed || mine !== seq) return;
      const e = err as Error;
      out.value(e.name, e.message.slice(0, 90), 'bad');
      view.note('query failed');
      return;
    }
    if (stage.disposed || mine !== seq) return;
    if (filter) {
      last = rows;
      await view.refresh();
      view.mark(() => true);
    } else {
      view.mark(rows.map((r) => readPath(r, pk)));
      view.note(`${new Set(rows.map((r) => String(readPath(r, pk)))).size} of ${await table.count()} match`);
    }
    out.list(rows.map(chip));
  };

  const apply = async (values: Args = {}): Promise<void> => {
    Object.assign(args, values);
    for (const [key, input] of inputs) {
      if (!(key in values)) continue;
      if (input instanceof HTMLInputElement && input.type === 'checkbox') input.checked = Boolean(values[key]);
      else input.value = String(values[key]);
    }
    await run();
  };

  const changed = (): void => stage.action(run)();
  if (!stage.preview) {
    for (const f of cfg.fields ?? []) {
      const input = buildField(stage, f, (v) => {
        args[f.key] = v;
        changed();
      });
      inputs.set(f.key, input);
    }
  }

  tour(
    stage,
    cfg.presets.map((p) => ({ label: p.label, hold: p.hold ?? 2300, run: () => apply(p.values) })),
    {
      setup: async () => {
        await table.bulkAdd(cfg.rows as Row[]);
        if (!stage.preview) await apply(cfg.presets[0]?.values);
      },
    },
  );
  return stage.dispose;
}

function buildField(stage: Stage, f: Field, set: (v: string | number | boolean) => void): HTMLInputElement | HTMLSelectElement {
  const wrap = document.createElement('label');
  wrap.className = 'dx-field';
  let input: HTMLInputElement | HTMLSelectElement;
  if (f.kind === 'select') {
    input = document.createElement('select');
    for (const o of f.options) input.add(new Option(o, o));
    input.value = f.value;
    input.addEventListener('change', () => set(input.value));
  } else {
    const i = document.createElement('input');
    input = i;
    i.type = { number: 'number', text: 'text', date: 'date', check: 'checkbox' }[f.kind];
    if (f.kind === 'check') {
      i.checked = f.value;
      i.addEventListener('change', () => set(i.checked));
    } else {
      i.value = String(f.value);
      if (f.kind === 'number') {
        if (f.min !== undefined) i.min = String(f.min);
        if (f.max !== undefined) i.max = String(f.max);
        i.style.width = '64px';
        i.addEventListener('input', () => set(i.valueAsNumber));
      } else {
        if (f.kind === 'text') i.style.width = `${f.width ?? 120}px`;
        i.addEventListener('input', () => set(i.value));
      }
    }
  }
  if (f.kind === 'check') wrap.append(input, f.label);
  else wrap.append(f.label, input);
  stage.bar?.append(wrap);
  return input;
}
