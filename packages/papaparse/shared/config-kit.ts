// Helpers for parse-config examples: input pane, option switch, type counts
import { checkbox, select } from './controls.ts';
import { csvEditor, csvView, type ViewOptions } from './csv-view.ts';
import type { Pane } from './panes.ts';
import type { Stage } from './stage.ts';
import { stats } from './widgets.ts';

export interface CsvInput {
  /** The CSV as it stands now (the reader's edit in the full view). */
  readonly text: string;
  /** Replaces the text. */
  set(text: string): void;
  /** Redraws the text with its separators, quotes and line breaks coloured. */
  paint(opts: ViewOptions): void;
}

/**
 * Puts the CSV into `from`: a plain picture in a card, an editable box in the full view.
 * `onEdit` runs after the reader types, so the example can parse and paint again.
 */
export function csvInput(stage: Stage, from: Pane, text: string, onEdit: () => void): CsvInput {
  if (stage.preview) {
    let current = text;
    return {
      get text() {
        return current;
      },
      set(t) {
        current = t;
      },
      paint(opts) {
        from.show(csvView(current, opts));
      },
    };
  }
  const editor = csvEditor(text, onEdit);
  from.show(editor.el);
  return {
    get text() {
      return editor.value;
    },
    set: (t) => editor.set(t),
    paint: (o) => editor.paint(o),
  };
}

/**
 * An option that is either off or on. A card flips it every `ms`; the full view gets a
 * checkbox. `show` runs at once with the starting value.
 */
export function toggle(stage: Stage, label: string, show: (on: boolean) => void, opts: { ms?: number; initial?: boolean } = {}): void {
  const initial = opts.initial ?? false;
  stage.cycle([initial, !initial], opts.ms ?? 2600, show);
  if (stage.bar) checkbox(stage.bar, label, initial, show);
}

/**
 * Several settings of one option: a card steps through them every `ms`, the full view gets
 * a select. `show` runs at once with the first.
 */
export function choose<T>(stage: Stage, label: string, items: readonly (readonly [T, string])[], show: (v: T) => void, ms = 2600): void {
  stage.cycle(
    items.map((it) => it[0]),
    ms,
    show,
  );
  if (stage.bar) select(stage.bar, label, items, show);
}

export type TypeName = 'text' | 'number' | 'true/false' | 'date' | 'null' | 'empty';

/** How many cells of each JavaScript type a parse produced (rows as arrays or objects). */
export function countTypes(data: readonly unknown[]): Partial<Record<TypeName, number>> {
  const counts: Partial<Record<TypeName, number>> = {};
  const add = (k: TypeName): void => {
    counts[k] = (counts[k] ?? 0) + 1;
  };
  for (const row of data) {
    const cells: unknown[] = Array.isArray(row) ? row : Object.values(row as object);
    for (const v of cells) {
      if (v === null) add('null');
      else if (typeof v === 'number') add('number');
      else if (typeof v === 'boolean') add('true/false');
      else if (v instanceof Date) add('date');
      else if (v === '') add('empty');
      else add('text');
    }
  }
  return counts;
}

/** `"3 numbers, 1 text"` style summary of `countTypes`. */
export function typeSummary(data: readonly unknown[]): string {
  const parts = Object.entries(countTypes(data)).map(([k, n]) => `${n} ${k}`);
  return parts.join(', ') || 'no cells';
}

export interface Output {
  /** Replaces the result (a table, usually). */
  show(...nodes: Node[]): void;
  /** A "value label" pill under the result: full view only, since a card has no room. */
  pill(key: string, value: string | number | boolean, tone?: 'ok' | 'warn' | 'bad'): void;
}

/** Fills the output pane: the result on top and, in the full view, a row of pills. */
export function output(stage: Stage, to: Pane): Output {
  const body = document.createElement('div');
  body.className = 'pp-out';
  const pills = stage.preview ? null : stats(to.body);
  to.show(body);
  if (pills) to.body.append(pills.el);
  return {
    show: (...nodes) => body.replaceChildren(...nodes),
    pill: (key, value, tone) => pills?.set(key, value, tone),
  };
}
