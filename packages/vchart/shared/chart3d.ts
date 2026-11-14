// Shared setup for the 3D chart examples: page-wide registration and a slowly orbiting camera
import {
  registerAxis3dPlugin,
  registerBar3dChart,
  registerFunnel3dChart,
  registerWordCloud3dChart,
} from '@visactor/vchart-extension';
import type { IVChart } from '@visactor/vchart';
import { every } from './chart.ts';

type Kind = 'bar3d' | 'funnel3d' | 'axis3d' | 'wordCloud3d';
const done = new Set<Kind>();
const REGISTER: Record<Kind, () => void> = {
  bar3d: registerBar3dChart,
  funnel3d: registerFunnel3dChart,
  // Line, area and scatter keep their 2D type; a zField plus the 3D axes make them 3D.
  axis3d: registerAxis3dPlugin,
  wordCloud3d: registerWordCloud3dChart,
};

/**
 * Registration is page-wide and additive, so each kind is registered once and never undone.
 * The 3D plugin they all install treats every chart on the page as 3D, which only matters for
 * the camera it creates: 2D charts look the same.
 */
export function register3d(kind: Kind): void {
  if (done.has(kind)) return;
  done.add(kind);
  REGISTER[kind]();
}

/** Constructor options for a 3D chart (options3d.enable, no dirty-bounds optimisation). */
export const INIT_3D = { disableDirtyBounds: true, options3d: { enable: true } } as const;

export interface Camera {
  alpha: number;
  beta: number;
}

/**
 * Sets the camera on the stage, as options3d would at construction. set3dOptions replaces the
 * whole option object, so everything but alpha and beta is passed again.
 */
export function setCamera(vchart: IVChart, camera: Camera, extra: Record<string, unknown> = {}): void {
  const stage = vchart.getStage();
  stage.set3dOptions({ ...extra, alpha: camera.alpha, beta: camera.beta });
  stage.renderNextFrame();
}

/**
 * Swings the camera slowly around `base` (radians) until the returned stop function is called.
 * `isAlive` guards against a released chart.
 */
export function orbit(vchart: IVChart, base: Camera, isAlive: () => boolean, extra: Record<string, unknown> = {}, amp = 0.35): () => void {
  let t = 0;
  return every(60, () => {
    if (!isAlive()) return;
    t += 0.05;
    setCamera(vchart, { alpha: base.alpha + Math.sin(t * 0.7) * amp * 0.5, beta: base.beta + Math.sin(t) * amp }, extra);
  });
}

/**
 * The 3D guides give the z axis width 600, height 200 and depth 200 and centre the projection at
 * (500, 250), which suits a wide chart. A ~260x200 card needs them scaled down and centred on the card.
 */
export const PREVIEW_Z_SIZE = { width: 140, height: 60, depth: 70 };

export function center3d(preview: boolean): { x: number; y: number } {
  return preview ? { x: 120, y: 100 } : { x: 500, y: 250 };
}
