// SmaaEffect on a CameraFrame: single-frame edge smoothing and its presets
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig, previewToggle } from '../../shared/posteffects.ts';

// The four presets of the page, as [threshold, maxSearchSteps, maxSearchStepsDiag, cornerRounding].
const PRESETS = {
  low: [0.15, 4, 0, 100],
  medium: [0.1, 8, 0, 100],
  high: [0.1, 16, 8, 25],
  ultra: [0.05, 32, 16, 25],
} as const;
type Preset = keyof typeof PRESETS;

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 9, pitch: -14, yaw: 30, autoRotate: 5, samples: 1, target: new pc.Vec3(1, -0.4, 0) });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  // SMAA is not built into the frame: create it, add it, then update the frame.
  const smaa = rig.addEffect(new pc.SmaaEffect(app.graphicsDevice));
  const usePreset = (name: Preset): void => {
    [smaa.threshold, smaa.maxSearchSteps, smaa.maxSearchStepsDiag, smaa.cornerRounding] = PRESETS[name];
  };
  usePreset('high');
  rig.apply();

  previewToggle(app, ctx, (on) => rig.tweak(() => (smaa.enabled = on)), 2.5);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('smaa.enabled', true, (on) => rig.tweak(() => (smaa.enabled = on)));
    panel.select('preset', Object.keys(PRESETS) as Preset[], 'high', (name) =>
      rig.tweak(() => {
        usePreset(name);
        sliders.forEach((s, i) => ((s.value = String(PRESETS[name][i])), s.dispatchEvent(new Event('input'))));
      }),
    );
    panel.row();
    const sliders = [
      panel.slider('threshold', 0, 0.5, 0.01, smaa.threshold, (v) => rig.tweak(() => (smaa.threshold = v))),
      panel.slider('maxSearchSteps', 1, 112, 1, smaa.maxSearchSteps, (v) => rig.tweak(() => (smaa.maxSearchSteps = v))),
      panel.slider('maxSearchStepsDiag', 0, 20, 1, smaa.maxSearchStepsDiag, (v) => rig.tweak(() => (smaa.maxSearchStepsDiag = v))),
      panel.slider('cornerRounding', 0, 100, 1, smaa.cornerRounding, (v) => rig.tweak(() => (smaa.cornerRounding = v))),
    ];
    panel.row();
    panel.select('debug view', ['none', 'smaaedges', 'smaaweights'] as const, 'none', (v) => rig.tweak(() => (frame.debug = v === 'none' ? null : v)));
    panel.select('rendering.samples (MSAA)', ['1', '2', '4'] as const, '1', (v) => rig.tweak(() => (frame.rendering.samples = Number(v))));
  }

  return () => rig.dispose();
};

export default mount;
