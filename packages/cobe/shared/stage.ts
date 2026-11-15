// Shared cobe stage: sized globe canvases, unique ids, a frame loop, full cleanup
//
// Traps found while building the gallery against cobe 2.0.1 (add to this list):
// - There is no render loop and no `onRender` (the README's Quick Start still shows the v1
//   `onRender`; the 2.0.1 types and source have none). `createGlobe` draws one frame, and
//   every `globe.update(state)` draws exactly one more, synchronously. Animate by calling
//   `update` from your own requestAnimationFrame loop (`stage.loop`).
// - The land map is a data-URL image decoded after `createGlobe` returns, and 2.0.1 does not
//   redraw when it arrives: a globe that is never updated again shows no land. Keep calling
//   `update` (a loop does) or call it again a moment later.
// - `destroy()` deletes buffers and programs, but not the land texture, and it keeps the
//   WebGL context alive (the docs say it releases it); the canvas keeps its last frame.
//   `stage.own(globe)` destroys the globe, then loses the context through WEBGL_lose_context,
//   so cards never run out of contexts. A lost context never returns to its canvas, so
//   `stage.release()` also swaps in a fresh canvas for the next `createGlobe`.
// - `createGlobe` wraps the canvas in a new `<div style="position:relative;width:100%;
//   height:100%">` inserted into the canvas's parent, and appends one 1px anchor `<div>` per
//   marker or arc with an `id` to it. `destroy()` removes the anchors, not the wrapper.
// - Anchor names (`--cobe-{id}`, `--cobe-arc-{id}`) and visibility variables
//   (`--cobe-visible-{id}`) are page-wide: the visibility variables live in a `<style>` that
//   sets them on `:root`, one per globe. Two globes using `id: 'sf'` fight over one name, so
//   every id goes through `stage.id('sf')`, which makes it unique to the mount.
// - The visibility variable is set to the invalid value `N` while the point faces the camera
//   and removed while it is hidden. So `opacity: var(--cobe-visible-x, 0)` is 0 when hidden
//   (the fallback) and the property's initial value (1) when visible, because an invalid
//   value at computed time falls back to the initial value. It is never a number to compute with.
// - 2.0.1 rewrites that `<style>`'s text on every `update()`, even when nothing changed, which
//   restyles the whole page every frame. `stage.own()` makes identical writes no-ops (the fix
//   cobe's master branch made after 2.0.1).
// - `update({ arcs })` bakes the current `arcWidth`, `arcHeight` and `markerElevation` into
//   each arc, and it runs before the same call's `arcWidth`/`arcHeight` are applied. Changing
//   any of the three moves no arc until `arcs` is passed again in a later `update`.
// - `width` and `height` change only when both are passed to `update`. The globe's size
//   follows the canvas height; a wider canvas adds room at the sides.
// - `offset` is in CSS pixels (cobe multiplies it by `devicePixelRatio`), and `scale` grows
//   the globe about the canvas centre, offset included.
// - `opacity` scales the globe body's colour and alpha by `(1 + opacity) / 2`, so at 0 the body
//   is drawn at half strength and whatever is behind the canvas shows through; the glow is unchanged.
// - Options read with `||` fall back to their defaults when 0 is passed at creation:
//   `mapBrightness`, `diffuse` and `scale` (and `phi`/`theta`, harmlessly). Pass 0 through
//   `update`, which checks for undefined instead.
// - `mapSamples` defaults to 10000 when left out (the Performance recipe calls 16000 "default").
//   The shader decodes dot indexes only up to 32767, and dots are numbered from the north pole,
//   so past 32768 samples the land vanishes south of a band: at 100000 only the top third has land.
// - Cards have no pointer: drag examples animate what a drag would do.
import type { MountContext } from '@/types.ts';
import type { Globe } from 'cobe';

export interface StageOptions {
  /** Captions for several globes side by side; one globe with no caption when left out. */
  panes?: readonly string[];
  /** Width / height of each pane (default 1, square). */
  aspect?: number;
  /** One line under the globes in the full view, such as "Drag to spin". */
  hint?: string;
  /** Largest pane height in the full view (default 440). */
  maxSize?: number;
}

export interface Pane {
  /**
   * The canvas to hand to `createGlobe`. Its CSS size is fixed; pass `width`/`height`.
   * `stage.release()` swaps in a fresh canvas, so read this again before recreating a globe.
   */
  canvas: HTMLCanvasElement;
  /** `position: relative` box around the canvas: put anchored labels here. */
  layer: HTMLDivElement;
  /** CSS pixels: pass these as cobe's `width` and `height`. */
  width: number;
  height: number;
  caption: HTMLDivElement | null;
}

