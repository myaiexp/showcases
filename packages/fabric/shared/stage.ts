// Fabric.js stage: canvas panes on paper, scene fit, fake pointer, cleanup
//
// Traps found while building the gallery against fabric 7.4.0 (add to this list):
// - The guides ("Old docs", the intro parts 1-5) are written for v2-v5: a global `fabric` namespace
//   and callbacks. In v7 import names from 'fabric': fabric.Object → FabricObject, fabric.Image →
//   FabricImage, fabric.Text → FabricText, fabric.Image.filters.X → filters.X, fabric.util.x → util.x.
//   Loaders return promises: FabricImage.fromURL(url).then(...), loadSVGFromString(svg).then(...),
//   canvas.loadFromJSON(json).then(...), obj.clone().then(...). The TypeDoc API pages are v6.0.0-rc4.
// - v7 changed originX/originY defaults from left/top to center/center: `left`/`top` now place the
//   object's CENTRE. Every guide snippet assumes left/top. Either pass `originX: 'left', originY: 'top'`
//   to reproduce a guide's layout, or write the coordinates as centres; never change the defaults.
// - Page-wide state: `FabricObject.ownDefaults` (and each class's), prototypes, `classRegistry`,
//   `config`, `cache`, the filter backend (`setFilterBackend`), `runningAnimations`. An example
//   that customises defaults passes the options per object instead, or changes ownDefaults
//   synchronously around the constructor and restores them in the same tick (defaults are copied
//   into the instance at construction). Register subclasses under unique names (`showcase-…`).
// - The canvas size comes from the <canvas> element's width/height attributes, which the stage sets:
//   `new Canvas(stage.el)` needs no size. Pass `scene: [w, h]` to draw in w×h scene units at any
//   card or view size: `stage.own(canvas)` fits that scene with the viewportTransform.
// - `canvas.dispose()` is async (returns a Promise) and defers its teardown past a pending render;
//   it aborts animations whose target is the canvas or one of its objects. `util.animate` /
//   `util.animateColor` with no such `target` survive it: abort them in `stage.onDispose`.
// - A real mousedown makes fabric listen for moves and the mouseup on the document. `stage.ghost`
//   calls fabric's handlers directly instead, so a card's fake drags never hear the reader's mouse.
// - IText/Textbox editing focuses a hidden textarea appended to `document.body` (unless
//   `hiddenTextareaContainer` is set). Cards never call `enterEditing()`: it would steal focus and
//   scroll the page. Change text with `set('text', …)` or `insertChars` instead.
// - Fabric's default object fill is black and selection colours are made for a white page; panes
//   are light paper (`PAPER`, CSS only, so it never shows up in toJSON/toSVG/toDataURL).
// - `fireRightClick`, `fireMiddleClick` and `stopContextMenu` default to true in v7 (deprecated).
// - `skipTargetFind` leaves the drag-to-select marquee on: pair it with `selection: false`.
// - containsPoint() and intersectsWithObject() test the (rotated) bounding box, not the outline.
// - The canvas `centeredRotation` is OR-ed with each object's own flag (default true).
// - The object cache can clip miter joins and scaled `strokeUniform` paths: `objectCaching: false`.
// - Line's x1..y2 are not safe to set() after construction: build a new Line. Polyline fills
//   black by default (`fill: 'transparent'` for an open line); FabricImage has strokeWidth 0.
// - A <video> source has no naturalWidth: give FabricImage width/height, `objectCaching: false`,
//   and repaint every frame (`stage.loop` + requestRenderAll): fabric never sees new frames.
// - `scene` letterboxes the pane with the viewportTransform, so isOnScreen() examples skip it.
// - util.transformPath works relative to `pathOffset`: compose a translation of it in the matrix.
// - backgroundImage/overlayImage are plain properties in v7 (the guides' setBackgroundImage is gone).
// - The `shadow` option is typed as a Shadow: pass `new Shadow('green -5px -5px 3px')`, not the string.
// - The `after:render` context is untransformed: apply viewportTransform, then the object's matrix.
// - v7 animate() takes end values only (numbers, arrays, colours; one type per call): no '+=100',
//   and the guide's `from` is `startValue`. It never redraws: onChange calls requestRenderAll().
//   runningAnimations is page-wide (filter by target.canvas); its findAnimation* helpers are gone.
// - Gradient/Pattern edits in place (coords, stops, offsetX, transforms, a repainted source) need
//   `obj.dirty = true`; a changing Pattern source also `objectCaching: false`. Stops are only
//   { offset, color } (fade with rgba). Coords and transforms pivot at the object's top left.
// - Shadow.affectStroke defaults to false; use one new Shadow per object.
import { Canvas, StaticCanvas } from 'fabric';
import type { MountContext } from '@/types.ts';
import { createGhost, type Ghost } from './ghost.ts';

/** The panes' background: fabric's defaults (black fill, blue selection) are drawn for a light page. */
export const PAPER = '#f6f3ec';

type AnyCanvas = Canvas | StaticCanvas;

export interface StageOptions {
  /** Captions for several canvases side by side; one canvas with no caption when left out. */
  panes?: readonly string[];
  /** One line under the canvases in the full view, such as "Drag a corner". */
  hint?: string;
  /** Full-view pane height in CSS px (default 420). */
  height?: number;
  /** Full-view pane width cap in CSS px (default 760, shared between panes). */
  width?: number;
  /** Scene size the example draws in; `own()` fits it into the pane with the viewportTransform. */
  scene?: readonly [number, number];
  /** Pane background (default `PAPER`). */
  paper?: string;
}

