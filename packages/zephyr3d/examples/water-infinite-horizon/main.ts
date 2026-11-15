// infinite: the surface reaches the horizon instead of ending at the region, within viewDistance
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 3, 14), depth: -10, target: new Vector3(0, 1, 0) });
  // A small region: without infinite the water ends 40 m wide
  const water = makeWater(scene, 40);
  water.gridScale = 1.5;
  water.infinite = true;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms, 14, 3, new Vector3(0, 1, 0));
      water.infinite = Math.floor(ms / 3000) % 2 === 0;
      stage.caption(`water.infinite = ${water.infinite}`);
    }
  });
  if (stage.bar) {
    toggle(stage.bar, 'infinite', true, (v) => (water.infinite = v));
    // 0 derives the distance from the true horizon for the camera's height
    slider(stage.bar, 'viewDistance (m)', [0, 1500, 50], 0, (v) => (water.viewDistance = v));
    slider(stage.bar, 'region size (m)', [20, 200, 10], 40, (v) => water.scale.setXYZ(v, 1, v));
  }
  myApp.run();
});
