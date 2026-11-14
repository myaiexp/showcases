// One-table example scaffold: stage, caption, grid, answer panel, looping tour
import Dexie, { type Table } from 'dexie';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { FRIENDS } from './data.ts';
import { caption, columns, eventLog, resultPanel, type Caption, type Log, type ResultPanel } from './panels.ts';
import { createStage, type Stage } from './stage.ts';
import { tableView, type Column, type Row, type TableView, type TableViewOptions } from './table-view.ts';
import { tour, type Step, type TourOptions } from './tour.ts';

export interface DemoOptions {
  /** Part of the database name; defaults to the table name. */
  label?: string;
  /** Table name; default 'friends'. */
  table?: string;
  /** The table's Version.stores() line, e.g. 'id, name, age'. */
  stores: string;
  /** More tables, by name, declared next to the main one. */
  extra?: Record<string, string>;
  columns: readonly (string | Column)[];
  /** Rows put in on start and after every card loop. */
  seed?: readonly Row[];
  /** Which panel sits right of the grid; default 'result'. */
  side?: 'result' | 'log';
  /** Grid : panel width ratio; default 3:2. */
  weights?: [number, number];
  hint?: string;
  height?: number;
  view?: Partial<TableViewOptions>;
  /** Outbound primary key (stores ', name'): the grid gets a `key` column, and seed rows carry a `key`. */
  withKeys?: boolean;
}

export interface Demo {
  stage: Stage;
  db: Dexie;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: Table<any, any>;
  say: Caption;
  view: TableView;
  out: ResultPanel;
  log: Log;
  /** Empties the table and puts the seed rows back in. */
  reseed(): Promise<void>;
  /** A step: clears marks, sets the caption, then runs `fn`. */
  step(label: string, text: string, code: string, fn: () => unknown, hold?: number): Step;
  /** Plays `steps` (card loop / full-view buttons) with seeding and a reset button. */
  run(steps: readonly Step[], extra?: Partial<TourOptions>): void;
}

export const ID_COL: Column = { field: 'id', width: '2.6em' };
export const AGE_COL: Column = { field: 'age', width: '3.4em' };
/** id, name, age: the usual friends grid. */
export const FRIEND_COLS: readonly Column[] = [ID_COL, { field: 'name' }, AGE_COL];

/** The first `n` sample friends with ids 1..n. */
export function friends(n: number): Row[] {
  return FRIENDS.slice(0, n).map((f, i) => ({ id: i + 1, ...f }));
}

type BulkLike = Error & { failures?: Error[]; failuresByPos?: Record<string, Error> };

/** The rows without their `id`, for tables that number their own rows (++id). */
export function bare(rows: readonly Row[]): Row[] {
  return rows.map(({ id: _id, ...r }) => r);
}

/** Resolves to the value, or to the error a rejected call raised (never throws). */
export async function attempt<T>(p: PromiseLike<T>): Promise<{ value?: T; error?: BulkLike }> {
  try {
    return { value: await p };
  } catch (error) {
    return { error: error as Error };
  }
}

export function demo(el: HTMLElement, ctx: MountContext, o: DemoOptions): Demo {
  const stage = createStage(el, ctx, { hint: o.hint ?? 'Press the steps in any order. Reset starts over.', height: o.height });
  const name = o.table ?? 'friends';
  const db = stage.own(new Dexie(stage.dbName(o.label ?? name)));
  db.version(1).stores({ [name]: o.stores, ...o.extra });
  const t = db.table(name);

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, ...(o.weights ?? [3, 2]));
  const keyed = o.withKeys
    ? {
        key: 'key',
        read: async (): Promise<Row[]> => {
          const keys = await t.toCollection().primaryKeys();
          return (await t.toArray()).map((r, i) => ({ key: keys[i], ...r }));
        },
      }
    : {};
  const view = tableView(stage, left!, { table: t, columns: o.columns, ...keyed, ...o.view });
  const spare = document.createElement('div');
  const side = o.side ?? 'result';
  const out = resultPanel(side === 'result' ? right! : spare);
  const log = eventLog(side === 'log' ? right! : spare);

  const reseed = (): Promise<void> =>
    db.transaction('rw', t, async () => {
      await t.clear();
      if (!o.seed?.length) return;
      if (o.withKeys) await t.bulkPut(o.seed.map(({ key: _k, ...r }) => r), o.seed.map((r) => r.key) as string[]);
      else await t.bulkPut(o.seed as Row[]);
    });

  const clean = (): void => {
    view.unmark();
    out.clear();
    log.clear();
  };

  return {
    stage,
    db,
    t,
    say,
    view,
    out,
    log,
    reseed,
    step(label, text, code, fn, hold) {
      return {
        label,
        hold,
        run: async () => {
          view.unmark();
          say.set(text, code);
          await fn();
        },
      };
    },
    run(steps, extra = {}) {
      tour(stage, steps, {
        setup: reseed,
        reset: async () => {
          clean();
          say.set('Starting over.');
          await reseed();
          await stage.wait(1000);
        },
        ...extra,
      });
      if (!stage.preview) {
        button(stage, 'Reset', async () => {
          clean();
          say.set('Table reset.');
          await reseed();
        });
      }
    },
  };
}
