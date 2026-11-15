// Camera orbit, tight margins and grid helpers for the 3D and subplot examples
import type { Stage } from './stage.ts';
import { relayout } from './basic-util.ts';

/** Margins that let a 3D scene fill the card. */
export const TIGHT = { l: 0, r: 0, t: 0, b: 0 };

/** Card: no margins; full view: room for a title (or none). */
export const margin3d = (stage: Stage, full: { l: number; r: number; t: number; b: number } = { l: 0, r: 0, t: 0, b: 0 }) =>
  stage.preview ? TIGHT : full;

export interface OrbitOptions {
  /** Distance of the eye from the vertical axis. Default 2.2. */
  radius?: number;
  /** Eye height. Default 0.9. */
  height?: number;
  /** Radians per tick. Default 0.02. */
  speed?: number;
  /** Starting angle. Default 0.785. */
  start?: number;
  /** Tick length in ms. Default 90. */
  ms?: number;
  /** Scenes to turn together. Default ['scene']. */
  scenes?: string[];
}

/** Cards only: turns scene.camera.eye around the vertical axis so the 3D card keeps moving. */
export function orbit(stage: Stage, o: OrbitOptions = {}): void {
  if (!stage.preview) return;
  const { radius = 2.2, height = 0.9, speed = 0.02, start = 0.785, ms = 90, scenes = ['scene'] } = o;
  stage.every(ms, (i) => {
    const a = start + i * speed;
    const eye = { x: radius * Math.cos(a), y: radius * Math.sin(a), z: height };
    const update: Record<string, unknown> = {};
    for (const s of scenes) update[`${s}.camera.eye`] = eye;
    void relayout(stage.div, update);
  });
}

/** n evenly spaced numbers from a to b, both included. */
export function linspace(a: number, b: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / Math.max(1, n - 1));
}

/** Every `step`-th item: the card-size version of a big dataset. */
export function every<T>(list: readonly T[], step: number): T[] {
  return list.filter((_, i) => i % step === 0);
}
