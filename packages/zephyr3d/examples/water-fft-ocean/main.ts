// FFTWaveGenerator: an ocean spectrum in three cascades, with wind, foam width and contrast
import { Vector2, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, FFTWaveGenerator, Scene } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 6, 22), depth: -12 });
  const water = makeWater(scene, 400);
  water.gridScale = 1.5;

  // It allocates GPU resources and suits wide oceans better than small pools
  const waves = new FFTWaveGenerator();
  waves.wind = new Vector2(32, 18);
  waves.foamWidth = 0.4;
  waves.foamContrast = 1.5;
  water.waveGenerator = waves;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) swingCamera(camera, ms, 22, 6);
  });
  const out = stage.readout();
  const show = (): void => {
    if (out) {
      out.textContent = `isOk() ${waves.isOk()} (false: the device lacks half-float colour buffers and the water stays flat)\ncascade lengths (m): ${[0, 1, 2].map((c) => waves.getWaveLength(c).toFixed(1)).join(', ')}`;
    }
  };
  if (stage.bar) {
    let c = 0;
    const strength = slider(stage.bar, 'cascade strength', [0, 2, 0.05], waves.getWaveStrength(0), (v) => waves.setWaveStrength(c, v));
    const crop = slider(stage.bar, 'cascade croppiness', [0, 2, 0.05], waves.getWaveCroppiness(0), (v) => waves.setWaveCroppiness(c, v));
    select(stage.bar, 'cascade', ['0', '1', '2'] as const, '0', (v) => {
      c = Number(v);
      strength.value = String(waves.getWaveStrength(c));
      crop.value = String(waves.getWaveCroppiness(c));
      strength.dispatchEvent(new Event('input'));
      crop.dispatchEvent(new Event('input'));
    });
    slider(stage.bar, 'wind speed', [8, 64, 1], 32, (v) => {
      waves.wind = new Vector2(v, v * 0.56);
      show();
    });
    slider(stage.bar, 'foamWidth', [0, 1, 0.05], waves.foamWidth, (v) => (waves.foamWidth = v));
    slider(stage.bar, 'foamContrast', [0, 4, 0.1], waves.foamContrast, (v) => (waves.foamContrast = v));
    show();
  } else {
    stage.caption('FFTWaveGenerator: wind (32, 18), three cascades');
  }
  myApp.run();
});
