// A long avenue of pillars, for the cascade and distance shadow examples
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, Mesh, PlaneShape, Scene, type PerspectiveCamera } from '@zephyr3d/scene';
import type { Stage } from './frame.ts';
import { lambert, orbitCamera } from './light-world.ts';

/** Boots an app with two rows of pillars running 600 units away from a low camera over a wide floor. */
export async function avenue(stage: Stage): Promise<{ myApp: Application; scene: Scene; camera: PerspectiveCamera }> {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'none';
  const pillar = new BoxShape({ size: 3, sizeY: 9, sizeZ: 3 });
  const material = lambert(1, 0.9, 0.3);
  const count = stage.preview ? 24 : 40;
  for (let i = 0; i < count; i++) {
    for (const side of [-1, 1]) {
      const m = new Mesh(scene, pillar, material);
      m.position.setXYZ(side * 9, 4.5, 10 - i * 16);
    }
  }
  const ground = new Mesh(scene, new PlaneShape({ size: 1500 }), lambert(0.2, 0.8, 0.9));
  ground.castShadow = false;
  const camera = orbitCamera(scene, new Vector3(0, 7, 34), 1500, new Vector3(0, 3, -40));
  return { myApp, scene, camera };
}
