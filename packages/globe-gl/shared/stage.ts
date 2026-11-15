// globe.gl stage: sized panes, card tuning, a fake pointer and full cleanup
//
// Traps found while building the gallery against globe.gl 2.46.2 / three-globe 2.45.6 (add to this list):
// - `width` and `height` default to the window's size, read when the module loads, and the
//   setters apply on Kapsule's next async digest. `stage.own(globe)` sets both and also sizes
//   the renderer, composer and camera at once, so no frame is drawn window-sized.
// - `new Globe(el)` empties `el` (`innerHTML = ''`) and builds its own container inside, so every
//   globe needs an element of its own: one pane per globe (`panes` option).
// - `_destructor()` disposes the renderer but keeps its WebGL context alive, so cards would run
//   out of contexts. `stage.own()` also calls `renderer.forceContextLoss()` on dispose.
// - three-render-objects writes the last created scene to the page-wide `window.scene`;
//   `stage.own()` clears it again on dispose when it is still this globe's scene.
// - With `waitForGlobeReady` (the default) nothing is drawn until the globe image has loaded,
//   and `onGlobeReady` fires after that. With no `globeImageUrl` it is ready at once.
// - Images load through Three's TextureLoader, which also takes data: and blob: URLs: cards
//   never fetch, so every image comes from `shared/textures.ts`, drawn in code.
// - The heatmaps layer computes its density through a new WebGPURenderer per update when
//   `navigator.gpu` exists, and on the CPU (a console warning per update) otherwise. With
//   `navigator.gpu` but no adapter it returns all-zero density: blank heatmaps. Await
//   `heatmapBackend()` (`shared/gpu.ts`) before the first `heatmapsData`. The CPU path costs
//   points × sphere vertices, and the sphere's resolution is bandwidth / 3.5 degrees: keep
//   card heatmaps small, their bandwidth at 4 or more and their updates rare. A heatmap
//   transition rebuilds the surface every frame; cards skip it unless it is the subject.
// - `heatmapColorFn` is an accessor of the heatmap datum that returns the interpolator:
//   `() => (t) => colour`, not `(t) => colour`.
// - Hex bin objects are `{ h3Idx, points, sumWeight }` in 2.45.6: the `center` the README and
//   the typings promise is missing. Average the points for a centre; key hexagons by `h3Idx`.
// - h3-js throws ("operation failed (code 1)") on North Korea's 1:110m outline at hexed-polygon
//   resolutions 1 to 3; world-wide hexed examples leave that one country out.
// - Layers tag each datum with its Three.js object (`__threeObjLabel`, `__threeObjHtml`, …), so
//   two globes must not share datum objects: copy the data per pane.
// - `polygonGeoJsonGeometry`'s typings say `coordinates: number[]`; nested GeoJSON needs a cast.
// - Pointer interaction raycasts the whole scene every 50 ms. Cards have no pointer, so
//   `stage.own()` switches it off there; `stage.ghost(globe)` switches it back on.
// - Hover and click are read from pointer events on the globe's own `.scene-container`;
//   OrbitControls listens on the canvas. `stage.ghost()` sends non-bubbling events to the
//   container only, so a card's fake pointer never drags the camera or reaches other cards.
// - `pointOfView()` with no argument is the getter: `pointOfView({})` returns, not chains.
// - Colour and stroke accessors are typed as unions, so a bare `(d) =>` loses its parameter type
//   (TS7006) once the chain also refers to `globe` inside a callback: write `(d: object) =>`.
// - Arcs are cubic Béziers with control points above `arcAltitude`, so the curve's middle is
//   not at that altitude: aim a card's fake pointer with `ghost.arc()`.
// - The layer accessors are read again only when a layer prop is set: change an accessor's
//   inputs (a hover state, a slider) and then set the accessor again to repaint.
import type { MountContext } from '@/types.ts';
import type { GlobeInstance } from 'globe.gl';
import type { PerspectiveCamera } from 'three';
import { createGhost, type Ghost } from './ghost.ts';

export interface StageOptions {
  /** Captions for several globes side by side; one globe with no caption when left out. */
  panes?: readonly string[];
  /** One line under the globes in the full view, such as "Drag to spin". */
  hint?: string;
  /** Full-view pane height (default 440). */
  height?: number;
}

export interface Pane {
  /** Hand this to `new Globe(pane.container)`. It is emptied by the constructor. */
  container: HTMLDivElement;
  /** CSS pixels; `stage.own()` applies them as the globe's `width` and `height`. */
  width: number;
  height: number;
  caption: HTMLDivElement | null;
}

export interface Stage extends Pane {
  panes: Pane[];
  preview: boolean;
  /** Control bar under the globes, or null in a card. */
  bar: HTMLElement | null;
  /** The outer column: globes, then hint, then bar. Append extra full-view panels here. */
  box: HTMLDivElement;
  /** Call right after `new Globe(pane.container)`: sizes it and frees it on dispose. */
  own<G extends GlobeInstance>(globe: G, pane?: Pane): G;
  /** Destroys an owned globe now and empties its pane, for examples that rebuild one. */
  release(globe: GlobeInstance): void;
  /** A fake pointer for a card: sends hover and click events to this globe only. */
  ghost(globe: GlobeInstance): Ghost;
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
  const owned = new Map<GlobeInstance, () => void>();
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
    own(globe, pane = panes[0]!) {
      globe.width(pane.width).height(pane.height);
      // Those setters apply on Kapsule's next (async) digest; until then the renderer is the
      // window's size. Size it now so no frame is drawn at the wrong size.
      globe.renderer().setSize(pane.width, pane.height);
      globe.postProcessingComposer().setSize(pane.width, pane.height);
      const camera = globe.camera() as PerspectiveCamera;
      camera.aspect = pane.width / pane.height;
      camera.updateProjectionMatrix();
      if (preview) {
        // Cards stay light: one pixel per CSS pixel and no hover raycasting.
        globe.renderer().setPixelRatio(1);
        globe.postProcessingComposer().setPixelRatio(1);
        globe.enablePointerInteraction(false);
      }
      // A mount that awaited (a texture) can get here after unmount: free it at once.
      if (disposed) queueMicrotask(() => freeGlobe(globe, pane));
      else owned.set(globe, () => freeGlobe(globe, pane));
      return globe;
    },
    release(globe) {
      const free = owned.get(globe);
      owned.delete(globe);
      free?.();
    },
    ghost(globe) {
      globe.enablePointerInteraction(true);
      const pane = panes.find((p) => p.container.contains(globe.renderer().domElement)) ?? panes[0]!;
      return createGhost(globe, pane.container);
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

/** Stops and frees one globe: its render loop, layers, WebGL context and DOM. */
function freeGlobe(globe: GlobeInstance, pane: Pane): void {
  const renderer = globe.renderer();
  const scene = globe.scene();
  try {
    globe._destructor();
  } catch (err) {
    // The context is freed below either way; say why the destructor stopped part-way.
    console.error('globe.gl _destructor failed', err);
    globe.pauseAnimation();
  }
  renderer.forceContextLoss();
  const w = window as unknown as { scene?: unknown };
  if (w.scene === scene) delete w.scene;
  pane.container.replaceChildren();
}
