// CameraFrame grading: brightness, contrast, saturation, tint, channel mixer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';

// Each preset sets the three mixer rows: how much red, green and blue go into each output channel.
const MIXERS = {
  identity: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  'swap red and blue': [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
  'black and white': [[0.5, 0.4, 0.1], [0.5, 0.4, 0.1], [0.5, 0.4, 0.1]],
  'green cast': [[0.6, 0.4, 0], [0, 1.1, 0], [0, 0.3, 0.7]],
} as const;
type MixerName = keyof typeof MIXERS;

const TINTS = { white: '#ffffff', warm: '#ffd9b0', cool: '#b8d4ff' } as const;

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 11, pitch: -15, yaw: 25, autoRotate: 7 });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  const grading = frame.grading;
  grading.enabled = true;
  const useMixer = (name: MixerName): void => {
    const [r, g, b] = MIXERS[name];
    grading.mixerRed.set(r[0], r[1], r[2]);
    grading.mixerGreen.set(g[0], g[1], g[2]);
    grading.mixerBlue.set(b[0], b[1], b[2]);
  };
  rig.apply();

  if (ctx.preview) {
    // Cards step through the mixer presets while saturation breathes.
    const names = Object.keys(MIXERS) as MixerName[];
    let current = -1;
    app.on('update', () => {
      const i = Math.floor(t / 2) % names.length;
      grading.saturation = 1 + Math.sin(t * 1.5) * 0.4;
      if (i !== current) {
        current = i;
        useMixer(names[i]!);
      }
      rig.apply();
    });
  } else {
    const panel = createPanel(el);
    panel.slider('brightness', 0, 3, 0.05, grading.brightness, (v) => rig.tweak(() => (grading.brightness = v)));
    panel.slider('contrast', 0.5, 1.5, 0.01, grading.contrast, (v) => rig.tweak(() => (grading.contrast = v)));
    panel.slider('saturation', 0, 2, 0.05, grading.saturation, (v) => rig.tweak(() => (grading.saturation = v)));
    panel.row();
    panel.select('tint', Object.keys(TINTS) as (keyof typeof TINTS)[], 'white', (name) => rig.tweak(() => (grading.tint = new pc.Color().fromString(TINTS[name]))));
    panel.select('channel mixer', Object.keys(MIXERS) as MixerName[], 'identity', (name) => rig.tweak(() => useMixer(name)));
    panel.check('grading.enabled', true, (on) => rig.tweak(() => (grading.enabled = on)));
  }

  return () => rig.dispose();
};

export default mount;