export interface Pane {
  /** The <canvas> element to pass to `new Canvas(pane.el)`; its size attributes are set. */
  el: HTMLCanvasElement;
  /** The box around the canvas: the paper, and the place for overlays. */
  frame: HTMLDivElement;
  width: number;
  height: number;
  caption: HTMLDivElement | null;
}

export interface Stage extends Pane {
  panes: Pane[];
  preview: boolean;
  /** The scene size passed in options, or the pane size. */
  scene: readonly [number, number];
  /** Control bar under the canvases, or null in a card. */
  bar: HTMLElement | null;
  /** The outer column: canvases, then hint, then bar. Append extra full-view panels here. */
  box: HTMLDivElement;
  /** Call right after `new Canvas(pane.el)`: fits the scene and disposes it with the stage. */
  own<C extends AnyCanvas>(canvas: C, pane?: Pane): C;
  /** A fake pointer for a card: events go to this canvas only. */
  ghost(canvas: Canvas): Ghost;
  /** Calls `frame(dt, t)` every animation frame (seconds) until dispose. */
  loop(frame: (dt: number, t: number) => void): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  /** Runs an async card script again and again until dispose, with `gap` ms between runs. */
  repeat(script: () => Promise<unknown>, gap?: number): void;
  /** Resolves after `ms` (rejects never; check `stage.disposed` after awaiting). */
  wait(ms: number): Promise<void>;
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
  row.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:12px;width:100%';
  box.append(row);

  const captions = opts.panes ?? [null];
  const n = captions.length;
  const avail = el.clientWidth || (preview ? 280 : 760);
  const capH = captions[0] === null ? 0 : preview ? 16 : 22;
  const height = Math.floor((preview ? 200 : (opts.height ?? 420)) - capH);
  const cap = preview ? avail : Math.min(avail, opts.width ?? 760);
  const width = Math.floor((cap - 12 * (n - 1)) / n);
  const paper = opts.paper ?? PAPER;

  const panes: Pane[] = captions.map((text) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px';
    const frame = document.createElement('div');
    frame.style.cssText = `position:relative;width:${width}px;height:${height}px;overflow:hidden;
      border-radius:6px;background:${paper}`;
    const canvasEl = document.createElement('canvas');
    canvasEl.width = width;
    canvasEl.height = height;
    frame.append(canvasEl);
    cell.append(frame);
    let caption: HTMLDivElement | null = null;
    if (text !== null) {
      caption = document.createElement('div');
      caption.style.cssText = `font:${preview ? 11 : 13}px/1.3 ui-monospace,monospace;color:var(--fg-2);
        text-align:center;max-width:${width}px;overflow-wrap:anywhere`;
      caption.textContent = text;
      cell.append(caption);
    }
    row.append(cell);
    return { el: canvasEl, frame, width, height, caption };
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
      'display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 16px;max-width:760px';
    box.append(bar);
  }

  const rafs = new Set<number>();
  const timers = new Set<number>();
  const disposers: (() => void)[] = [];
  const owned = new Map<AnyCanvas, Pane>();
  let disposed = false;

  const stage: Stage = {
    ...panes[0]!,
    panes,
    preview,
    scene: opts.scene ?? [width, height],
    bar,
    box,
    get disposed() {
      return disposed;
    },
    own(canvas, pane = panes[0]!) {
      if (opts.scene) {
        const [sw, sh] = opts.scene;
        const z = Math.min(pane.width / sw, pane.height / sh);
        canvas.setViewportTransform([z, 0, 0, z, (pane.width - sw * z) / 2, (pane.height - sh * z) / 2]);
      }
      // A mount that awaited can get here after unmount: free it at once.
      if (disposed) queueMicrotask(() => freeCanvas(canvas));
      else owned.set(canvas, pane);
      return canvas;
    },
    ghost(canvas) {
      const pane = owned.get(canvas) ?? panes[0]!;
      return createGhost(canvas, pane.frame, () => !disposed && !canvas.disposed);
    },
    loop(frame) {
      let last = performance.now();
      const start = last;
      let id = 0;
      const tick = (now: number): void => {
        rafs.delete(id);
        if (disposed) return;
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        frame(dt, (now - start) / 1000);
        id = requestAnimationFrame(tick);
        rafs.add(id);
      };
      id = requestAnimationFrame(tick);
      rafs.add(id);
    },
    every(ms, fn) {
      if (!disposed) timers.add(window.setInterval(fn, ms));
    },
    after(ms, fn) {
      if (disposed) return;
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    },
    wait(ms) {
      return new Promise((resolve) => stage.after(ms, resolve));
    },
    repeat(script, gap = 600) {
      const run = async (): Promise<void> => {
        while (!disposed) {
          try {
            await script();
          } catch (err) {
            if (!disposed) console.error('fabric card script failed', err);
            return;
          }
          await new Promise((r) => setTimeout(r, gap));
        }
      };
      void run();
    },
    onDispose(fn) {
      if (disposed) fn();
      else disposers.push(fn);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const id of rafs) cancelAnimationFrame(id);
      for (const t of timers) {
        clearInterval(t);
        clearTimeout(t);
      }
      for (const fn of disposers.splice(0)) {
        try {
          fn();
        } catch (err) {
          console.error('fabric stage cleanup failed', err);
        }
      }
      for (const canvas of owned.keys()) freeCanvas(canvas);
      owned.clear();
      box.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}

/** Disposes one canvas: listeners, animations, objects (IText textareas included), DOM. */
function freeCanvas(canvas: AnyCanvas): void {
  if (canvas.disposed) return;
  canvas.dispose().catch((err: unknown) => {
    // 'aborted' means a second dispose replaced this one; anything else left state behind.
    if (err !== 'aborted') console.error('fabric canvas dispose failed', err);
  });
}
