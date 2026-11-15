// force-graph stage: sized panes on paper, card tuning, fake pointer, cleanup
//
// Traps found while building the gallery against force-graph 1.52.0 (add to this list):
// - `width` and `height` default to the window's size, read when the module loads.
//   `stage.own(graph)` sets both to the pane's size right after construction.
// - `new ForceGraph(el)` empties `el` (`innerHTML = ''`) and builds `.force-graph-container`
//   inside it, so every graph needs an element of its own: one pane per graph (`panes`).
// - The default colours are made for a white page: nodes `rgba(31,120,180,0.92)`, links
//   `rgba(0,0,0,0.15)`, arrows and particles `rgba(0,0,0,0.28)`, and the canvas is
//   transparent. Panes are light paper (`PAPER`) so the documented defaults read as designed;
//   an example that sets a dark `backgroundColor` also sets light link colours.
// - `_destructor()` only pauses the render loop and empties the data. `stage.own()` also
//   empties the pane, which drops the canvases, tooltip and their listeners.
// - With `autoPauseRedraw` (the default) nothing is redrawn once the engine stops (after
//   `cooldownTime`, 15 s), except links carrying particles. A card that should keep moving
//   reheats (`d3ReheatSimulation`), changes data, or animates the view (`centerAt`, `zoom`).
// - The first zoom is set from the node count (4 / ∛n) when data arrives, made for a
//   full-window canvas. In a 200 px card call `zoomToFit` once the layout has settled
//   (`onEngineStop`, or after `warmupTicks`).
// - Hover is looked up on a hidden canvas painted in index colours, repainted at most every
//   800 ms. A node that just moved is found under its old position until the next repaint.
// - The tooltip (float-tooltip) shows on `mouseover`/`mousemove` and hides on `mouseout` of
//   the container, while hover and clicks come from pointer events there: the ghost sends both.
// - Clicks fire on `pointerup` after a frame, for `hoverObj` as set by the last frame, and
//   only when the matching `on…Click` is set. A pointer move with the button pressed counts as
//   a drag and swallows the click, but only when `onBackgroundClick` is set.
// - d3-drag starts on `mousedown` on the canvas and listens for moves on `window` under one
//   fixed name, and d3-zoom pans on the same window moves, so two fake gestures at once on a page
//   move each other: `ghost.drag()` and `ghost.pan()` queue page-wide. Never dispatch them by hand.
// - The node drag subject is looked up on the hidden canvas from the last pointer position,
//   so a drag needs a pointer move over the node first (`ghost.drag()` does that).
// - `nodeAutoColorBy` / `linkAutoColorBy` write the colour into the attribute named by `nodeColor` / `linkColor`,
//   and only when that prop is still a string (the default `'color'`): give `nodeColor` a function and it does nothing.
// - Every `graphData()` call copies `link[linkSource]` to `link.source` (and the target likewise) before
//   resolving ids, so custom `linkSource('from')` links keep `from`/`to` and gain `source`/`target` node objects.
// - `width()` / `height()` clear the canvas (and keep the view centred); it is redrawn on the next
//   frame. Resizing every frame, such as from a ResizeObserver during a drag, paints blank frames:
//   throttle it, or change sizes in steps.
// - `dagMode` keeps the old axis fixed when you switch between `td`/`bu` and `lr`/`rl` (it only clears the axis the new
//   mode owns), so nodes end up pinned on both axes. Call `dagMode(null)` first, which unfixes every node.
// - The default `dagLevelDistance` is `nodes / depth × ratio`: a small DAG comes out as a thin band; set `dagLevelDistance` (about 40 to 50) for
//   anything under a hundred nodes. (`radialout`/`radialin` use 0.7 of it.)
// - Right-click callbacks fire on `pointerup` with `button` 2 (the ghost's `click(2)`); a `contextmenu` listener only
//   cancels the browser's menu, and only when a right-click handler is set.
// - `showPointerCursor` only matters for objects with a matching `on…Click` handler: the canvas gets a `clickable` class.
// - `nodeCanvasObject` draws in graph coordinates under the zoom transform: divide pixel sizes
//   (font size, line width) by `globalScale` to keep them constant on screen.
import type { MountContext } from '@/types.ts';
import type { ForceGraphGeneric } from 'force-graph';
import { createGhost, type Ghost } from './ghost.ts';

type AnyGraph = ForceGraphGeneric<any, any, any>;

/** The panes' background: the library's defaults are drawn for a light page. */
export const PAPER = '#f6f3ec';

export interface StageOptions {
  /** Captions for several graphs side by side; one graph with no caption when left out. */
  panes?: readonly string[];
  /** One line under the graphs in the full view, such as "Drag a node". */
  hint?: string;
  /** Full-view pane height (default 440). */
  height?: number;
  /** Pane background (default `PAPER`). Pass 'transparent' when the example sets `backgroundColor`. */
  paper?: string;
}

