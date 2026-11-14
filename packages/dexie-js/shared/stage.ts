// Shared Dexie.js stage: scene box, per-mount databases, a looping card script
//
// Traps found while building the gallery (add to this list):
// - IndexedDB is per origin, so every card and full view on the page shares one database
//   namespace, and the same example can be mounted twice (card + full view). Name databases
//   with `stage.dbName('friends')`, which adds a per-mount suffix, and hand the instance to
//   `stage.own(db)`, which deletes it on cleanup so the origin does not fill with leftovers.
//   An example about persistence across reloads passes `{ keep: true }` and a fixed name.
// - A fixed name means every mount talks to the same database: two connections opening it
//   at different versions block each other (on('versionchange') / on('blocked')). Only use
//   fixed names in full views, where one mount runs at a time.
// - Work in flight when the stage disposes rejects (DatabaseClosedError, or the STOPPED
//   sentinel from `wait`). `play` and `action` swallow anything thrown after dispose and
//   show anything else in the scene, so a script never has to catch for cleanup's sake.
// - Writes from an example and the table view's own liveQuery race: when a step must show
//   the table's new state before the next caption, `await view.refresh()` first.
// - Cards have no pointer and run no network: every step a card shows is scripted in `play`.
// - Collection.desc() is documented but missing from dexie's published type definitions; reverse()
//   is typed and does the same (shared/collection-kit.ts `desc` casts for the one example about it).
// - Collection.modify() with a function that throws aborts the whole call; a ModifyError (failures,
//   failedKeys, successCount) needs a write that fails, e.g. a unique-index clash.
// - Table.hook('reading') also reshapes what the table view's own liveQuery reads; keep hook-added
//   fields out of the grid columns.
// - Table.defineClass() exists at runtime but not in dexie.d.ts (cast to call it). mapToClass() is
//   permanent for that table, so an example that compares mapped and plain rows uses two tables.
// - With '++id', clear() does not reset the counter: ids keep growing across card loops.
// - A table with an outbound key (stores ', name') has no key path, so the grid cannot read the key
//   from the row: give tableView a `read` that pairs keys and values (shared/demo.ts `withKeys`).
// - IndexedDB booleans are not indexable: store 0/1 in a field you want to query with where().
// - dexie 4.4.7: a keyless add() (a '++id' table) that fails entirely leaves a null in the live
//   query cache and every later live query on that table throws. `own()` installs the scrubbing
//   middleware in shared/cache-fix.ts; a Dexie instance not passed to own() lacks it.
// - Hooks and middleware (shared/hook-kit.ts): the grid's own liveQuery reads through them, so a spy
//   or counter would log the grid's reads too. `plainDemo` points the grid at a second, plain
//   connection (what is really stored) and `d.t` stays the hooked table. Gate a spy with a flag
//   that is only true inside a step, since reseeding also passes through.
// - db.use() middleware joins the stack when the database opens: register it in the same tick as
//   demo() (before any await). db.unuse() changes nothing for the open database until close()+open().
// - A middleware must not wait on a timer (or any non-IndexedDB promise) before forwarding a
//   request: the IndexedDB transaction commits meanwhile. Copy rows it rewrites (`{ ...row }`):
//   live queries hand out shared cached objects, and add()/put() values are the caller's own.
// - A hook's `trans.table('x')` throws NotFoundError unless 'x' is in the transaction's scope, so a
//   deleting hook that writes an audit row needs `db.transaction('rw', t, audit, ...)`.
// - hook('creating') returning a value uses it as the key whenever the row came without one (also on
//   '++id' tables): hook bodies that only stamp fields use a block body so they return undefined.
// - A grid (liveQuery) over a database that gets closed or deleted errors into `stage.fail`: hide
//   or unsubscribe it first (shared/era.ts `hide()`).
// - Rollbacks never show in the grid: it only sees committed data. Narrate the values seen inside
//   a transaction in an event log instead.
// - `blocked` only fires when a versionchange handler returns false; otherwise Dexie's default
//   handler closes the old connection (and console.warns). Handlers run newest-subscribed first.
// - `db.vip(fn)` from the docs is gone in v4 (db.vip is a proxy instance): use `Dexie.vip(fn)`.
// - Missing from dexie.d.ts though present at runtime: Collection.desc, Table.defineClass,
//   Dexie.derive/extend/async/spawn/Events, Dexie.Promise.PSD (shared/class-kit.ts, zone-kit.ts cast).
// - Dexie.debug has no visible effect in 4.4.7 (console.debug and devtools async stacks only).
// - Dexie never fires `unhandledrejection` itself in 4.4.7; only native promises reach it.
// - getDatabaseNames() lists the whole origin: filter it to this mount's `stage.dbName` prefix.
// - Dexie events registered with db.on(...) belong to that Dexie instance only; page-wide
//   ones (Dexie.on('storagemutated'), Dexie.debug, Dexie.addons, Promise.on.error) must be
//   restored or unsubscribed on dispose, because the whole gallery shares them.
import type { Dexie } from 'dexie';
import type { MountContext } from '@/types.ts';
import { scrubNullOptimisticOps } from './cache-fix.ts';
import './dexie.css';

