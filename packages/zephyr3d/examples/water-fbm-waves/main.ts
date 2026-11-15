// FBMWaveGenerator: amplitude, frequency, octave count and wind direction
import { Vector2, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, FBMWaveGenerator, Scene } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 5, 16) });
  const water = makeWater(scene);

  // Fast procedural waves, a good default for stylized or general water
  const waves = new FBMWaveGenerator();
  waves.amplitude = 1.2;
  waves.frequency = 0.018;
  waves.numOctaves = 6;
  waves.wind = new Vector2(0.8, 0.4);
  water.waveGenerator = waves;

  let windAngle = Math.atan2(0.4, 0.8);
  const setWind = (a: number): void => {
    windAngle = a;
    waves.wind = new Vector2(Math.cos(a), Math.sin(a));
  };
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms);
      waves.amplitude = 1.1 + 0.5 * Math.sin(ms * 0.0006);
    }
  });
  if (stage.bar) {
    slider(stage.bar, 'amplitude', [0, 3, 0.05], waves.amplitude, (v) => (waves.amplitude = v));
    slider(stage.bar, 'frequency', [0.004, 0.08, 0.002], waves.frequency, (v) => (waves.frequency = v));
    slider(stage.bar, 'numOctaves', [1, 8, 1], waves.numOctaves, (v) => (waves.numOctaves = v));
    slider(stage.bar, 'wind angle', [0, 6.28, 0.05], windAngle, setWind);
  } else {
    stage.caption('FBMWaveGenerator: amplitude 1.2, frequency 0.018, 6 octaves');
  }
  myApp.run();
});
