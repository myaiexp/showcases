// GerstnerWaveGenerator: directional layered waves with a direction, amplitude, length and steepness each
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, GerstnerWaveGenerator, Scene } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 5, 16) });
  const water = makeWater(scene);

  // Four waves, each controlled by hand
  const waves = new GerstnerWaveGenerator();
  waves.numWaves = 4;
  const set = [
    [0.2, 0.4, 18, 0.6],
    [1.1, 0.25, 11, 0.5],
    [2.3, 0.15, 7, 0.4],
    [4.0, 0.1, 4, 0.5],
  ] as const;
  set.forEach(([dir, amp, len, steep], i) => {
    waves.setWaveDirection(i, dir);
    waves.setWaveAmplitude(i, amp);
    waves.setWaveLength(i, len);
    waves.setWaveSteepness(i, steep);
  });
  water.waveGenerator = waves;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms);
      waves.setWaveAmplitude(0, 0.4 + 0.15 * Math.sin(ms * 0.0007));
    }
  });
  if (stage.bar) {
    let i = 0;
    const sliders: HTMLInputElement[] = [];
    const sync = (): void => {
      const values = [waves.getWaveDirection(i), waves.getWaveAmplitude(i), waves.getWaveLength(i), waves.getWaveSteepness(i)];
      sliders.forEach((s, k) => {
        s.value = String(values[k]);
        s.dispatchEvent(new Event('input'));
      });
    };
    select(stage.bar, 'wave', ['0', '1', '2', '3'] as const, '0', (v) => {
      i = Number(v);
      sync();
    });
    sliders.push(slider(stage.bar, 'direction (rad)', [0, 6.28, 0.05], set[0][0], (v) => waves.setWaveDirection(i, v)));
    sliders.push(slider(stage.bar, 'amplitude', [0, 1, 0.01], set[0][1], (v) => waves.setWaveAmplitude(i, v)));
    sliders.push(slider(stage.bar, 'length', [2, 40, 0.5], set[0][2], (v) => waves.setWaveLength(i, v)));
    sliders.push(slider(stage.bar, 'steepness', [0, 1, 0.01], set[0][3], (v) => waves.setWaveSteepness(i, v)));
  } else {
    stage.caption('GerstnerWaveGenerator: 4 waves set by direction, amplitude, length, steepness');
  }
  myApp.run();
});
