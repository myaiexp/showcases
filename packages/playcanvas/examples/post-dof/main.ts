// CameraFrame depth of field: focus racked along a row of spheres
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';

const mount: Mount = async (el, ctx) => {
  // Fixed camera on the +Z axis: the six spheres sit 8 to 20 units in front of it.
  const rig = await createPostRig(el, ctx, { distance: 12, pitch: -7, yaw: 0, autoRotate: 0, target: new pc.Vec3(-1.5, -0.3, 0) });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;
  app.on('update', (dt: number) => scene.animate((t += dt)));

  frame.dof.enabled = true;
  frame.dof.focusDistance = 12;
  frame.dof.focusRange = 3;
  frame.dof.blurRadius = 6;
  frame.dof.blurRings = 4;
  frame.dof.blurRingPoints = 5;
  rig.apply();

  let racking = true;
  app.on('update', () => {
    if (!racking) return;
    // rack the focus back and forth along the row (the settings take effect on update())
    frame.dof.focusDistance = 14 + Math.sin(t * 0.6) * 6;
    rig.apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('rack focus automatically', true, (on) => (racking = on));
    panel.slider('focusDistance', 6, 24, 0.1, 12, (v) => {
      racking = false;
      rig.tweak(() => (frame.dof.focusDistance = v));
    });
    panel.slider('focusRange', 0.5, 12, 0.1, 3, (v) => rig.tweak(() => (frame.dof.focusRange = v)));
    panel.row();
    panel.slider('blurRadius', 1, 12, 0.5, 6, (v) => rig.tweak(() => (frame.dof.blurRadius = v)));
    panel.slider('blurRings', 3, 8, 1, 4, (v) => rig.tweak(() => (frame.dof.blurRings = v)));
    panel.slider('blurRingPoints', 3, 8, 1, 5, (v) => rig.tweak(() => (frame.dof.blurRingPoints = v)));
    panel.check('nearBlur', false, (on) => rig.tweak(() => (frame.dof.nearBlur = on)));
    panel.check('highQuality', true, (on) => rig.tweak(() => (frame.dof.highQuality = on)));
  }

  return () => rig.dispose();
};

export default mount;
