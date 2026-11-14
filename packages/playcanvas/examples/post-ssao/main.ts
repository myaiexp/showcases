// CameraFrame SSAO: ambient occlusion in creases, in two modes
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig, previewToggle } from '../../shared/posteffects.ts';

const TYPES = { SSAOTYPE_NONE: pc.SSAOTYPE_NONE, SSAOTYPE_LIGHTING: pc.SSAOTYPE_LIGHTING, SSAOTYPE_COMBINE: pc.SSAOTYPE_COMBINE } as const;
type TypeName = keyof typeof TYPES;

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 8, pitch: -22, yaw: 20, autoRotate: 8, target: new pc.Vec3(0, -0.5, 0) });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  // SSAO is off while the type is SSAOTYPE_NONE. COMBINE multiplies the occlusion over the
  // finished image; LIGHTING feeds it into the lit materials' ambient term instead.
  frame.ssao.type = pc.SSAOTYPE_COMBINE;
  frame.ssao.intensity = 0.8;
  frame.ssao.radius = 20;
  frame.ssao.power = 5;
  rig.apply();

  previewToggle(app, ctx, (on) => {
    frame.ssao.type = on ? pc.SSAOTYPE_COMBINE : pc.SSAOTYPE_NONE;
    rig.apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('ssao.type', Object.keys(TYPES) as TypeName[], 'SSAOTYPE_COMBINE', (name) => rig.tweak(() => (frame.ssao.type = TYPES[name])));
    panel.slider('intensity', 0, 1, 0.05, frame.ssao.intensity, (v) => rig.tweak(() => (frame.ssao.intensity = v)));
    panel.slider('radius', 1, 100, 1, frame.ssao.radius, (v) => rig.tweak(() => (frame.ssao.radius = v)));
    panel.row();
    panel.slider('power', 0.1, 10, 0.1, frame.ssao.power, (v) => rig.tweak(() => (frame.ssao.power = v)));
    panel.slider('samples', 1, 64, 1, frame.ssao.samples, (v) => rig.tweak(() => (frame.ssao.samples = v)));
    panel.check('blurEnabled', frame.ssao.blurEnabled, (on) => rig.tweak(() => (frame.ssao.blurEnabled = on)));
  }

  return () => rig.dispose();
};

export default mount;
