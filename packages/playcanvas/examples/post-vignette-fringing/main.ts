// CameraFrame lens look: a coloured vignette and chromatic fringing
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';

const COLOURS = { black: '#000000', violet: '#1a0d33', teal: '#032a2a', rust: '#3a1306' } as const;
type ColourName = keyof typeof COLOURS;

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 11, pitch: -15, yaw: 25, autoRotate: 7 });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  const { vignette, fringing } = frame;
  vignette.intensity = 0.7;
  vignette.color.fromString(COLOURS.violet);
  vignette.inner = 0.4;
  vignette.outer = 1;
  vignette.curvature = 0.5;
  fringing.intensity = 40;
  rig.apply();

  if (ctx.preview) {
    // Cards breathe the vignette in and out and push the fringing up and down.
    app.on('update', () => {
      vignette.inner = 0.25 + (Math.sin(t * 0.9) * 0.5 + 0.5) * 0.45;
      fringing.intensity = 30 + Math.sin(t * 1.2) * 28;
      rig.apply();
    });
  } else {
    const panel = createPanel(el);
    panel.slider('vignette.intensity', 0, 1, 0.02, vignette.intensity, (v) => rig.tweak(() => (vignette.intensity = v)));
    panel.slider('inner', 0, 3, 0.02, vignette.inner, (v) => rig.tweak(() => (vignette.inner = v)));
    panel.slider('outer', 0, 3, 0.02, vignette.outer, (v) => rig.tweak(() => (vignette.outer = v)));
    panel.row();
    panel.slider('curvature', 0.01, 10, 0.01, vignette.curvature, (v) => rig.tweak(() => (vignette.curvature = v)));
    panel.select('vignette.color', Object.keys(COLOURS) as ColourName[], 'violet', (name) => rig.tweak(() => vignette.color.copy(new pc.Color().fromString(COLOURS[name]))));
    panel.slider('fringing.intensity', 0, 100, 1, fringing.intensity, (v) => rig.tweak(() => (fringing.intensity = v)));
    panel.readout('an outer value below inner reverses the vignette towards the centre');
  }

  return () => rig.dispose();
};

export default mount;
