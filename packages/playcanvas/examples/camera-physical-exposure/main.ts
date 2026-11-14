// Physical exposure: aperture, shutter and sensitivity with scene.physicalUnits on
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;

  // Light intensities are now physical: the sun is about 100000 lux, and the camera exposes for it.
  app.scene.physicalUnits = true;
  app.scene.ambientLuminance = 20000;
  app.scene.ambientLight = new pc.Color(0.5, 0.55, 0.65);
  addSun(app, 55, 30, { luminance: 100000, castShadows: true, shadowDistance: 20 });
  addGround(app, '#8a8f99', 16);
  for (let i = 0; i < 5; i++) addShape(app, i % 2 ? 'sphere' : 'box', ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'][i]!, [(i - 2) * 2.2, 0.8, 0], 1.6);

  const camera = addCamera(app, { clearColor: new pc.Color(0.5, 0.6, 0.75), toneMapping: pc.TONEMAP_ACES });
  const cam = camera.camera!;
  cam.aperture = 16; // f-stops: higher means less exposure
  cam.shutter = 1 / 1000; // seconds: longer means more exposure
  cam.sensitivity = 1000; // ISO: higher means more exposure
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0.8, 0), distance: 11, pitch: -22, autoRotate: 6, interactive: !ctx.preview });

  // Cards open and close the aperture so the exposure change shows by itself.
  let t = 0;
  app.on('update', (dt: number) => {
    if (!ctx.preview) return;
    t += dt;
    cam.aperture = 16 * Math.pow(2, -Math.sin(t * 0.8) * 1.5);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('aperture (f-stops)', 1.4, 32, 0.1, cam.aperture, (v) => (cam.aperture = v));
    panel.slider('shutter (1/x s)', 15, 4000, 5, 1 / cam.shutter, (v) => (cam.shutter = 1 / v));
    panel.slider('sensitivity (ISO)', 100, 6400, 50, cam.sensitivity, (v) => (cam.sensitivity = v));
    panel.row();
    panel.check('physicalUnits', true, (on) => (app.scene.physicalUnits = on));
    panel.slider('scene.exposure (when off)', 0.1, 4, 0.1, app.scene.exposure, (v) => (app.scene.exposure = v));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
