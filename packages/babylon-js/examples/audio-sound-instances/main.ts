// Sound instances: each play() is a new instance, capped by maxInstances
import {
  ArcRotateCamera,
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
import { blip } from '../../shared/tones.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 9, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // The audio engine shows its unmute button over the canvas until a user gesture unlocks it.
  const audioEngine = await CreateAudioEngineAsync({ defaultUIParentElement: el, volume: 0.6 });

  // A source can be a URL, an ArrayBuffer or an AudioBuffer; this one is synthesized.
  const sound = await CreateSoundAsync('blip', blip(660, 0.9), { maxInstances: 2 });

  // One bar per possible instance; lit bars show how many are playing right now.
  const bars = Array.from({ length: 6 }, (_, i) => {
    const bar = MeshBuilder.CreateBox(`bar${i}`, { width: 0.8, height: 0.3, depth: 0.8 }, scene);
    bar.position.x = (i - 2.5) * 1.1;
    const mat = new StandardMaterial(`bar${i}`, scene);
    mat.diffuseColor = new Color3(0.2, 0.22, 0.3);
    bar.material = mat;
    return { bar, mat };
  });
  const lit = new Color3(1, 0.6, 0.2);
  const dark = new Color3(0.2, 0.22, 0.3);

  const panel = createPanel(el);
  const count = panel.readout();
  panel.button('play()', () => sound.play());
  const timers = new Set<ReturnType<typeof setTimeout>>();
  panel.button('play() ×3', () => {
    for (const delay of [0, 150, 300]) {
      const t = setTimeout(() => (timers.delete(t), sound.play()), delay);
      timers.add(t);
    }
  });
  panel.button('stop()', () => sound.stop());
  panel.row();
  // maxInstances applies immediately; pitch and playbackRate only to instances started afterwards.
  panel.slider('maxInstances', 1, 6, 1, sound.maxInstances, (v) => (sound.maxInstances = v));
  panel.slider('playbackRate', 0.25, 3, 0.05, sound.playbackRate, (v) => (sound.playbackRate = v));
  panel.slider('pitch (cents)', -1200, 1200, 50, sound.pitch, (v) => (sound.pitch = v));

  stage.run(() => {
    const active = sound.activeInstancesCount;
    count.textContent = `${audioEngine.state} · activeInstancesCount ${active}`;
    bars.forEach(({ bar, mat }, i) => {
      const on = i < active;
      mat.diffuseColor = on ? lit : dark;
      bar.scaling.y += ((on ? 4 : 1) - bar.scaling.y) * 0.2;
      bar.position.y = (bar.scaling.y * 0.3) / 2;
    });
  });

  return () => {
    timers.forEach(clearTimeout);
    sound.dispose();
    audioEngine.dispose();
    stage.dispose();
  };
};

export default mount;
