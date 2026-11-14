// Dexie class examples: object trees, a connection board and a multi-tab scaffold
import Dexie, { type DexieOptions } from 'dexie';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { fmt } from './format.ts';
import { caption, columns, eventLog, type Caption, type Log } from './panels.ts';
import { createStage, type Stage } from './stage.ts';
import { tour, type Step } from './tour.ts';

export type Tone = 'ok' | 'warn' | 'bad';

export interface Tree {
  el: HTMLElement;
  /** Draws `value` as indented `key: value` lines; lines whose dotted path is in `hot` take `tone`. */
  show(value: unknown, hot?: readonly string[], tone?: Tone): void;
  clear(): void;
}

function flatten(v: unknown, path: string, depth: number, out: { text: string; path: string; depth: number }[]): void {
  const plain = v !== null && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype;
  if (!plain) return void out.push({ text: fmt(v, 30), path, depth });
  for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
    const p = path ? `${path}.${k}` : k;
    const nested = x !== null && typeof x === 'object' && Object.getPrototypeOf(x) === Object.prototype;
    if (nested) {
      out.push({ text: `${k}:`, path: p, depth });
      flatten(x, p, depth + 1, out);
    } else out.push({ text: `${k}: ${fmt(x, 30)}`, path: p, depth });
  }
}

/** A titled panel that prints a plain object as indented lines, optionally highlighting some paths. */
export function treeView(parent: HTMLElement, title: string): Tree {
  const el = document.createElement('div');
  el.className = 'dx-log';
  const head = document.createElement('div');
  head.className = 'dx-result-head';
  head.textContent = title;
  const body = document.createElement('div');
  body.className = 'dx-log-body';
  el.append(head, body);
  parent.append(el);
  return {
    el,
    show(value, hot = [], tone = 'warn') {
      const lines: { text: string; path: string; depth: number }[] = [];
      flatten(value, '', 0, lines);
      body.replaceChildren(
        ...lines.map((l) => {
          const d = document.createElement('div');
          d.className = `dx-line${hot.includes(l.path) ? ` dx-${tone}` : ''}`;
          d.style.paddingLeft = `${l.depth * 1.1}em`;
          d.textContent = l.text;
          return d;
        }),
      );
    },
    clear() {
      body.replaceChildren();
    },
  };
}

export interface Board {
  /** Sets (or adds) the chip called `id`. */
  set(id: string, text: string, tone?: Tone): void;
  clear(): void;
}

/** A small panel of status chips, one per name. */
export function board(parent: HTMLElement, title = 'connections'): Board {
  const el = document.createElement('div');
  el.className = 'dx-result';
  const head = document.createElement('div');
  head.className = 'dx-result-head';
  head.textContent = title;
  const body = document.createElement('div');
  body.className = 'dx-result-body';
  el.append(head, body);
  parent.append(el);
  const chips = new Map<string, HTMLElement>();
  return {
    set(id, text, tone = 'ok') {
      let chip = chips.get(id);
      if (!chip) {
        chip = document.createElement('div');
        chips.set(id, chip);
        body.append(chip);
      }
      chip.className = `dx-chip dx-${tone}`;
      chip.textContent = text;
    },
    clear() {
      chips.clear();
      body.replaceChildren();
    },
  };
}

export interface ObjectDemo {
  stage: Stage;
  say: Caption;
  trees: Tree[];
  log: Log;
  /** A step: sets the caption, then runs `fn`. */
  step(label: string, text: string, code: string, fn: () => unknown, hold?: number): Step;
  /** Card loop and full-view buttons; `reset` runs before the loop restarts, on start and from the Reset button. */
  run(steps: readonly Step[], reset: () => unknown): void;
}

export interface ObjectDemoOptions {
  /** One tree panel per title. */
  trees?: readonly string[];
  /** Adds an event log column after the trees. */
  log?: boolean;
  hint?: string;
  height?: number;
}

