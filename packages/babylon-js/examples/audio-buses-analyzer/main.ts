// Two sounds mixed through an intermediate AudioBus with stereo pan and an analyzer
import {
  ArcRotateCamera,
  Color3,
  CreateAudioBusAsync,
  CreateAudioEngineAsync,
  CreateSoundAsync,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { groove, tone } from '../../shared/tones.ts';

const BANDS = 24;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 18, new Vector3(0, 2, 0), scene);
  camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.5), scene);

  const audioEngine = await CreateAudioEngineAsync({ defaultUIParentElement: el, volume: 0.6 });

  // An intermediate bus: stereo-capable, and analyzed. Its outBus defaults to the main bus.
  const mix = await CreateAudioBusAsync('mix');

  const beat = await CreateSoundAsync('groove', groove(112), { loop: true });
  const drone = await CreateSoundAsync('drone', tone(110, 2), { loop: true, volume: 0.15 });
  // Route both sounds into the bus instead of straight to the speakers.
  beat.outBus = mix;
  drone.outBus = mix;
  beat.play();
  drone.play();

  // One column per frequency band, scaled by the analyzer's byte data every frame.
  const columns = Array.from({ length: BANDS }, (_, i) => {
    const col = MeshBuilder.CreateBox(`band${i}`, { width: 0.45, depth: 0.45, height: 1 }, scene);
    col.position.x = (i - (BANDS - 1) / 2) * 0.55;
    const mat = new StandardMaterial(`band${i}`, scene);
    mat.diffuseColor = Color3.FromHSV((i / BANDS) * 260, 0.7, 1);
    col.material = mat;
    return col;
  });

  const panel = createPanel(el);
  panel.slider('mix.stereo.pan', -1, 1, 0.05, 0, (v) => (mix.stereo.pan = v));
  panel.slider('mix.volume', 0, 1.5, 0.05, mix.volume, (v) => (mix.volume = v));
  panel.slider('drone.volume', 0, 0.5, 0.01, drone.volume, (v) => (drone.volume = v));
  panel.row();
  panel.select('analyzer.fftSize', ['64', '128', '256', '512'] as const, String(mix.analyzer.fftSize) as '64', (v) => {
    mix.analyzer.fftSize = Number(v) as 64;
  });
  panel.slider('analyzer.smoothing', 0, 0.95, 0.05, mix.analyzer.smoothing, (v) => (mix.analyzer.smoothing = v));
  panel.button('route drone to main bus', () => (drone.outBus = audioEngine.defaultMainBus));
  panel.button('route drone to mix', () => (drone.outBus = mix));

  stage.run(() => {
    const data = mix.analyzer.getByteFrequencyData();
    // Spread the bands over the lower half of the spectrum, where this music lives.
    const span = Math.max(1, Math.floor(data.length / 2 / BANDS));
    columns.forEach((col, i) => {
      const v = (data[i * span] ?? 0) / 255;
      col.scaling.y = 0.1 + v * 8;
      col.position.y = col.scaling.y / 2;
    });
  });

  return () => {
    beat.dispose();
    drone.dispose();
    mix.dispose();
    audioEngine.dispose();
    stage.dispose();
  };
};

export default mount;
