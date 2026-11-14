// CameraFrame bloom threshold: glow only on the brightest parts
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 11, pitch: -12, yaw: 25, autoRotate: 7, sky: false, clearColor: new pc.Color(0.02, 0.025, 0.04) });
  const { app, frame } = rig;
  app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.33);
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  // With threshold 0 everything blooms, which is the physical behaviour; raising it leaves only
  // what is brighter than the threshold (in scene units, before exposure) to glow.
  frame.bloom.intensity = 0.05;
  frame.bloom.blurLevel = 10;
  frame.bloom.threshold = 0;
  rig.apply();

  if (ctx.preview) {
    app.on('update', () => {
      frame.bloom.threshold = 0.5 + (Math.sin(t * 0.8) * 0.5 + 0.5) * 6;
      rig.apply();
    });
  } else {
    const panel = createPanel(el);
    panel.slider('bloom.intensity', 0, 0.1, 0.002, frame.bloom.intensity, (v) => rig.tweak(() => (frame.bloom.intensity = v)));
    panel.slider('bloom.threshold', 0, 8, 0.1, 0, (v) => rig.tweak(() => (frame.bloom.threshold = v)));
    panel.slider('bloom.blurLevel', 1, 16, 1, frame.bloom.blurLevel, (v) => rig.tweak(() => (frame.bloom.blurLevel = v)));
    panel.check('bloom.highQuality', false, (on) => rig.tweak(() => (frame.bloom.highQuality = on)));
    panel.readout('the neon bars reach 30; the lit surfaces stay below 1');
  }

  return () => rig.dispose();
};

export default mount;
