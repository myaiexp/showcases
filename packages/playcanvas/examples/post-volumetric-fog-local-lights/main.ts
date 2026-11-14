// CameraFrame volumetricFog with spot and omni lights: scattering beams
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, pbrMaterial } from '../../shared/pbr.ts';
import { createPostRig } from '../../shared/posteffects.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { sky: false, sun: false, distance: 14, pitch: -8, yaw: 0, autoRotate: 0, clearColor: new pc.Color(0.01, 0.012, 0.02), target: new pc.Vec3(0, 1.5, 0), samples: 1 });
  const { app, frame } = rig;
  app.scene.ambientLight = new pc.Color(0.03, 0.035, 0.05);

  addMesh(app, 'plane', pbrMaterial('#3c4250', { gloss: 0.4 }), [0, 0, 0], [30, 1, 30]);
  const stone = pbrMaterial('#aeb3c0', { gloss: 0.3 });
  [-4.5, 0, 4.5].forEach((x) => addMesh(app, 'box', stone, [x, 1.6, -1], [1.2, 3.2, 1.2]));

  // Two spot lights hung high, aimed down at the floor, and an omni lamp drifting between the boxes.
  const spotLight = (x: number, hex: string): pc.Entity => {
    const e = new pc.Entity('spot');
    e.addComponent('light', { type: 'spot', color: new pc.Color().fromString(hex), intensity: 6, range: 22, innerConeAngle: 12, outerConeAngle: 30, castShadows: true, shadowResolution: 1024 });
    e.setPosition(x, 9, 4);
    e.lookAt(x * 0.4, 0, -1);
    app.root.addChild(e);
    return e;
  };
  const spots = [spotLight(-4, '#ffd9a0'), spotLight(4, '#a0c8ff')];
  const lamp = new pc.Entity('lamp');
  lamp.addComponent('light', { type: 'omni', color: new pc.Color(1, 0.35, 0.7), intensity: 4, range: 9, castShadows: true, shadowResolution: 512 });
  app.root.addChild(lamp);

  // volumetricFog.light stays null: only local lights light the fog
  const fog = frame.volumetricFog;
  fog.enabled = true;
  fog.light = null;
  fog.localSpotLights = true;
  fog.localOmniLights = true;
  fog.localIntensity = 2;
  fog.localSteps = 16;
  fog.density = 0.05;
  fog.heightFalloff = 0.04;
  fog.maxDistance = 60;
  frame.taa.enabled = true;
  rig.apply();

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    lamp.setPosition(Math.sin(t * 0.7) * 5, 1.8, 2 + Math.cos(t * 0.5) * 2);
    spots.forEach((s, i) => s.lookAt(Math.sin(t * 0.5 + i * 2) * 3, 0, -1));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('localSpotLights', true, (on) => rig.tweak(() => (fog.localSpotLights = on)));
    panel.check('localOmniLights', true, (on) => rig.tweak(() => (fog.localOmniLights = on)));
    panel.slider('localIntensity', 0, 6, 0.1, fog.localIntensity, (v) => rig.tweak(() => (fog.localIntensity = v)));
    panel.slider('localSteps', 2, 64, 1, fog.localSteps, (v) => rig.tweak(() => (fog.localSteps = v)));
    panel.row();
    panel.slider('density', 0, 0.15, 0.005, fog.density, (v) => rig.tweak(() => (fog.density = v)));
    panel.slider('spot volumetricScattering', 0, 4, 0.1, 1, (v) => spots.forEach((s) => (s.light!.volumetricScattering = v)));
    panel.slider('omni volumetricScattering', 0, 4, 0.1, 1, (v) => (lamp.light!.volumetricScattering = v));
  }

  return () => rig.dispose();
};

export default mount;
