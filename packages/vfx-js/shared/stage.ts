// Shared VFX-JS stage: scene, caption, controls, a VFX canvas clipped to it
//
// Traps found while building the gallery (add to this list):
// - `new VFX()` draws on one canvas the size of the window at z-index 9999 and knows nothing
//   of CSS clipping, so a card's effect would paint over the whole page. Every example passes
//   `stage.vfxOpts` (a fixed canvas, put inside the stage) and hands the VFX to `stage.own()`,
//   which clips the canvas to the stage box every frame and destroys it on cleanup.
// - `vfx.destroy()` never frees the WebGL context. Browsers keep ~16 and then drop the oldest,
//   blanking other cards, so `own()` loses the context on purpose after destroy.
// - With prefers-reduced-motion VFX draws nothing and the elements stay plain HTML. `own()`
//   says so under the scene.
// - `mouse` and the pointer-driven effects read window pointermove events. A card has no
//   pointer: use shared/pointer.ts, which moves a page-wide stand-in pointer over one card
//   at a time.
// - Transitions and addHTML wrap the element in a <canvas> sized by the html-in-canvas sizing
//   policy, which sees only an inline px width: a width set by a class stretches the wrapper
//   to the parent's width. Set fixed sizes inline (shared/slides.ts does).
import type { VFX, VFXOpts } from '@vfx-js/core';
import type { MountContext } from '@/types.ts';
import './vfx.css';

export interface StageOptions {
  /** One line under the scene in the full view, such as "Move the pointer over it". */
  hint?: string;
}

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface Stage {
  /** The scene: append the example's elements here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  /** Fires when the stage is disposed. */
  signal: AbortSignal;
  readonly disposed: boolean;
  /**
   * Options every `new VFX()` here spreads first: a fixed canvas inside the stage (so it
   * never covers the page) and a lower pixel ratio in cards.
   */
  readonly vfxOpts: VFXOpts;
  /** Clips `vfx`'s canvas to the stage and destroys it on cleanup. Returns `vfx`. */
  own(vfx: VFX): VFX;
  /** Sets the plain-English line under the scene. */
  say(text: string, tone?: Tone): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`; rejects (ending a `play` script) when the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Runs `script` over and over until dispose. */
  play(script: (wait: (ms: number) => Promise<void>) => Promise<void>): void;
  /**
   * Shows `items` one by one: in a card every `ms` for ever, in the full view once (the
   * first item) unless `loop` is set. Returns a function that shows item `i`.
   */
  cycle<T>(items: readonly T[], ms: number, show: (item: T, i: number) => void, loop?: boolean): (i: number) => void;
  /** Calls `fn` every animation frame with seconds since the stage started, until dispose. */
  frame(fn: (t: number) => void): void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

const STOPPED = Symbol('stage disposed');

/** The canvas covers the window: clip it to `box`, in window coordinates. */
function clipTo(canvas: HTMLCanvasElement, box: Element): void {
  const r = box.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const top = Math.max(0, r.top);
  const left = Math.max(0, r.left);
  const right = Math.max(0, vw - r.right);
  const bottom = Math.max(0, vh - r.bottom);
  canvas.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;
}

function loseContext(canvas: HTMLCanvasElement): void {
  // getContext on a canvas that has one returns that same context.
  const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
  gl?.getExtension('WEBGL_lose_context')?.loseContext();
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'vx-wrap vx-card' : 'vx-wrap vx-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'vx-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'vx-scene';
  // The VFX canvases go here, outside `root`, so capturing a container never captures them.
  const layer = document.createElement('div');
  layer.className = 'vx-layer';
  const caption = document.createElement('div');
  caption.className = 'vx-caption';
  wrap.append(root, layer, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'vx-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);
  const clipBox = el.closest('.sc-stage') ?? el;

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const intervals = new Set<ReturnType<typeof setInterval>>();
  const waiters = new Set<(reason: unknown) => void>();
  const frames = new Set<(t: number) => void>();
  const owned: VFX[] = [];
  const cleanups: (() => void)[] = [];
  const start = performance.now();
  let raf = 0;
  const tick = (): void => {
    raf = 0;
    if (stage.disposed) return;
    for (const vfx of owned) clipTo(vfx.canvas, clipBox);
    const t = (performance.now() - start) / 1000;
    for (const fn of frames) fn(t);
    raf = requestAnimationFrame(tick);
  };
  const run = (): void => {
    if (!raf && !stage.disposed) raf = requestAnimationFrame(tick);
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  const stage: Stage = {
    root,
    preview,
    bar,
    signal: abort.signal,
    get disposed() {
      return abort.signal.aborted;
    },
    vfxOpts: {
      wrapper: layer,
      scrollPadding: false,
      pixelRatio: preview ? 1 : Math.min(window.devicePixelRatio || 1, 2),
    },
    own(vfx) {
      owned.push(vfx);
      clipTo(vfx.canvas, clipBox);
      if (vfx.reducedMotion) {
        stage.say('Your system asks for reduced motion, so VFX-JS draws nothing and the elements stay plain HTML.', 'warn');
      }
      run();
      return vfx;
    },
    say(text, tone = 'info') {
      caption.textContent = text;
      caption.dataset['tone'] = tone;
    },
    every(ms, fn) {
      if (stage.disposed) return;
      const id = setInterval(() => {
        if (!stage.disposed) fn();
      }, ms);
      intervals.add(id);
    },
    after(ms, fn) {
      if (stage.disposed) return;
      const id = setTimeout(() => {
        timers.delete(id);
        if (!stage.disposed) fn();
      }, ms);
      timers.add(id);
    },
    wait(ms) {
      return new Promise<void>((resolve, reject) => {
        if (stage.disposed) {
          reject(STOPPED);
          return;
        }
        const id = setTimeout(() => {
          timers.delete(id);
          waiters.delete(reject);
          resolve();
        }, ms);
        timers.add(id);
        waiters.add(reject);
      });
    },
    play(script) {
      const loop = async (): Promise<void> => {
        while (!stage.disposed) await script(stage.wait);
      };
      loop().catch((err: unknown) => {
        if (err !== STOPPED && !stage.disposed) console.error('vfx-js stage script failed', err);
      });
    },
    cycle(items, ms, show, loop = preview) {
      let i = 0;
      const at = (n: number): void => {
        i = ((n % items.length) + items.length) % items.length;
        show(items[i]!, i);
      };
      at(0);
      if (loop && items.length > 1) stage.every(ms, () => at(i + 1));
      return at;
    },
    frame(fn) {
      frames.add(fn);
      run();
    },
    onDispose(fn) {
      cleanups.push(fn);
    },
    dispose() {
      if (stage.disposed) return;
      abort.abort();
      if (raf) cancelAnimationFrame(raf);
      for (const id of timers) clearTimeout(id);
      for (const id of intervals) clearInterval(id);
      for (const reject of waiters) reject(STOPPED);
      timers.clear();
      intervals.clear();
      waiters.clear();
      frames.clear();
      for (const fn of cleanups.reverse()) {
        try {
          fn();
        } catch (err) {
          console.error('vfx-js stage cleanup failed', err);
        }
      }
      for (const vfx of owned) {
        const canvas = vfx.canvas;
        try {
          vfx.destroy();
        } catch (err) {
          console.error('vfx-js destroy failed', err);
        }
        loseContext(canvas);
      }
      wrap.remove();
    },
  };
  return stage;
}
