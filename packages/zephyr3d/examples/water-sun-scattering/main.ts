// Directional scattering: a low sun tints the water body, and a shadow on it darkens the water
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 4, 16), depth: -8, sunElevation: 15 });
  const water = makeWater(scene);
  // A milky body shows the effect best
  water.absorption = new Vector3(0.4, 0.14, 0.09);
  water.scattering = new Vector3(0.06, 0.12, 0.15);

  water.sunScatteringIntensity = 1;
  water.scatterAnisotropy = 0.7;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms, 16, 4);
      water.sunScatteringIntensity = 1.5 + 1.5 * Math.sin(ms * 0.0007);
    }
  });
  if (stage.bar) {
    slider(stage.bar, 'sunScatteringIntensity', [0, 5, 0.1], 1, (v) => (water.sunScatteringIntensity = v));
    slider(stage.bar, 'scatterAnisotropy', [0, 0.95, 0.05], 0.7, (v) => (water.scatterAnisotropy = v));
    slider(stage.bar, 'scatteringScale', [0, 4, 0.1], 1, (v) => (water.scatteringScale = v));
  } else {
    stage.caption('sunScatteringIntensity sweeps 0 to 3 with a low sun');
  }
  myApp.run();
});
