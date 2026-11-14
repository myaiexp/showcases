// Scene environment: skyboxMip, intensity, rotation, exposure
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sun: false, distance: 7.5, pitch: -6, autoRotate: 0 });
  const { app } = rig;
  const scene = app.scene;

  addMesh(app, 'sphere', pbrMaterial('#ffffff', { metalness: 1, gloss: 1 }), [-1.7, 0, 0], 2.6);
  addMesh(app, 'sphere', pbrMaterial('#c8402e', { gloss: 0.6 }), [1.7, 0, 0], 2.6);

  // The environment turns around the scene while the camera stays put: reflections follow it.
  let spin = true;
  let yaw = 0;
  const rotate = new pc.Quat();
  const setRotation = (deg: number): void => {
    rotate.setFromEulerAngles(0, deg, 0);
    scene.skyboxRotation = rotate;
  };
  app.on('update', (dt: number) => {
    if (!spin) return;
    yaw = (yaw + 12 * dt) % 360;
    setRotation(yaw);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('skyboxMip (blurs the background only)', 0, 5, 0.1, 0, (v) => (scene.skyboxMip = v));
    panel.slider('skyboxIntensity', 0, 3, 0.05, 1, (v) => (scene.skyboxIntensity = v));
    panel.slider('exposure', 0.2, 3, 0.05, 1, (v) => (scene.exposure = v));
    panel.row();
    panel.check('auto rotate environment', true, (on) => (spin = on));
    panel.slider('skyboxRotation (deg)', 0, 360, 1, 0, (v) => {
      spin = false;
      yaw = v;
      setRotation(v);
    });
    panel.select('sky.type', [pc.SKYTYPE_INFINITE, pc.SKYTYPE_BOX, pc.SKYTYPE_DOME], pc.SKYTYPE_INFINITE, (type) => (scene.sky.type = type));
  }
  return () => rig.dispose();
};

export default mount;
