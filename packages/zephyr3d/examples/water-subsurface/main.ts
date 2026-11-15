// Subsurface glow: a backlit wave crest lights up where the wall of water is thin
import { Vector2, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type FBMWaveGenerator } from '@zephyr3d/scene';
import { color, slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  // The sun is behind the waves, as seen from the camera: it sits at +x +z, so look that way
  await buildWorld(scene, { eye: new Vector3(-9, 2.5, -7), target: new Vector3(8, 0, 6), depth: -8, sunElevation: 14 });
  const water = makeWater(scene);
  const waves = water.waveGenerator as FBMWaveGenerator;
  waves.amplitude = 1.1;
  waves.wind = new Vector2(1, 1);

  water.subsurfaceIntensity = 0.5;
  water.subsurfaceCrestHeight = 1.5;
  water.subsurfaceTint = new Vector3(0.86, 0.98, 0.71);

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) water.subsurfaceIntensity = 1 + Math.sin(ms * 0.0008);
  });
  if (stage.bar) {
    slider(stage.bar, 'subsurfaceIntensity', [0, 3, 0.05], 0.5, (v) => (water.subsurfaceIntensity = v));
    slider(stage.bar, 'subsurfaceCrestHeight (m)', [0.2, 4, 0.1], 1.5, (v) => (water.subsurfaceCrestHeight = v));
    color(stage.bar, 'subsurfaceTint', '#dbfab5', (r, g, b) => water.subsurfaceTint.setXYZ(r, g, b));
    slider(stage.bar, 'wave amplitude', [0.2, 2, 0.05], waves.amplitude, (v) => (waves.amplitude = v));
  } else {
    stage.caption('subsurfaceIntensity sweeps 0 to 2: backlit crests glow');
  }
  myApp.run();
});