/** Scaffold for examples about plain objects and functions, with no database. */
export function objectDemo(el: HTMLElement, ctx: MountContext, o: ObjectDemoOptions): ObjectDemo {
  const stage = createStage(el, ctx, { hint: o.hint ?? 'Press the steps in order. Reset starts over.', height: o.height });
  const say = caption(stage.root);
  const titles = o.trees ?? [];
  const cols = columns(stage.root, ...titles.map(() => 1), ...(o.log ? [1] : []));
  const trees = titles.map((t, i) => treeView(cols[i]!, t));
  const log = eventLog(o.log ? cols[titles.length]! : document.createElement('div'));
  return {
    stage,
    say,
    trees,
    log,
    step: (label, text, code, fn, hold) => ({
      label,
      hold,
      run: async () => {
        say.set(text, code);
        await fn();
      },
    }),
    run(steps, reset) {
      const clean = async (): Promise<void> => {
        log.clear();
        for (const t of trees) t.clear();
        await reset();
      };
      tour(stage, steps, {
        setup: clean,
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

export interface TabDemo {
  stage: Stage;
  say: Caption;
  log: Log;
  board: Board;
  /** The database name every tab shares. */
  name: string;
  /** Makes a connection called `label` (a pretend browser tab) at schema version `version`; not opened yet. */
  tab(label: string, version: number, stores: Record<string, string | null>, options?: DexieOptions): Dexie;
  /** The current connection called `label`. */
  get(label: string): Dexie;
  /** Refreshes every chip: version and open or closed. */
  status(): void;
  /** Closes every tab, deletes the database, clears the board. */
  wipe(): Promise<void>;
  step(label: string, text: string, code: string, fn: () => unknown, hold?: number): Step;
  run(steps: readonly Step[]): void;
}

/** Scaffold for examples where several Dexie instances (tabs) share one database name. */
export function tabDemo(el: HTMLElement, ctx: MountContext, label: string, o: { hint?: string; height?: number } = {}): TabDemo {
  const stage = createStage(el, ctx, { hint: o.hint ?? 'Press the steps in order. Reset starts over.', height: o.height });
  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 2, 3);
  const b = board(left!);
  const log = eventLog(right!);
  const name = stage.dbName(label);
  const tabs = new Map<string, Dexie>();
  const closeAll = (): void => {
    for (const db of tabs.values()) db.close();
  };
  const quiet = (err: unknown): void => void console.debug('dexie-class cleanup:', err);
  stage.onDispose(() => {
    closeAll();
    Dexie.delete(name).catch(quiet);
  });
  const clean = async (): Promise<void> => {
    closeAll();
    tabs.clear();
    b.clear();
    log.clear();
    await Dexie.delete(name);
  };
  const demo: TabDemo = {
    stage,
    say,
    log,
    board: b,
    name,
    tab(tabLabel, version, stores, options) {
      const db = new Dexie(name, options);
      db.version(version).stores(stores);
      tabs.set(tabLabel, db);
      return db;
    },
    get(tabLabel) {
      const db = tabs.get(tabLabel);
      if (!db) throw new Error(`No tab called ${tabLabel}: run the earlier steps first.`);
      return db;
    },
    status() {
      for (const [id, db] of tabs) b.set(id, `${id}: v${db.verno} ${db.isOpen() ? 'open' : 'closed'}`, db.isOpen() ? 'ok' : 'bad');
    },
    wipe: clean,
    step: (l, text, code, fn, hold) => ({
      label: l,
      hold,
      run: async () => {
        say.set(text, code);
        await fn();
        demo.status();
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
  return demo;
}

/** Static helpers that exist at runtime and in the docs but not in dexie.d.ts. */
export interface DexieStatics {
  derive(child: object): { from(parent: object): { extend(members: object | ((parentProto: object) => object)): void } };
  extend<T extends object>(target: T, source: object): T;
  async<A extends unknown[], R>(generator: (...args: A) => Generator<unknown, R, unknown>): (...args: A) => Promise<R>;
  spawn<R>(generator: () => Generator<unknown, R, unknown>): Promise<R>;
}
export const dexieStatics = Dexie as unknown as DexieStatics;
