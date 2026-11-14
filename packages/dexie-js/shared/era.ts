// Version lab: one database reopened as a new Dexie per schema version
import Dexie, { type DexieOptions } from 'dexie';
import { scrubNullOptimisticOps } from './cache-fix.ts';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { caption, columns, eventLog, resultPanel, type Caption, type Log, type ResultPanel } from './panels.ts';
import { createStage, type Stage } from './stage.ts';
import { tableView, type Column, type TableView, type TableViewOptions } from './table-view.ts';
import { tour, type Step } from './tour.ts';

/** `stores()`-style line of every table the open database holds, as it is installed. */
export function schemaLines(db: Dexie): string[] {
  return db.tables.map((t) => `${t.name}: ${[t.schema.primKey.src, ...t.schema.indexes.map((i) => i.src)].join(', ')}`);
}

/** Runs `fn`; resolves to its value or to the error it raised (never throws). */
export async function tryIt<T>(fn: () => PromiseLike<T> | T): Promise<{ value?: T; error?: Error }> {
  try {
    return { value: await fn() };
  } catch (error) {
    return { error: error as Error };
  }
}

export interface VersionLab {
  /** The database name every version shares. */
  readonly name: string;
  /** The current connection; throws a friendly error before the first step has run. */
  readonly db: Dexie;
  /** Closes the previous connection, makes a new Dexie of the same name and lets `define` declare it. Not opened yet. */
  next(define: (db: Dexie) => void, options?: DexieOptions): Dexie;
  /** `next()`, then opens it so any upgrade has run. */
  open(define: (db: Dexie) => void, options?: DexieOptions): Promise<Dexie>;
  /** Shows a grid of `table` of the current connection, replacing the previous grid. */
  show(table: string, cols: readonly (string | Column)[], opts?: Partial<TableViewOptions>): TableView;
  /** Removes the grid (a liveQuery over a closed or deleted database would report an error). */
  hide(): void;
  /** Closes the connection, deletes the database and clears the grid. */
  wipe(): Promise<void>;
}

/** Many Dexie instances over one database name. Only the last stays connected; the grid is rebuilt per version. */
export function versionLab(stage: Stage, holder: HTMLElement, label: string): VersionLab {
  const name = stage.dbName(label);
  let current: Dexie | null = null;
  const ends: (() => void)[] = [];
  // tableView only needs the stage's onDispose and fail; a per-grid stand-in lets each grid end alone.
  const gridStage = { onDispose: (fn: () => void) => void ends.push(fn), fail: stage.fail } as unknown as Stage;

  const endGrid = (): void => {
    for (const fn of ends.splice(0)) fn();
    holder.replaceChildren();
  };
  const drop = (): void => {
    endGrid();
    current?.close();
  };
  stage.onDispose(() => {
    drop();
    Dexie.delete(name).catch((err: unknown) => console.warn('dexie cleanup:', err));
  });

  const lab: VersionLab = {
    name,
    get db() {
      if (!current) throw new Error('Run the first step first.');
      return current;
    },
    next(define, options) {
      drop();
      current = new Dexie(name, options);
      scrubNullOptimisticOps(current);
      define(current);
      return current;
    },
    async open(define, options) {
      const db = lab.next(define, options);
      await db.open();
      return db;
    },
    show(table, cols, opts = {}) {
      endGrid();
      return tableView(gridStage, holder, { table: lab.db.table(table), columns: cols, ...opts });
    },
    hide: endGrid,
    async wipe() {
      drop();
      current = null;
      await Dexie.delete(name);
    },
  };
  return lab;
}

export interface VersionDemo {
  stage: Stage;
  lab: VersionLab;
  say: Caption;
  out: ResultPanel;
  log: Log;
  /** A step: sets the caption, then runs `fn`. */
  step(label: string, text: string, code: string, fn: () => unknown, hold?: number): Step;
  /** Card loop and full-view buttons; the lab is wiped before the loop restarts and by the Reset button. */
  run(steps: readonly Step[]): void;
}

export interface VersionDemoOptions {
  label: string;
  /** Which panel sits right of the grid; default 'result'. */
  side?: 'result' | 'log';
  title?: string;
  hint?: string;
  height?: number;
}

/** Scaffold for examples that reinstall a database across versions. */
export function versionDemo(el: HTMLElement, ctx: MountContext, o: VersionDemoOptions): VersionDemo {
  const stage = createStage(el, ctx, { hint: o.hint ?? 'Press the steps in order. Reset starts over.', height: o.height });
  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  const holder = document.createElement('div');
  left!.append(holder);
  const spare = document.createElement('div');
  const side = o.side ?? 'result';
  const out = resultPanel(side === 'result' ? right! : spare, o.title);
  const log = eventLog(side === 'log' ? right! : spare);
  const lab = versionLab(stage, holder, o.label);
  const clean = async (): Promise<void> => {
    out.clear();
    log.clear();
    await lab.wipe();
  };
  return {
    stage,
    lab,
    say,
    out,
    log,
    step: (label, text, code, fn, hold) => ({
      label,
      hold,
      run: async () => {
        say.set(text, code);
        await fn();
      },
    }),
    run(steps) {
      tour(stage, steps, {
        reset: async () => {
          await clean();
          say.set('Starting over.');
          await stage.wait(900);
        },
      });
      if (!stage.preview) {
        button(stage, 'Reset', async () => {
          await clean();
          say.set('Reset.');
        });
      }
    },
  };
}
