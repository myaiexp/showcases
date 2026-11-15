// 3d-force-graph stage: sized panes, card tuning, a fake pointer and full cleanup
//
// Traps found while building the gallery against 3d-force-graph 1.80.2 (add to this list):
// - `width` and `height` default to the window's size, read when the module loads, and the
//   setters apply on Kapsule's next async digest. `stage.own(graph)` sets both and also sizes
//   the renderer, composer and camera at once, so no frame is drawn window-sized.
// - `new ForceGraph3D(el)` empties `el` (`innerHTML = ''`) and builds its own container
//   inside, so every graph needs an element of its own: one pane per graph (`panes`).
// - `_destructor()` disposes the renderer but keeps its WebGL context alive, so cards would
//   run out of contexts. `stage.own()` also calls `renderer.forceContextLoss()` on dispose.
// - three-render-objects writes the last created scene to the page-wide `window.scene`;
//   `stage.own()` clears it again on dispose when it is still this graph's scene.
// - Pointer interaction raycasts the scene every frame. Cards have no pointer, so
//   `stage.own()` switches it off there and `stage.ghost(graph)` switches it back on.
// - Node drag (DragControls) is set up when a data update finishes, and only while pointer
//   interaction is on: in a card call `stage.ghost(graph)` in the same synchronous mount as
//   `graphData`, before the async digest runs, or drags do nothing.
// - Hover and click are read from pointer events on `.scene-container`; the camera controls and
//   DragControls listen on the canvas. `stage.ghost()` sends non-bubbling events to the
//   container only, so a card's fake pointer never moves the camera or reaches other cards.
// - DragControls keeps the dragged object in module state, shared by the page, so fake drags
//   queue page-wide (`ghost.drag()`), with the camera controls off while one runs.
// - The camera starts at z = ∛n × 170 (n nodes) when data arrives, made for a full window: in a
//   200 px card, `zoomToFit` once the layout has settled (`onEngineStop`) or after `warmupTicks`.
// - `new ForceGraph3D()` takes no type arguments (the generics sit on the interface): type the
//   data with a cast, `new ForceGraph3D(el) as ForceGraph3DInstance<Node, Link>`.
// - `cameraPosition()` in a frame loop ends a running `zoomToFit` tween (it jumps to the tween's
//   end first, then the loop's own position wins), so an orbiting card that also fits would keep
//   the library's 1000-unit start distance. `shared/camera.ts` `spin()` fits at once, then sways.
// - `zoomToFit` reads each object's `matrixWorld`, which only a render updates: right after nodes
//   or links were rebuilt (a prop change) it measures a bbox at the origin and zooms in on nothing.
//   Call `graph.scene().updateMatrixWorld(true)` first (`spin().fit()` does).
// - `linkDirectionalParticleOffset` is read once per particle, when it first moves: changing it
//   later does nothing. Set `linkDirectionalParticles(0)`, then the count again on a later tick.
// - `linkDirectionalParticleThreeObject`: the cycling particles take only the returned object's
//   `geometry` and `material` and build their own Mesh (so a Sprite or a Group does not work);
//   `emitParticle` adds the returned object itself. Return plain Meshes.
// - `zoomToFit` measures geometries only: nodes that are pure CSS2D/CSS3D objects have none, so
//   nothing fits (a CSS2D label on an extended sphere does count the sphere).
// - `ngraphPhysics()` is only read when the ngraph layout is built, which a new value does not trigger
//   (only `graphData`, `nodeId`, `linkSource`, `linkTarget`, `numDimensions`, `forceEngine` and the DAG
//   props do): set `graphData(graph.graphData())` after it. Passing an object replaces every default.
// - `dagNodeFilter` changes leave the nodes it newly rejects pinned (`fy` etc. are only cleared when
//   `dagMode` changes): delete those fields yourself before setting the filter.
// - `onDagError` runs inside the data update: only record the loop there. Props set from the
//   callback trigger another update (and another report when a DAG prop is among them).
// - `enableNodeDrag` has no effect once data is loaded: the DragControls are built (or not) when a data
//   update finishes. After changing it, set `graphData(graph.graphData())` so they are rebuilt.
// - Turning `enablePointerInteraction` off stops the raycasting, so no `onNodeHover(null)` ever follows
//   a hover that was in progress: clear any hover highlight yourself.
// - `enableNavigationControls(false)` also stops the controls' `update()`, so an OrbitControls
//   `autoRotate` stops with it (the only camera motion a card can get from the controls).
// - `refresh()` rebuilds the node and link objects at the origin until the next tick, so a `zoomToFit`
//   straight after it (from an `onEngineStop` that fires again) zooms in on nothing.
// - A node dragged by `ghost.drag` ends up where it was dropped: keep card drags short, or the
//   `zoomToFit` that follows frames a long stretched link.
// - The default `dagLevelDistance` is nodes / maxDepth × a ratio: a band of ~30 units for a
//   20-node DAG, so the other forces spread it sideways and the levels barely show. Set it
//   (about 40) for small graphs.
// - The nav info footer ("Left-click: rotate, …") shows by default: cards hide it.
import type { MountContext } from '@/types.ts';
import type { PerspectiveCamera } from 'three';
import { createGhost, type AnyGraph, type Ghost } from './ghost.ts';

export interface StageOptions {
  /** Captions for several graphs side by side; one graph with no caption when left out. */
  panes?: readonly string[];
  /** One line under the graphs in the full view, such as "Drag to rotate". */
  hint?: string;
  /** Full-view pane height (default 440). */
  height?: number;
}

export interface Pane {
  /** Hand this to `new ForceGraph3D(pane.container)`. It is emptied by the constructor. */
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
  /** Call right after `new ForceGraph3D(pane.container)`: sizes it and frees it on dispose. */
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

  const panes: Pane[] = captions.map((text) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px';
    const container = document.createElement('div');
    container.style.cssText = `position:relative;width:${width}px;height:${height}px;overflow:hidden;border-radius:6px`;
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
      // Those setters apply on Kapsule's next (async) digest; until then the renderer is the
      // window's size. Size it now so no frame is drawn at the wrong size.
      graph.renderer().setSize(pane.width, pane.height);
      graph.postProcessingComposer().setSize(pane.width, pane.height);
      const camera = graph.camera() as PerspectiveCamera;
      camera.aspect = pane.width / pane.height;
      camera.updateProjectionMatrix();
      if (preview) {
        // Cards stay light: one pixel per CSS pixel, no hover raycasting, no nav footer.
        graph.renderer().setPixelRatio(1);
        graph.postProcessingComposer().setPixelRatio(1);
        graph.enablePointerInteraction(false).showNavInfo(false);
      }
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

/** Stops and frees one graph: its render loop, objects, WebGL context and DOM. */
function freeGraph(graph: AnyGraph, pane: Pane): void {
  const renderer = graph.renderer();
  const scene = graph.scene();
  try {
    graph._destructor();
  } catch (err) {
    // The context is freed below either way; say why the destructor stopped part-way.
    console.error('3d-force-graph _destructor failed', err);
    graph.pauseAnimation();
  }
  renderer.forceContextLoss();
  const w = window as unknown as { scene?: unknown };
  if (w.scene === scene) delete w.scene;
  pane.container.replaceChildren();
}