export interface Stage extends Pane {
  panes: Pane[];
  /** `devicePixelRatio` capped at 2 as the Performance recipe advises; 1 in cards, to keep them light. */
  dpr: number;
  preview: boolean;
  /** Control bar under the globes, or null in a card. */
  bar: HTMLElement | null;
  /** The outer column: globes, then hint, then bar. Append extra full-view panels here. */
  box: HTMLDivElement;
  /** A marker or arc id unique to this mount: anchor names and visibility vars are page-wide. */
  id(name: string): string;
  /**
   * Call right after `createGlobe(pane.canvas, …)`. On dispose it destroys the globe, frees
   * its WebGL context and unwraps the canvas; it also stops the globe's page-wide style churn.
   */
  own(globe: Globe, pane?: Pane): Globe;
  /**
   * Destroys an owned globe now and frees its context, for examples that recreate one. A lost
   * context never comes back to its canvas, so the pane gets a fresh `canvas` to create on.
   */
  release(globe: Globe): void;
  /** Calls `frame(dt, t)` every animation frame (seconds) until dispose. */
  loop(frame: (dt: number, t: number) => void): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

let mounts = 0;

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const prefix = `m${++mounts}`;
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;width:100%';
  el.append(box);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;justify-content:center;align-items:flex-start;gap:12px;width:100%';
  box.append(row);

  const captions = opts.panes ?? [null];
  const n = captions.length;
  const aspect = opts.aspect ?? 1;
  const avail = el.clientWidth || (preview ? 280 : 640);
  const capH = captions[0] === null ? 0 : preview ? 16 : 22;
  const maxH = preview ? 196 - capH : (opts.maxSize ?? 440);
  const fitW = (avail - 12 * (n - 1) - (preview ? 8 : 24)) / n;
  const height = Math.floor(Math.min(maxH, fitW / aspect));
  const width = Math.floor(height * aspect);

  const panes: Pane[] = captions.map((text) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px';
    const layer = document.createElement('div');
    layer.style.cssText = `position:relative;width:${width}px;height:${height}px`;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    if (!preview) canvas.style.touchAction = 'none';
    layer.append(canvas);
    cell.append(layer);
    let caption: HTMLDivElement | null = null;
    if (text !== null) {
      caption = document.createElement('div');
      caption.style.cssText = `font:${preview ? 11 : 13}px/1.3 ui-monospace,monospace;color:var(--fg-2);
        text-align:center;max-width:${width}px;overflow-wrap:anywhere`;
      caption.textContent = text;
      cell.append(caption);
    }
    row.append(cell);
    return { canvas, layer, width, height, caption };
  });

  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.style.cssText = 'font-size:13px;color:var(--fg-3)';
    hint.textContent = opts.hint;
    box.append(hint);
  }
  let bar: HTMLElement | null = null;
  if (!preview) {
    bar = document.createElement('div');
    bar.style.cssText =
      'display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 16px;max-width:680px';
    box.append(bar);
  }

  let raf = 0;
  const timers: number[] = [];
  const disposers: (() => void)[] = [];
  const owned = new Map<Globe, () => void>();
  let disposed = false;

  const stage: Stage = {
    ...panes[0]!,
    get canvas() {
      return panes[0]!.canvas;
    },
    panes,
    dpr: preview ? 1 : Math.min(window.devicePixelRatio || 1, 2),
    preview,
    bar,
    box,
    id: (name) => `${prefix}-${name}`,
    own(globe, pane = panes[0]!) {
      // createGlobe appended its visibility <style> to <head> synchronously, just now.
      const style = document.head.lastElementChild;
      if (style instanceof HTMLStyleElement) dedupeText(style);
      owned.set(globe, () => {
        globe.destroy();
        freeCanvas(pane, !disposed);
      });
      return globe;
    },
    release(globe) {
      const free = owned.get(globe);
      owned.delete(globe);
      free?.();
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
      timers.push(window.setInterval(fn, ms));
    },
    after(ms, fn) {
      timers.push(window.setTimeout(fn, ms));
    },
    onDispose(fn) {
      disposers.push(fn);
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

/**
 * Frees a pane's canvas after `destroy()`: loses the WebGL context, then (unless the stage is
 * going away) replaces cobe's wrapper div and the anchors in it with a fresh canvas. A canvas
 * whose context was lost hands back that same dead context to every later getContext call.
 */
function freeCanvas(pane: Pane, replace: boolean): void {
  const { canvas, layer } = pane;
  const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
  gl?.getExtension('WEBGL_lose_context')?.loseContext();
  if (!replace) return;
  const fresh = document.createElement('canvas');
  fresh.style.cssText = canvas.style.cssText;
  const wrapper = canvas.parentElement;
  (wrapper && wrapper !== layer && wrapper.parentElement === layer ? wrapper : canvas).replaceWith(fresh);
  pane.canvas = fresh;
}

/** Makes writing the same text to cobe's `:root` visibility `<style>` a no-op. */
function dedupeText(style: HTMLStyleElement): void {
  const desc = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  if (!desc?.get || !desc.set) return;
  const { get, set } = desc;
  Object.defineProperty(style, 'textContent', {
    configurable: true,
    get() {
      return get.call(this);
    },
    set(v: string) {
      if (v !== get.call(this)) set.call(this, v);
    },
  });
}
