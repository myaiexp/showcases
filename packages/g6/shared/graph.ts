// Shared G6 mount: sized graph box, control bar, card timers, resize and teardown
import type { Graph } from '@antv/g6';
import type { Cleanup, MountContext } from '@/types.ts';
import { controlBar } from './controls.ts';
import './graph.css';

/**
 * G6 5.1.1 traps found while building this gallery, for whoever adds the next example:
 * - Every example passes theme: 'dark'. The dark theme paints the canvas #000 and sets
 *   label and stroke colours for it; without it labels are near-black on the dark page.
 * - graph.render(), draw(), layout() and the viewport calls are async. A card timer that
 *   calls them can still be running when the card unmounts, and G6 throws on a destroyed
 *   graph: run them through stage.every(), which drops errors once the mount is gone.
 * - G6 writes into the data objects it is given (layout positions land in style.x/y), so
 *   dataset() hands out a fresh copy on every call.
 * - Without width and height G6 reads the container's size once, at construction: the box
 *   is sized before setup runs, and stage.keep() resizes the graph with the full view.
 *
 * Every example writes its whole `new Graph({...})` spec in its own main.ts; this file only
 * sizes the box, repeats card steps, resizes and destroys what the example made.
 */

export interface Stage {
  /** The graph's container: 200px tall in a card, `height` tall in the full view. */
  container: HTMLDivElement;
  preview: boolean;
  /** Full view only: the row above the graph for controls (null in a card). */
  bar: HTMLDivElement | null;
  signal: AbortSignal;
  readonly alive: boolean;
  /** Registers a graph: resized with the full view, destroyed on unmount. */
  keep<G extends Graph>(graph: G): G;
  /**
   * Calls `fn` every `ms` while mounted; errors after unmount are dropped. A card that
   * registers no timer (every or after) replays a wipe-in reveal instead.
   */
  every(ms: number, fn: (i: number) => unknown): void;
  /** Calls `fn` once after `ms` unless the mount is gone by then. */
  after(ms: number, fn: () => unknown): void;
  /** Runs `fn` on unmount, before kept graphs are destroyed. */
  onCleanup(fn: () => void): void;
}

export interface StageOptions {
  /** Full-view height in px (default 460). Cards are always 200. */
  height?: number;
}

/** Builds the stage, runs `setup`, and returns the cleanup that undoes both. */
export async function mountGraph(
  el: HTMLElement,
  ctx: MountContext,
  setup: (stage: Stage) => unknown,
  options: StageOptions = {},
): Promise<Cleanup> {
  const { preview, signal } = ctx;
  const bar = preview ? null : controlBar(el);
  const container = document.createElement('div');
  container.className = preview ? 'g6-stage g6-stage-card' : 'g6-stage';
  container.style.height = `${preview ? 200 : (options.height ?? 460)}px`;
  el.append(container);

  let alive = true;
  const graphs: Graph[] = [];
  const cleanups: (() => void)[] = [];
  const timers: ReturnType<typeof setTimeout>[] = [];
  const quiet = (err: unknown): void => {
    if (alive) console.error(err);
  };
  const guard = (fn: () => unknown): void => {
    if (!alive) return;
    try {
      const out = fn();
      if (out instanceof Promise) out.catch(quiet);
    } catch (err) {
      quiet(err);
    }
  };

  const stage: Stage = {
    container,
    preview,
    bar,
    signal,
    get alive() {
      return alive;
    },
    keep(graph) {
      graphs.push(graph);
      return graph;
    },
    every(ms, fn) {
      let i = 0;
      timers.push(setInterval(() => guard(() => fn(++i)), ms));
    },
    after(ms, fn) {
      timers.push(setTimeout(() => guard(fn), ms));
    },
    onCleanup(fn) {
      cleanups.push(fn);
    },
  };

  let ro: ResizeObserver | null = null;
  if (!preview) {
    let frame = 0;
    let last = container.clientWidth;
    ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const w = container.clientWidth;
        if (!alive || Math.abs(w - last) < 8) return;
        last = w;
        for (const g of graphs) guard(() => g.resize(w, container.clientHeight));
      });
    });
    ro.observe(container);
  }

  const cleanup = (): void => {
    alive = false;
    ro?.disconnect();
    for (const t of timers) clearInterval(t);
    for (const fn of cleanups.reverse()) {
      try {
        fn();
      } catch (err) {
        console.error(err);
      }
    }
    for (const g of graphs) {
      try {
        if (!g.destroyed) g.destroy();
      } catch (err) {
        console.error(err);
      }
    }
    container.remove();
    bar?.remove();
  };

  try {
    await setup(stage);
  } catch (err) {
    cleanup();
    throw err;
  }
  // A card whose example started no timer of its own replays a reveal, so it never sits still.
  if (preview && timers.length === 0) {
    reveal(container);
    timers.push(setInterval(() => reveal(container), 4200));
  }
  return cleanup;
}

/** Wipes the graph in from left to right with element.animate (no CSS keyframes). */
function reveal(box: HTMLElement): void {
  box.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], {
    duration: 1400,
    easing: 'cubic-bezier(.3,.7,.3,1)',
  });
}
