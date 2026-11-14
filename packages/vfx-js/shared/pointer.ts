// Stand-in pointer for cards: page-wide pointermove over one card at a time
//
// VFX-JS reads the `mouse` uniform (and FluidEffect, ParticleEffect and VoronoiEffect read
// ctx.mouse) from pointermove events on `window`, for every VFX on the page. A card has no
// pointer, so it asks for a stand-in here. Events are page-wide, so one card holds the
// stand-in at a time and hands it to the next after a few seconds. In the full view the
// stand-in moves only until the reader's own pointer moves over the stage.
import type { Stage } from './stage.ts';

/** A point in 0..1 of the target's box, (0, 0) top-left, at `t` seconds. */
export type PointerPath = (t: number) => [number, number];

interface Holder {
  target: Element;
  path: PointerPath;
  start: number;
}

const HOLD_MS = 5000;
const holders: Holder[] = [];
let current = 0;
let since = 0;
let raf = 0;

function step(now: number): void {
  raf = 0;
  if (!holders.length) return;
  if (now - since > HOLD_MS) {
    current = (current + 1) % holders.length;
    since = now;
  }
  const h = holders[current % holders.length]!;
  const r = h.target.getBoundingClientRect();
  const [u, v] = h.path((now - h.start) / 1000);
  window.dispatchEvent(
    new PointerEvent('pointermove', { clientX: r.left + u * r.width, clientY: r.top + v * r.height, pointerType: 'mouse' }),
  );
  raf = requestAnimationFrame(step);
}

/** A slow figure-eight over the box: the default path. */
export const figureEight: PointerPath = (t) => [0.5 + 0.38 * Math.sin(t * 0.9), 0.5 + 0.3 * Math.sin(t * 1.8)];

/**
 * Moves a stand-in pointer over `target` along `path` until the stage is disposed (in the
 * full view, until the reader moves their own pointer over the stage).
 */
export function standInPointer(stage: Stage, target: Element, path: PointerPath = figureEight): void {
  const holder: Holder = { target, path, start: performance.now() };
  holders.push(holder);
  if (holders.length === 1) since = performance.now();
  if (!raf) raf = requestAnimationFrame(step);
  const release = (): void => {
    const i = holders.indexOf(holder);
    if (i < 0) return;
    holders.splice(i, 1);
    if (current >= i && current > 0) current--;
    if (!holders.length && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  stage.onDispose(release);
  if (!stage.preview) {
    const real = (e: PointerEvent): void => {
      if (e.isTrusted) {
        release();
        stage.root.removeEventListener('pointermove', real);
      }
    };
    stage.root.addEventListener('pointermove', real);
    stage.onDispose(() => stage.root.removeEventListener('pointermove', real));
  }
}
