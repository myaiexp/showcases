// Axes, legends and titles gallery kit: mount a spec, cycle its signals in cards, find guide items for the ghost
import type { Spec, View } from 'vega';
import type { Mount, MountContext } from '@/types.ts';
import { createStage, type Stage } from './stage.ts';

/** Renders `spec` on a stage; `after` may start card loops (it runs in the full view too, so guard with stage.preview). */
export async function mountGuide(
  el: HTMLElement,
  ctx: MountContext,
  spec: Spec,
  after?: (stage: Stage, view: View) => void,
): Promise<() => void> {
  const stage = createStage(el, ctx);
  const view = await stage.render(spec);
  after?.(stage, view);
  return () => stage.dispose();
}

/** A Mount for the common case: render the spec, then let `after` animate it. */
export function guideMount(spec: Spec, after?: (stage: Stage, view: View) => void): Mount {
  return (el, ctx) => mountGuide(el, ctx, spec, after);
}

interface SceneItem {
  x?: number;
  y?: number;
  bounds?: { x1: number; y1: number; x2: number; y2: number };
  items?: SceneItem[];
  role?: string;
  mark?: { role?: string };
}

/**
 * Centres of the scenegraph items whose mark role is `role` (e.g. 'legend-entry', 'axis-label',
 * 'title-text'), in the ghost's coordinates: pixels from the data rectangle's top-left.
 */
export function guideCentres(view: View, role: string): [number, number][] {
  const out: [number, number][] = [];
  const [ox, oy] = view.origin();
  const walk = (item: SceneItem, dx: number, dy: number): void => {
    const nx = dx + (item.x ?? 0);
    const ny = dy + (item.y ?? 0);
    if (item.mark?.role === role && item.bounds) {
      out.push([dx + (item.bounds.x1 + item.bounds.x2) / 2 - ox, dy + (item.bounds.y1 + item.bounds.y2) / 2 - oy]);
    }
    for (const child of item.items ?? []) walk(child, nx, ny);
  };
  walk((view.scenegraph() as unknown as { root: SceneItem }).root, 0, 0);
  return out;
}

/** Seeded scatter rows: x and y in 0..100, g one of A, B, C, v a size-like value in 1..9. */
export function points(n: number, seed: number): { x: number; y: number; g: string; v: number }[] {
  let a = seed >>> 0;
  const rand = (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: n }, (_, i) => ({
    x: Math.round(rand() * 100),
    y: Math.round(rand() * 100),
    g: 'ABC'[i % 3] ?? 'A',
    v: 1 + Math.round(rand() * 8),
  }));
}
