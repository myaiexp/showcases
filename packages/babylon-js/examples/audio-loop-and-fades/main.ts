// Three tones looped three ways and faded with setVolume ramp shapes
import {
  ArcRotateCamera,
  AudioParameterRampShape,
  Color3,
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
import { tone } from '../../shared/tones.ts';

const SHAPES = [
  AudioParameterRampShape.Linear,
  AudioParameterRampShape.Exponential,
  AudioParameterRampShape.Logarithmic,
  AudioParameterRampShape.None,
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 8, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  const audioEngine = await CreateAudioEngineAsync({ defaultUIParentElement: el });
  audioEngine.volume = 0.5;

  // Loop way 1: the `loop` option at creation.
  const root = await CreateSoundAsync('A3', tone(220, 1), { loop: true, volume: 0.2 });
  // Loop way 2: the `loop` property, set before play().
  const third = await CreateSoundAsync('C#4', tone(277.18, 1), { volume: 0.2 });
  third.loop = true;
  // Loop way 3: the `loop` option of play() itself (below).
  const fifth = await CreateSoundAsync('E4', tone(329.63, 1), { volume: 0.2 });

  // A looping sound whose play() was called while the engine is locked starts once it unlocks.
  root.play();
  third.play();
  fifth.play({ loop: true });

  const sounds = [root, third, fifth];
  const colors = [new Color3(0.9, 0.4, 0.3), new Color3(0.4, 0.8, 0.5), new Color3(0.4, 0.6, 1)];
  const orbs = sounds.map((s, i) => {
    const orb = MeshBuilder.CreateSphere(s.name, { diameter: 1.4 }, scene);
    orb.position.x = (i - 1) * 2.4;
    const mat = new StandardMaterial(s.name, scene);
    mat.diffuseColor = colors[i]!;
    orb.material = mat;
    return orb;
  });

  const panel = createPanel(el);
  let shape: AudioParameterRampShape = AudioParameterRampShape.Logarithmic;
  let duration = 2;
  panel.select('shape', SHAPES, shape, (v) => (shape = v));
  panel.slider('duration (s)', 0, 5, 0.25, duration, (v) => (duration = v));
  panel.slider('audioEngine.volume', 0, 1, 0.05, audioEngine.volume, (v) => (audioEngine.volume = v));
  sounds.forEach((s) => {
    panel.row();
    panel.readout(s.name);
    panel.button('fade in', () => s.setVolume(0.2, { duration, shape }));
    panel.button('fade out', () => s.setVolume(0, { duration, shape }));
  });
  const state = panel.readout();

  // The orbs ease toward each sound's target volume, so a fade reads as a slow shrink.
  stage.run(() => {
    state.textContent = `engine ${audioEngine.state}`;
    orbs.forEach((orb, i) => {
      const target = 0.3 + (sounds[i]!.volume / 0.2) * 0.9;
      const s = orb.scaling.x + (target - orb.scaling.x) * 0.05;
      orb.scaling.setAll(s);
    });
  });

  return () => {
    sounds.forEach((s) => s.dispose());
    audioEngine.dispose();
    stage.dispose();
  };
};

export default mount;