export interface Pane {
  /** Hand this to `new ForceGraph(pane.container)`. It is emptied by the constructor. */
  container: HTMLDivElement;
  /** CSS pixels; `stage.own()` applies them as the graph's `width` and `height`. */
  width: number;
  height: number;
  caption: HTMLDivElement | null;
}

export interface Stage extends Pane {
  panes: Pane[];
  preview: boolean;
  /** Control bar under the graphs, or null in a card. */
  bar: HTMLElement | null;
  /** The outer column: graphs, then hint, then bar. Append extra full-view panels here. */
  box: HTMLDivElement;
  /** Call right after `new ForceGraph(pane.container)`: sizes it and frees it on dispose. */
  own<G extends AnyGraph>(graph: G, pane?: Pane): G;
  /** Destroys an owned graph now and empties its pane, for examples that rebuild one. */
  release(graph: AnyGraph): void;
  /** A fake pointer for a card: hover, click and drag events sent to this graph only. */
  ghost(graph: AnyGraph): Ghost;
  /** Calls `frame(dt, t)` every animation frame (seconds) until dispose. */
  loop(frame: (dt: number, t: number) => void): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  onDispose(fn: () => void): void;
  readonly disposed: boolean;
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;width:100%';
  el.append(box);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;justify-content:center;align-items:flex-start;gap:12px;width:100%';
  box.append(row);

  const captions = opts.panes ?? [null];
  const n = captions.length;
  const avail = el.clientWidth || (preview ? 280 : 720);
  const capH = captions[0] === null ? 0 : preview ? 16 : 22;
  const height = Math.floor((preview ? 200 : (opts.height ?? 440)) - capH);
  const width = Math.floor(Math.min(preview ? avail : 900, (avail - 12 * (n - 1)) / n));
  const paper = opts.paper ?? PAPER;

  const panes: Pane[] = captions.map((text) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px';
    const container = document.createElement('div');
    container.style.cssText = `position:relative;width:${width}px;height:${height}px;overflow:hidden;
      border-radius:6px;background:${paper}`;
    cell.append(container);
    let caption: HTMLDivElement | null = null;
    if (text !== null) {
      caption = document.createElement('div');
      caption.style.cssText = `font:${preview ? 11 : 13}px/1.3 ui-monospace,monospace;color:var(--fg-2);
        text-align:center;max-width:${width}px;overflow-wrap:anywhere`;
      caption.textContent = text;
      cell.append(caption);
    }
    row.append(cell);
    return { container, width, height, caption };
  });

  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.style.cssText = 'font-size:13px;color:var(--fg-3);text-align:center;max-width:680px';
    hint.textContent = opts.hint;
    box.append(hint);
  }
  let bar: HTMLElement | null = null;
  if (!preview) {
    bar = document.createElement('div');
    bar.style.cssText =
      'display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 16px;max-width:720px';
    box.append(bar);
  }

  let raf = 0;
  const timers: number[] = [];
  const disposers: (() => void)[] = [];
  const owned = new Map<AnyGraph, () => void>();
  const paneOf = new Map<AnyGraph, Pane>();
  let disposed = false;

  const stage: Stage = {
    ...panes[0]!,
    panes,
    preview,
    bar,
    box,
    get disposed() {
      return disposed;
    },
    own(graph, pane = panes[0]!) {
      graph.width(pane.width).height(pane.height);
      // Cards have no pointer: skip the per-frame hover lookup until a ghost asks for it.
      if (preview) graph.enablePointerInteraction(false);
      // A mount that awaited can get here after unmount: free it at once.
      if (disposed) queueMicrotask(() => freeGraph(graph, pane));
      else owned.set(graph, () => freeGraph(graph, pane));
      paneOf.set(graph, pane);
      return graph;
    },
    release(graph) {
      const free = owned.get(graph);
      owned.delete(graph);
      free?.();
    },
    ghost(graph) {
      graph.enablePointerInteraction(true);
      const pane = paneOf.get(graph) ?? panes[0]!;
      return createGhost(graph, pane.container, () => !disposed && owned.has(graph));
    },
    loop(frame) {
      let last = performance.now();
      const start = last;
      const tick = (now: number): void => {
        if (disposed) return;
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        frame(dt, (now - start) / 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    },
    every(ms, fn) {
      if (!disposed) timers.push(window.setInterval(fn, ms));
    },
    after(ms, fn) {
      if (!disposed) timers.push(window.setTimeout(fn, ms));
    },
    onDispose(fn) {
      if (disposed) fn();
      else disposers.push(fn);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      for (const t of timers) {
        clearInterval(t);
        clearTimeout(t);
      }
      for (const fn of disposers.splice(0)) fn();
      for (const free of owned.values()) free();
      owned.clear();
      box.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}

/** Stops and frees one graph: its render loop, tweens, data and DOM. */
function freeGraph(graph: AnyGraph, pane: Pane): void {
  try {
    graph._destructor();
  } catch (err) {
    // The DOM is dropped below either way; say why the destructor stopped part-way.
    console.error('force-graph _destructor failed', err);
    graph.pauseAnimation();
  }
  pane.container.replaceChildren();
}
