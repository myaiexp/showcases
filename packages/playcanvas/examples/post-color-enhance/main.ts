// CameraFrame colorEnhance: shadows, highlights, midtones, vibrance and dehaze
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 11, pitch: -15, yaw: 25, autoRotate: 7 });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  const enhance = frame.colorEnhance;
  enhance.enabled = true;
  rig.apply();

  if (ctx.preview) {
    // Cards sweep each adjustment in turn, one band of the tonal range after another.
    app.on('update', () => {
      const phase = Math.floor(t / 2.5) % 3;
      const s = Math.sin(t * 1.3);
      enhance.shadows = phase === 0 ? s * 2 : 0;
      enhance.highlights = phase === 1 ? s * 1.5 : 0;
      enhance.vibrance = phase === 2 ? s : 0;
      rig.apply();
    });
  } else {
    const panel = createPanel(el);
    panel.slider('shadows', -3, 3, 0.05, 0, (v) => rig.tweak(() => (enhance.shadows = v)));
    panel.slider('highlights', -3, 3, 0.05, 0, (v) => rig.tweak(() => (enhance.highlights = v)));
    panel.slider('midtones', -1, 1, 0.02, 0, (v) => rig.tweak(() => (enhance.midtones = v)));
    panel.row();
    panel.slider('vibrance', -1, 1, 0.02, 0, (v) => rig.tweak(() => (enhance.vibrance = v)));
    panel.slider('dehaze', -1, 1, 0.02, 0, (v) => rig.tweak(() => (enhance.dehaze = v)));
    panel.check('colorEnhance.enabled', true, (on) => rig.tweak(() => (enhance.enabled = on)));
  }

  return () => rig.dispose();
};

export default mount;
