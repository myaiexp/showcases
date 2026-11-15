// Plane-coordinate sample data for the SIMPLE map: a drawn floor plan and labelled huts
import type { Scene } from '@antv/l7';
import type { Stage } from './stage.ts';
import { drawImage } from './images.ts';

/** A floor plan drawn on a canvas: rooms outlined on a warm sheet, covering plane extent [360, 400, 640, 600]. */
export function planImage(): string {
  return drawImage(256, (g, s) => {
    g.fillStyle = '#efe3c8';
    g.fillRect(0, 0, s, s);
    g.strokeStyle = '#7a6a4a';
    g.lineWidth = 3;
    g.strokeRect(6, 6, s - 12, s - 12);
    g.lineWidth = 2;
    for (const [x, y, w, h] of [[6, 6, 110, 90], [116, 6, 134, 150], [6, 96, 110, 154], [116, 156, 134, 94]] as const) g.strokeRect(x, y, w, h);
    g.fillStyle = '#b9a67c';
    for (let i = 0; i < 6; i++) g.fillRect(20 + i * 18, 110, 10, 130);
  });
}

/** Labelled points on the plan (the docs' hut list, invented): x and y are plane units. */
export const huts = [
  { x: 400, y: 570, t: 'hut' },
  { x: 470, y: 520, t: 'well' },
  { x: 560, y: 560, t: 'barn' },
  { x: 440, y: 440, t: 'gate' },
  { x: 590, y: 470, t: 'pond' },
] as const;

/**
 * Plane [x, y] to the [lng, lat] the SIMPLE map keeps inside (the formulas of L7's own
 * SimpleMapCoord), for scene.setCenter and ghost.moveTo, which take geographic values.
 */
export function toLngLat([x, y]: [number, number], size = 1000): [number, number] {
  const lng = (x / size) * 360 - 180;
  const lat = (360 / Math.PI) * Math.atan(Math.exp((((y / size) * 360 - 180) * Math.PI) / 180)) - 90;
  return [lng, lat];
}

/** Pans a plane-coordinate map back and forth around `center` by `amp` plane units (cards). */
export function sway(stage: Stage, scene: Scene, center: [number, number], amp: number, size = 1000): void {
  stage.every(60, (i) => scene.setCenter(toLngLat([center[0] + Math.sin(i / 40) * amp, center[1] + Math.cos(i / 55) * amp * 0.5], size)));
}