/** Rejection reason of `wait` once the stage is gone; never shown. */
export const STOPPED = Symbol('stopped');

export interface StageOptions {
  /** Height of the full view's scene in px. Cards are always 200px tall. */
  height?: number;
  /** One line under the scene in the full view, such as "Add a few friends". */
  hint?: string;
}

export interface Stage {
  /** The scene box: a flex column with a small gap. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar under the scene, or null in a card. */
  bar: HTMLElement | null;
  readonly disposed: boolean;
  /** A database name unique to this mount, e.g. `showcase-dexie-friends-k3x9`. */
  dbName(label: string): string;
  /** Deletes `db` on dispose (or only closes it with `keep: true`). */
  own<T extends Dexie>(db: T, opts?: { keep?: boolean }): T;
  /** Runs `script` over and over until dispose. */
  play(script: (wait: (ms: number) => Promise<void>) => Promise<void>): void;
  /** Resolves after `ms`; rejects with STOPPED once the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Wraps an async handler (a button's click) so errors show in the scene, not the console. */
  action(fn: () => unknown): () => void;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /** Shows an unexpected error over the scene. */
  fail(err: unknown): void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const outer = document.createElement('div');
  outer.className = 'dx-outer';
  el.append(outer);

  const root = document.createElement('div');
  root.className = preview ? 'dx-scene dx-card' : 'dx-scene';
  root.style.height = `${preview ? 200 : (opts.height ?? 360)}px`;
  outer.append(root);

  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'dx-hint';
    hint.textContent = opts.hint;
    outer.append(hint);
  }
  let bar: HTMLElement | null = null;
  if (!preview) {
    bar = document.createElement('div');
    bar.className = 'dx-bar';
    outer.append(bar);
  }

  const timers = new Set<number>();
  const waiters = new Set<() => void>();
  const disposers: (() => void)[] = [];
  const dbs: { db: Dexie; keep: boolean }[] = [];
  const suffix = Math.random().toString(36).slice(2, 7);
  let disposed = false;
  let banner: HTMLElement | null = null;

  const wait = (ms: number): Promise<void> =>
    new Promise((resolve, reject) => {
      if (disposed) return reject(STOPPED);
      const stop = (): void => reject(STOPPED);
      waiters.add(stop);
      const t = window.setTimeout(() => {
        timers.delete(t);
        waiters.delete(stop);
        resolve();
      }, ms);
      timers.add(t);
    });

  const fail = (err: unknown): void => {
    if (disposed || err === STOPPED) return;
    console.error(err);
    banner ??= Object.assign(document.createElement('div'), { className: 'dx-fail' });
    banner.textContent = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    root.append(banner);
  };

  const stage: Stage = {
    root,
    preview,
    bar,
    get disposed() {
      return disposed;
    },
    dbName(label) {
      return `showcase-dexie-${label}-${suffix}`;
    },
    own(db, o = {}) {
      if (disposed) {
        if (o.keep) db.close();
        else db.delete().catch((err: unknown) => console.warn('dexie cleanup:', err));
        return db;
      }
      dbs.push({ db, keep: o.keep ?? false });
      // A middleware can only join before the database opens; the bug it fixes needs a live query.
      if (!db.isOpen()) scrubNullOptimisticOps(db);
      return db;
    },
    play(script) {
      const run = async (): Promise<void> => {
        while (!disposed) await script(wait);
      };
      run().catch(fail);
    },
    wait,
    action(fn) {
      return () => {
        try {
          void Promise.resolve(fn()).catch(fail);
        } catch (err) {
          fail(err);
        }
      };
    },
    // An async mount can resume after its card was disposed: nothing new may start then.
    every(ms, fn) {
      if (disposed) return;
      timers.add(window.setInterval(fn, ms));
    },
    after(ms, fn) {
      if (disposed) return;
      const t = window.setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    },
    fail,
    onDispose(fn) {
      if (disposed) return void fn();
      disposers.push(fn);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const t of timers) {
        clearTimeout(t);
        clearInterval(t);
      }
      for (const stop of waiters) stop();
      for (const fn of disposers.splice(0).reverse()) {
        try {
          fn();
        } catch (err) {
          console.error(err);
        }
      }
      for (const { db, keep } of dbs.splice(0)) {
        if (keep) db.close();
        else db.delete().catch((err: unknown) => console.warn('dexie cleanup:', err));
      }
      outer.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}
