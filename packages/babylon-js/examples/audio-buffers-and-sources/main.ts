// Shared sound buffer, a streaming blob-URL sound and an OscillatorNode source
import {
  ArcRotateCamera,
  Color3,
  CreateAudioEngineAsync,
  CreateSoundAsync,
  CreateSoundBufferAsync,
  CreateSoundSourceAsync,
  CreateStreamingSoundAsync,
  HemisphericLight,
  MeshBuilder,
  SoundState,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { bounce, groove, wavBlob } from '../../shared/tones.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 340 });
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Passing our own AudioContext lets us build WebAudio nodes on the engine's context.
  const audioContext = new AudioContext();
  const audioEngine = await CreateAudioEngineAsync({ audioContext, defaultUIParentElement: el, volume: 0.6 });

  // 1. One decoded buffer, shared by two sounds: no second decode.
  const buffer = await CreateSoundBufferAsync(bounce(0.5));
  const low = await CreateSoundAsync('low', buffer);
  const high = await CreateSoundAsync('high', buffer, { playbackRate: 2 });

  // 2. A streaming sound plays through an HTMLMediaElement; its source here is a blob URL.
  const url = URL.createObjectURL(wavBlob(groove(100)));
  const music = await CreateStreamingSoundAsync('music', url, { loop: true, volume: 0.5 });

  // 3. Any WebAudio node can be a source. It starts at once and streams until disposed.
  const oscillator = new OscillatorNode(audioContext, { frequency: 220, type: 'triangle' });
  oscillator.start();
  const synth = await CreateSoundSourceAsync('synth', oscillator, { volume: 0 });

  const makeOrb = (name: string, x: number, color: Color3) => {
    const orb = MeshBuilder.CreateSphere(name, { diameter: 1.3 }, scene);
    orb.position.x = x;
    const mat = new StandardMaterial(name, scene);
    mat.diffuseColor = color;
    orb.material = mat;
    return orb;
  };
  const orbs = {
    low: makeOrb('low', -3.6, new Color3(0.9, 0.5, 0.3)),
    high: makeOrb('high', -1.2, new Color3(1, 0.8, 0.3)),
    music: makeOrb('music', 1.2, new Color3(0.4, 0.8, 0.6)),
    synth: makeOrb('synth', 3.6, new Color3(0.5, 0.6, 1)),
  };
  const pulse = { low: 0, high: 0 };

  const panel = createPanel(el);
  panel.button('low (rate 1)', () => ((pulse.low = 1), low.play()));
  panel.button('high (rate 2, same buffer)', () => ((pulse.high = 1), high.play()));
  panel.button('stream: play', () => music.play());
  panel.button('stream: pause', () => music.pause());
  panel.row();
  panel.slider('synth volume', 0, 0.3, 0.01, 0, (v) => synth.setVolume(v, { duration: 0.1 }));
  panel.slider('oscillator Hz', 80, 880, 1, 220, (v) => oscillator.frequency.setTargetAtTime(v, audioContext.currentTime, 0.05));
  const state = panel.readout();

  let t = 0;
  stage.run(() => {
    t += scene.getEngine().getDeltaTime() / 1000;
    pulse.low *= 0.92;
    pulse.high *= 0.92;
    orbs.low.scaling.setAll(1 + pulse.low * 0.6);
    orbs.high.scaling.setAll(1 + pulse.high * 0.6);
    orbs.music.scaling.setAll(music.state === SoundState.Started ? 1 + Math.abs(Math.sin(t * Math.PI * 1.67)) * 0.3 : 1);
    orbs.synth.scaling.setAll(1 + synth.volume * 2 * (1 + Math.sin(t * oscillator.frequency.value * 0.02)) * 0.5);
    state.textContent = `engine ${audioEngine.state} · stream ${SoundState[music.state]}`;
  });

  return () => {
    low.dispose();
    high.dispose();
    music.dispose();
    synth.dispose();
    oscillator.stop();
    // Disposing the engine also closes the AudioContext it was given.
    audioEngine.dispose();
    URL.revokeObjectURL(url);
    stage.dispose();
  };
};

export default mount;
