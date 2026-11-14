// CameraFrame volumetricFog with a directional light: height fog and sun shafts
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, pbrMaterial } from '../../shared/pbr.ts';
import { createPostRig } from '../../shared/posteffects.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { sky: false, distance: 12, pitch: -6, yaw: 0, autoRotate: 0, clearColor: new pc.Color(0.05, 0.07, 0.1), target: new pc.Vec3(0, 1, 0), samples: 1 });
  const { app, frame, sunLight } = rig;
  app.scene.ambientLight = new pc.Color(0.2, 0.23, 0.3);

  // The sun faces the camera, low over the horizon, with pillars between it and the fog.
  const sun = sunLight!.light!;
  sunLight!.setEulerAngles(28, 180, 0);
  sun.intensity = 3;
  sun.shadowDistance = 70;

  addMesh(app, 'plane', pbrMaterial('#3c4250', { gloss: 0.3 }), [0, 0, -4], [40, 1, 40]);
  const stone = pbrMaterial('#b8bcc8', { gloss: 0.3 });
  [-6, -3, 0, 3, 6].forEach((x, i) => addMesh(app, 'box', stone, [x, 3, -6 - (i % 2) * 2], [1.1, 6, 1.1]));
  addMesh(app, 'sphere', pbrMaterial('#e8794a', { gloss: 0.6 }), [-1.5, 0.8, 1], 1.6);
  addMesh(app, 'sphere', pbrMaterial('#4ab3e8', { gloss: 0.6 }), [1.8, 0.8, 2.5], 1.6);

  // Fog is lit by the sun component. TAA smooths the ray-march noise over time (doc advice).
  const fog = frame.volumetricFog;
  fog.enabled = true;
  fog.light = sun;
  fog.density = 0.03;
  fog.heightBase = 0;
  fog.heightFalloff = 0.12;
  fog.anisotropy = 0.7;
  fog.maxDistance = 80;
  frame.taa.enabled = true;
  rig.apply();

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    // sway the view a little so the shafts slide behind the pillars
    rig.orbit.yaw = Math.sin(t * 0.35) * 22;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('volumetricFog.enabled', true, (on) => rig.tweak(() => (fog.enabled = on)));
    panel.slider('density', 0, 0.1, 0.002, fog.density, (v) => rig.tweak(() => (fog.density = v)));
    panel.slider('heightFalloff', 0, 0.5, 0.01, fog.heightFalloff, (v) => rig.tweak(() => (fog.heightFalloff = v)));
    panel.row();
    panel.slider('anisotropy', 0, 0.95, 0.01, fog.anisotropy, (v) => rig.tweak(() => (fog.anisotropy = v)));
    panel.slider('intensity', 0, 4, 0.05, fog.intensity, (v) => rig.tweak(() => (fog.intensity = v)));
    panel.slider('steps', 4, 128, 1, fog.steps, (v) => rig.tweak(() => (fog.steps = v)));
    panel.slider('sun elevation', 5, 60, 1, 28, (v) => sunLight!.setEulerAngles(v, 180, 0));
    panel.check('taa.enabled', true, (on) => rig.tweak(() => (frame.taa.enabled = on)));
  }

  return () => rig.dispose();
};

export default mount;
