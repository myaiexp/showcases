// CameraFrame renderTargetScale: low-resolution scene, bilinear or TAA upscale
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';

const MODES = ['full resolution', 'scaled, bilinear', 'scaled, TAA upscale', 'scaled, TAA upscale + sharpness'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 9, pitch: -14, yaw: 30, autoRotate: 5, samples: 1, target: new pc.Vec3(1, -0.4, 0) });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  let scale = 0.4;

  const setMode = (mode: Mode): void => {
    const scaled = mode !== 'full resolution';
    frame.rendering.renderTargetScale = scaled ? scale : 1;
    frame.taa.enabled = mode.includes('TAA');
    frame.taa.upscale = mode.includes('TAA');
    frame.rendering.sharpness = mode.includes('sharpness') ? 0.5 : 0;
    frame.update();
  };
  setMode('scaled, TAA upscale');

  let modeIndex = 2;
  let auto = ctx.preview;
  app.on('update', (dt: number) => {
    scene.animate((t += dt));
    if (auto) {
      const next = Math.floor(t / 2.2) % MODES.length;
      if (next !== modeIndex) setMode(MODES[(modeIndex = next)]!);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('mode', MODES, 'scaled, TAA upscale', (mode) => {
      auto = false;
      setMode(MODES[(modeIndex = MODES.indexOf(mode))]!);
    });
    panel.slider('renderTargetScale', 0.2, 1, 0.05, scale, (v) => {
      scale = v;
      setMode(MODES[modeIndex]!);
    });
  }

  return () => rig.dispose();
};

export default mount;
