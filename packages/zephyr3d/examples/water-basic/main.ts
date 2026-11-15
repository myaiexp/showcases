// The Water node: a clipmap surface sized by the node's scale, with gridScale and animationSpeed
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type FBMWaveGenerator } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 7, 18) });

  // makeWater is the docs' basic setup: new Water(scene), parent = rootNode, the X/Z scale sets the
  // region, gridScale and animationSpeed, and an FBMWaveGenerator on waveGenerator
  const water = makeWater(scene, 120);
  const waves = water.waveGenerator as FBMWaveGenerator;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) swingCamera(camera, ms, 18, 7);
  });
  const out = stage.readout();
  if (stage.bar) {
    slider(stage.bar, 'gridScale', [0.25, 4, 0.25], water.gridScale, (v) => (water.gridScale = v));
    slider(stage.bar, 'animationSpeed', [0, 3, 0.1], water.animationSpeed, (v) => (water.animationSpeed = v));
    slider(stage.bar, 'scale x/z (region)', [20, 200, 10], 120, (v) => water.scale.setXYZ(v, 1, v));
    slider(stage.bar, 'waves amplitude', [0, 2, 0.05], waves.amplitude, (v) => (waves.amplitude = v));
    toggle(stage.bar, 'wireframe', false, (v) => (water.wireframe = v));
    stage.every(300, () => {
      if (out) out.textContent = `waveTime ${water.waveTime.toFixed(1)} s, region ${water.scale.x} x ${water.scale.z} m`;
    });
  } else {
    stage.caption('new Water(scene): clipmap grid, FBM waves');
  }
  myApp.run();
});
