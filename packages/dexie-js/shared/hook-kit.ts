// Hook, middleware and error helpers: plain connection, side grid, red errors
import Dexie, { type Table } from 'dexie';
import type { MountContext } from '@/types.ts';
import { demo, type Demo, type DemoOptions } from './demo.ts';
import type { ResultPanel } from './panels.ts';
import type { Stage } from './stage.ts';
import { tableView, type Column, type TableView } from './table-view.ts';

/** A second Dexie on the same database: it has no hooks and no middleware, so it shows what is really stored. */
export function plainConnection(stage: Stage, db: Dexie, stores: Record<string, string>): Dexie {
  const plain = stage.own(new Dexie(db.name), { keep: true });
  plain.version(1).stores(stores);
  return plain;
}

export interface PlainDemo extends Demo {
  /** The same table through the plain connection. */
  plain: Table;
}

/**
 * `demo()` whose grid reads through a plain connection: it shows what is stored, and its own
 * reads never reach the example's middleware or reading hook. `d.t` is the hooked table.
 */
export function plainDemo(el: HTMLElement, ctx: MountContext, o: DemoOptions): PlainDemo {
  let ready!: (t: Table) => void;
  const tablePromise = new Promise<Table>((resolve) => (ready = resolve));
  const d = demo(el, ctx, { ...o, view: { read: async () => (await tablePromise).toArray(), ...o.view } });
  const name = o.table ?? 'friends';
  const plain = plainConnection(d.stage, d.db, { [name]: o.stores, ...o.extra }).table(name);
  ready(plain);
  return { ...d, plain };
}

/** Swaps the demo's event log (right column) for a grid of a second table. The log stays usable, unseen. */
export function sideGrid(d: Demo, table: Table, columns: readonly (string | Column)[], title?: string): TableView {
  const holder = document.createElement('div');
  d.log.el.replaceWith(holder);
  return tableView(d.stage, holder, { table, columns, title });
}

/** A string clipped to `max` characters. */
export function clip(text: string, max = 70): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/** The error name large and red, its message small under it. */
export function showError(out: ResultPanel, error: unknown, note?: string): void {
  const e = error as Error | undefined;
  if (!e) {
    out.value('no error', note, 'warn');
    return;
  }
  // A plain Error is the example's own throw: its message is the news, not its name.
  if (e.name === 'Error') out.value(e.message, note ?? 'thrown by the example\'s own code', 'bad');
  else out.value(e.name, clip(note ?? e.message), 'bad');
}

/** Runs `fn` and resolves to the error it raised (sync throw or rejection), or undefined. */
export async function errorOf(fn: () => unknown): Promise<Error | undefined> {
  try {
    await fn();
    return undefined;
  } catch (error) {
    return error as Error;
  }
}
