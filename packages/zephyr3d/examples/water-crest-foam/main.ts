// Crest foam: where the surface folds over, mapped to coverage by foamAmount, foamFalloff and foamColor
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, GerstnerWaveGenerator, Scene } from '@zephyr3d/scene';
import { color, slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 4.5, 15), depth: -8 });
  const water = makeWater(scene);

  // Steep Gerstner waves fold over and feed the foam
  const waves = new GerstnerWaveGenerator();
  waves.numWaves = 3;
  [
    [0.3, 0.7, 16, 0.95],
    [1.0, 0.45, 10, 0.9],
    [2.0, 0.3, 6, 0.85],
  ].forEach(([dir, amp, len, steep], i) => {
    waves.setWaveDirection(i, dir!);
    waves.setWaveAmplitude(i, amp!);
    waves.setWaveLength(i, len!);
    waves.setWaveSteepness(i, steep!);
  });
  waves.foamWidth = 0.4;
  waves.foamContrast = 1.5;
  water.waveGenerator = waves;

  // How much folding becomes foam, how sharply, and what colour
  water.foamAmount = 1;
  water.foamFalloff = 1.5;
  water.foamColor = new Vector3(0.92, 0.95, 0.97);

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms, 15, 4.5);
      water.foamAmount = 1.2 + 1.1 * Math.sin(ms * 0.0007);
    }
  });
  if (stage.bar) {
    slider(stage.bar, 'foamAmount', [0, 3, 0.05], 1, (v) => (water.foamAmount = v));
    slider(stage.bar, 'foamFalloff', [0.5, 4, 0.1], 1.5, (v) => (water.foamFalloff = v));
    color(stage.bar, 'foamColor', '#ebf2f7', (r, g, b) => water.foamColor.setXYZ(r, g, b));
    slider(stage.bar, 'generator foamWidth', [0, 1, 0.05], 0.4, (v) => (waves.foamWidth = v));
    slider(stage.bar, 'generator foamContrast', [0, 4, 0.1], 1.5, (v) => (waves.foamContrast = v));
  } else {
    stage.caption('foamAmount sweeps 0 to 2.3 over steep Gerstner waves');
  }
  myApp.run();
});
