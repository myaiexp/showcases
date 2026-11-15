// Underwater: the camera enters the water region and the medium takes over the frame
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { buildWorld, makeWater, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const target = new Vector3(0, -3, 0);
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 1.5, 11), target, depth: -8, sunElevation: 50 });
  const water = makeWater(scene);
  water.absorption = new Vector3(0.12, 0.05, 0.03);
  water.scattering = new Vector3(0.02, 0.03, 0.04);

  // Nothing needs enabling: the camera entering the region switches it on
  water.underwaterEnabled = true;
  water.underwaterAmbientIntensity = 1;
  water.underwaterGodRays = true;

  let eyeY = 1.5;
  const place = (y: number): void => {
    eyeY = y;
    camera.lookAt(new Vector3(0, y, 11), target, Vector3.axisPY());
  };
  const out = stage.readout();
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) place(-1.5 + 2.5 * Math.sin(ms * 0.0006));
  });
  if (stage.bar) {
    slider(stage.bar, 'camera height (m)', [-6, 4, 0.1], eyeY, place);
    toggle(stage.bar, 'underwaterEnabled', true, (v) => (water.underwaterEnabled = v));
    toggle(stage.bar, 'underwaterGodRays', true, (v) => (water.underwaterGodRays = v));
    slider(stage.bar, 'underwaterGodRayIntensity', [0, 3, 0.1], water.underwaterGodRayIntensity, (v) => (water.underwaterGodRayIntensity = v));
    slider(stage.bar, 'underwaterGodRaySteps', [4, 64, 2], water.underwaterGodRaySteps, (v) => (water.underwaterGodRaySteps = v));
    slider(stage.bar, 'underwaterAmbientIntensity', [0, 3, 0.1], 1, (v) => (water.underwaterAmbientIntensity = v));
    toggle(stage.bar, 'underwaterGodRayShadow', false, (v) => (water.underwaterGodRayShadow = v));
    stage.every(250, () => {
      if (out) out.textContent = `camera y = ${eyeY.toFixed(1)} m (the water rest plane is y = 0)`;
    });
  } else {
    stage.caption('the camera dips below y = 0: the medium fills the frame');
  }
  myApp.run();
});
