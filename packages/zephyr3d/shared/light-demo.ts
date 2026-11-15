// Boots the docs' lighting scene: Application, scene, boxes, floor and an orbit camera
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type Mesh, type PerspectiveCamera } from '@zephyr3d/scene';
import type { Stage } from './frame.ts';
import { boxField, floor, lambert, orbitCamera } from './light-world.ts';

export interface LightDemo {
  myApp: Application;
  scene: Scene;
  camera: PerspectiveCamera;
  boxes: Mesh[];
  floor: Mesh;
}

export interface LightDemoOptions {
  /** Boxes in the spiral (default 16 in the full view, 10 in a card) */
  boxes?: number;
  boxSize?: number;
  floorSize?: number;
  eye?: Vector3;
  far?: number;
  /** Leave the scene's environment lighting on (default: off, as in the docs' light pages) */
  ambient?: boolean;
  floorColor?: [number, number, number];
  boxColor?: [number, number, number];
}

/**
 * The scene every docs light and shadow page builds: yellow boxes scattered over a cyan floor, seen from
 * above. The example adds its own lights. Environment lighting is off unless `ambient` is set, because
 * the docs switch it off to show what one light contributes.
 */
export async function lightDemo(stage: Stage, opts: LightDemoOptions = {}): Promise<LightDemo> {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  if (!opts.ambient) scene.env.light.type = 'none';
  const boxes = boxField(scene, lambert(...(opts.boxColor ?? [1, 1, 0])), opts.boxes ?? (stage.preview ? 10 : 16), opts.boxSize ?? 6, 1.3);
  const ground = floor(scene, lambert(...(opts.floorColor ?? [0, 1, 1])), opts.floorSize ?? 100);
  const camera = orbitCamera(scene, opts.eye ?? new Vector3(30, 30, 30), opts.far ?? 600);
  return { myApp, scene, camera, boxes, floor: ground };
}
