// CameraFrame temporal anti-aliasing: jitter, history, sharpness
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig, previewToggle } from '../../shared/posteffects.ts';

const mount: Mount = async (el, ctx) => {
  // MSAA is left off (samples 1) so the edges are only smoothed by TAA, or not at all.
  const rig = await createPostRig(el, ctx, { distance: 9, pitch: -14, yaw: 30, autoRotate: 5, samples: 1, target: new pc.Vec3(1, -0.4, 0) });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  frame.taa.enabled = true;
  frame.taa.jitter = 1;
  frame.rendering.sharpness = 0.3;
  rig.apply();

  previewToggle(app, ctx, (on) => rig.tweak(() => (frame.taa.enabled = on)), 2.5);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('taa.enabled', true, (on) => rig.tweak(() => (frame.taa.enabled = on)));
    panel.slider('taa.jitter', 0, 1, 0.05, 1, (v) => rig.tweak(() => (frame.taa.jitter = v)));
    panel.slider('rendering.sharpness', 0, 1, 0.05, 0.3, (v) => rig.tweak(() => (frame.rendering.sharpness = v)));
    panel.select('rendering.samples (MSAA)', ['1', '2', '4'] as const, '1', (v) => rig.tweak(() => (frame.rendering.samples = Number(v))));
    panel.readout('zoom in on the capsule and box edges while the camera drifts');
  }

  return () => rig.dispose();
};

export default mount;
