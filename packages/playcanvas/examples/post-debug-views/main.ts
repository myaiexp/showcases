// CameraFrame debug views: look at the intermediate results of each effect
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';

const VIEWS = ['final image', 'scene', 'ssao', 'bloom', 'vignette', 'dofcoc', 'dofblur', 'depth'] as const;
type View = (typeof VIEWS)[number];

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 9, pitch: -14, yaw: 0, autoRotate: 0, target: new pc.Vec3(-1, -0.4, 0) });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  // Debug views show an effect's result, but do not enable it: switch the effects on first.
  frame.ssao.type = pc.SSAOTYPE_COMBINE;
  frame.ssao.intensity = 0.8;
  frame.ssao.radius = 20;
  frame.bloom.intensity = 0.04;
  frame.vignette.intensity = 0.6;
  frame.dof.enabled = true;
  frame.dof.focusDistance = 10;
  frame.dof.focusRange = 3;
  frame.dof.blurRadius = 6;
  rig.apply();

  const show = (view: View): void => {
    frame.debug = view === 'final image' ? null : view;
    rig.apply();
  };

  if (ctx.preview) {
    let current = -1;
    app.on('update', () => {
      const i = Math.floor(t / 1.8) % VIEWS.length;
      if (i !== current) show(VIEWS[(current = i)]!);
    });
  } else {
    const panel = createPanel(el);
    panel.select('cameraFrame.debug', VIEWS, 'final image', show);
    panel.readout('ssao, bloom, vignette and dof are all on; each view shows one intermediate');
  }

  return () => rig.dispose();
};

export default mount;
