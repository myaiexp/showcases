// Shared L7 stage: map box, scene ownership, WebGL release, card loops, teardown
import type { Scene } from '@antv/l7';
import type { MountContext } from '@/types.ts';
import { controlBar } from './controls.ts';
import { createGhost, type Ghost } from './ghost.ts';
import './stage.css';

/**
 * L7 2.29 traps found while building this gallery, for whoever adds the next example:
 * - Every Scene gets `logoVisible: false`: the default logo is an image from alipayobjects.com.
 *   Hand the scene to `await stage.ready(scene)` before adding layers: it waits for 'loaded',
 *   and on dispose destroys the scene and frees its WebGL context, which `scene.destroy()`
 *   never does (browsers cap live contexts, and the gallery mounts and unmounts cards).
 * - No network anywhere, cards or full views. Draw on `shared/world.ts` (Natural Earth via
 *   world-atlas) instead of a basemap; generate data in code instead of the docs' CDN JSON;
 *   give `scene.addImage` data: URLs drawn in code (`shared/images.ts`). Polygon shapes
 *   `water` and `ocean` load a texture from alipayobjects.com: never use them. Raster tile
 *   layers and MVT sources fetch: feed tiles through `getCustomData` instead of a URL.
 * - The MapTheme control's thumbnails are remote images; it stays out.
 * - Cards have no pointer. Animate with `stage.every()`/`stage.frame()` or layer `animate`,
 *   or fake input with `stage.ghost(scene)` (mousemove for hover, pointerdown/up for click).
 * - Scene mouse events (`scene.on('mousemove' | 'click' | …)`) are the map engine's events:
 *   `{ point: {x, y}, lngLat, originalEvent }`, with no `x`/`y` of their own. Layer events
 *   (`layer.on('click')`) are L7's: `{ x, y, lngLat, feature, featureId }`. Errors thrown in a
 *   scene handler are caught and logged as "Error in map event handler".
 * - `scene.addImage` returns a Promise: await it before adding a layer that uses the image.
 *   `removeImage` only empties the registry (hasImage turns false); icons already drawn stay.
 * - Line layers, docs claims wrong for 2.29.1: style `arrow` ({enable, arrowWidth, …}) is read
 *   by no model; `borderWidth`/`borderColor` and `linearDir` work only on shape('line'), not
 *   arcs; walls have no dashArray. Great circles across ±180° draw a straight band over the
 *   map (shared/line-data.ts `NO_DATELINE` avoids them). Units: wall size 40 is a sensible wall
 *   at zoom 3–4 (2000 fills the screen; with heightfixed ~3e6); line size [w, h] and
 *   raisingHeight lift ~100 visibly. Flowline arrowheads are large: sizes 3–4 read best.
 * - tsconfig has noUncheckedIndexedAccess: guard indexed reads.
 */

export interface StageOptions {
  /** Height of the map box in the full view, px. Default 460. */
  height?: number;
}

export interface Stage {
  readonly preview: boolean;
  /** The map box: pass it as the Scene's `id`. */
  readonly container: HTMLDivElement;
  /** The row above the map in the full view; null in cards. Hidden while empty. */
  readonly bar: HTMLElement | null;
  /** Owns the scene (destroyed and its context freed on dispose) and resolves on 'loaded'. */
  ready(scene: Scene): Promise<Scene>;
  /** A text line under the map in the full view (null in cards), for event payloads. */
  readout(): HTMLPreElement | null;
  /** A synthetic pointer on the map, for cards. Coordinates are px in the map box. */
  ghost(scene: Scene): Ghost;
  /** Calls fn(i) every ms (i from 1) until disposed. */
  every(ms: number, fn: (i: number) => void): void;
  /** Calls fn(seconds since start) on every animation frame until disposed. */
  frame(fn: (t: number) => void): void;
  /** Registers a teardown that runs before the scenes are destroyed. */
  own(fn: () => void): void;
  readonly disposed: boolean;
  dispose(): void;
}

/** Frees the WebGL context behind an L7 canvas once L7 has finished its own teardown. */
function releaseContext(box: HTMLElement): void {
  for (const canvas of box.querySelectorAll<HTMLCanvasElement>('.l7-scene > canvas')) {
    const gl = (canvas.getContext('webgl2') ?? canvas.getContext('webgl')) as WebGLRenderingContext | null;
    // L7 destroys its renderer on a timeout after scene.destroy(); lose the context after it.
    if (gl) setTimeout(() => gl.getExtension('WEBGL_lose_context')?.loseContext(), 50);
  }
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const bar = preview ? null : controlBar(el);
  const container = document.createElement('div');
  container.className = preview ? 'l7s-map l7s-card' : 'l7s-map';
  if (!preview && opts.height) container.style.height = `${opts.height}px`;
  el.append(container);

  const scenes: Scene[] = [];
  const stops: (() => void)[] = [];
  const waiting = new Set<() => void>();
  let disposed = false;
  let readoutEl: HTMLPreElement | null = null;
  let ghostGuard = false;

  const stage: Stage = {
    preview,
    container,
    bar,
    ready(scene) {
      scenes.push(scene);
      if (disposed) {
        scene.destroy();
        return Promise.reject(new DOMException('unmounted', 'AbortError'));
      }
      return new Promise<Scene>((resolve, reject) => {
        const abort = (): void => reject(new DOMException('unmounted', 'AbortError'));
        waiting.add(abort);
        scene.on('loaded', () => {
          waiting.delete(abort);
          if (!disposed) resolve(scene);
        });
      });
    },
    readout() {
      if (preview) return null;
      if (!readoutEl) {
        readoutEl = document.createElement('pre');
        readoutEl.className = 'l7s-readout';
        el.append(readoutEl);
      }
      return readoutEl;
    },
    ghost(scene) {
      if (!ghostGuard) {
        // A card is an <a>: an untrusted click bubbling through it would open the example.
        ghostGuard = true;
        const guard = (e: Event): void => {
          if (!e.isTrusted) e.preventDefault();
        };
        container.addEventListener('click', guard);
        stops.push(() => container.removeEventListener('click', guard));
      }
      const ghost = createGhost(container, scene, preview);
      stops.push(() => ghost.remove());
      return ghost;
    },
    every(ms, fn) {
      let i = 0;
      const timer = setInterval(() => {
        if (disposed) return;
        try {
          fn(++i);
        } catch (err) {
          console.error('l7 stage: a timed step failed', err);
        }
      }, ms);
      stops.push(() => clearInterval(timer));
    },
    frame(fn) {
      const start = performance.now();
      let raf = 0;
      const tick = (now: number): void => {
        if (disposed) return;
        fn((now - start) / 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      stops.push(() => cancelAnimationFrame(raf));
    },
    own: (fn) => stops.push(fn),
    get disposed() {
      return disposed;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const abort of waiting) abort();
      waiting.clear();
      for (const stop of stops.splice(0)) {
        try {
          stop();
        } catch (err) {
          console.error('l7 stage: a teardown failed', err);
        }
      }
      releaseContext(container);
      for (const scene of scenes.splice(0)) {
        try {
          scene.destroy();
        } catch (err) {
          console.error('l7 stage: scene.destroy failed', err);
        }
      }
      container.remove();
      readoutEl?.remove();
      bar?.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}
