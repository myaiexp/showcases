// Cleanup scope: remembers what an example created, deletes it in reverse order
import type { HTMLPerspectiveViewerElement } from './setup.ts';

type Deletable = { delete(...args: never[]): Promise<void> | void };

/**
 * deleting.md: tables, views and viewers hold WebAssembly memory that must be deleted by
 * hand, and a table cannot be deleted while a view still reads it. Register each object
 * right after creating it; dispose() deletes them last-created-first, so viewers go
 * before views before tables, and a derived or joined table before its sources.
 */
export function scope() {
  const stoppers: Array<() => void> = [];
  const owned: Array<() => Promise<void>> = [];
  let alive = true;
  return {
    /** Runs `tick` every `ms`; a tick that is still running is not started twice. */
    every(ms: number, tick: () => Promise<void> | void): void {
      let busy = false;
      const id = window.setInterval(() => {
        if (busy || !alive) return;
        busy = true;
        Promise.resolve()
          .then(tick)
          .catch((err: unknown) => console.warn('perspective tick', err))
          .finally(() => (busy = false));
      }, ms);
      stoppers.push(() => window.clearInterval(id));
    },
    /** Something synchronous to stop first: a listener, a timer. */
    stop(fn: () => void): void {
      stoppers.push(fn);
    },
    /** Marks a table, view or client-side object for delete() at dispose time. */
    own<T extends Deletable>(obj: T): T {
      owned.push(async () => {
        await (obj.delete as () => Promise<void> | void)();
      });
      return obj;
    },
    /** A viewer is deleted, then removed from the page. */
    ownViewer(viewer: HTMLPerspectiveViewerElement): HTMLPerspectiveViewerElement {
      owned.push(async () => {
        await viewer.delete();
        viewer.remove();
      });
      return viewer;
    },
    /** Anything else that needs an async step at the end, such as terminating a Client. */
    later(fn: () => Promise<void> | void): void {
      owned.push(async () => {
        await fn();
      });
    },
    /** True until dispose(): async callbacks check it before touching the page. */
    get alive(): boolean {
      return alive;
    },
    dispose(): () => void {
      return () => {
        alive = false;
        for (const s of stoppers) s();
        void (async () => {
          for (const f of owned.reverse()) {
            try {
              await f();
            } catch (err) {
              console.warn('perspective cleanup', err);
            }
          }
        })();
      };
    },
  };
}

/** Pretty-prints a result for an output box: JSON, with ArrayBuffers shown by size. */
export function show(value: unknown, max = 1800): string {
  const text = JSON.stringify(
    value,
    (_k, v: unknown) => {
      if (v instanceof ArrayBuffer) return `ArrayBuffer(${v.byteLength} bytes)`;
      if (v instanceof Uint8Array) return `Uint8Array(${v.byteLength} bytes)`;
      return v;
    },
    1,
  );
  // Pull arrays of plain values onto one line, so a column is one row of text.
  const out = (text ?? String(value)).replace(/\[\s*([^[\]{}]*?)\s*\]/g, (_m, inner: string) => `[${inner.replace(/\s*\n\s*/g, ' ')}]`);
  return out.length > max ? `${out.slice(0, max)} ...` : out;
}
