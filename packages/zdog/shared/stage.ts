// Shared Zdog stage: a canvas or svg sized to the card, a frame loop, cleanup
//
// Traps found while building the gallery (add to this list):
// - Illustration reads the element's width/height ATTRIBUTES as its size, then multiplies a
//   canvas's attributes by devicePixelRatio and pins its CSS size in px. The stage measures
//   the box first and sets the attributes to fit, so nothing is scaled by CSS afterwards.
// - `resize: true` adds a window resize listener that outlives the element: call
//   `illo.setResize(false)` in cleanup. The listener measures the element's box, so the
//   canvas needs a CSS width (the stage's `fluid()` sets one).
// - `illo.updateRenderGraph(item)` updates the Illustration's own graph, then renders
//   `item`. A model that is not a child of the Illustration needs `item.updateGraph()`
//   followed by `illo.renderGraph(item)`.
// - Anchor `scale` does not scale stroke; Illustration `zoom` scales both. Hemisphere, Cone
//   and Cylinder break under a scale that differs per axis (docs: Extras, Known bugs).
// - Change a path point, or a Rect's width or height, and nothing moves until
//   `shape.updatePath()`.
// - A Shape's z-order is the average z of its path points and a Group's the average of
//   its children, so long shapes and big groups pop in front of things they should not.
// - Cards have no pointer: drag examples animate what the drag would do on a timer.
// - Dragger listens for pointerdown on its startElement and adds its move/up listeners to
//   window only while a drag runs, so removing the element is enough to clean it up.
import type { MountContext } from '@/types.ts';

export interface StageOptions<K extends Kind> {
  /** Render on an `<svg>` instead of a `<canvas>`. */
  kind?: K;
  /** Height / width of the full view's drawing box. Cards are always 200px tall. */
  aspect?: number;
  /** Size, in scene units, of the scene that `zoom` fits into the box (the docs use 240). */
  fit?: number;
  /** One line under the drawing in the full view, such as "Drag to rotate". */
  hint?: string;
}

type Kind = 'canvas' | 'svg';
type ElementOf<K extends Kind> = K extends 'svg' ? SVGSVGElement : HTMLCanvasElement;

export interface Stage<E extends HTMLCanvasElement | SVGSVGElement> {
  /** The element to hand to `new Zdog.Illustration({ element })`. Its width/height attributes are set. */
  element: E;
  width: number;
  height: number;
  /** Zoom that fits a `fit`-sized scene into the box. */
  zoom: number;
  preview: boolean;
  /** Control bar under the drawing, or null in a card. */
  bar: HTMLElement | null;
  /** Calls `frame(dt, t)` every animation frame (seconds) until dispose. */
  loop(frame: (dt: number, t: number) => void): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Runs `fn` on dispose, before the element is removed. */
  onDispose(fn: () => void): void;
  /** Makes the element fill the box's width through CSS, for `resize: true` examples. */
  fluid(): void;
  dispose(): void;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

export function createStage<K extends Kind = 'canvas'>(
  el: HTMLElement,
  ctx: MountContext,
  opts: StageOptions<K> = {},
): Stage<ElementOf<K>> {
  const { preview } = ctx;
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;width:100%';
  el.append(box);

  const avail = el.clientWidth || (preview ? 260 : 560);
  const width = Math.round(preview ? Math.min(avail, 300) : Math.min(avail, 640));
  const height = preview ? 200 : Math.min(480, Math.round(width * (opts.aspect ?? 0.75)));
  const fit = opts.fit ?? 240;
  const zoom = Math.min(width, height) / fit;

  const element = (
    opts.kind === 'svg' ? document.createElementNS(SVG_NS, 'svg') : document.createElement('canvas')
  ) as ElementOf<K>;
  element.setAttribute('width', String(width));
  element.setAttribute('height', String(height));
  element.style.display = 'block';
  if (!preview) element.style.touchAction = 'none';
  box.append(element);

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
      'display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 16px;max-width:640px';
    box.append(bar);
  }

  let raf = 0;
  const timers: number[] = [];
  const disposers: (() => void)[] = [];
  let disposed = false;

  const stage: Stage<ElementOf<K>> = {
    element,
    width,
    height,
    zoom,
    preview,
    bar,
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
    onDispose(fn) {
      disposers.push(fn);
    },
    fluid() {
      element.style.width = '100%';
      element.style.maxWidth = `${width}px`;
      element.style.height = 'auto';
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      for (const t of timers) clearInterval(t);
      for (const fn of disposers.splice(0)) fn();
      box.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}
