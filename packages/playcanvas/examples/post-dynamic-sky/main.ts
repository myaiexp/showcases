// DynamicSkyEffect: day and night cycle, clouds, synced light and haze
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, pbrMaterial } from '../../shared/pbr.ts';
import { createPostRig } from '../../shared/posteffects.ts';

const CLOUDS = { CLOUDTYPE_NONE: pc.CLOUDTYPE_NONE, CLOUDTYPE_FLAT: pc.CLOUDTYPE_FLAT, CLOUDTYPE_VOLUMETRIC: pc.CLOUDTYPE_VOLUMETRIC } as const;
type CloudName = keyof typeof CLOUDS;

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { sky: false, distance: 15, pitch: -4, yaw: 20, autoRotate: 2.5, target: new pc.Vec3(0, 2, 0), samples: 1 });
  const { app, frame, sunLight } = rig;

  addMesh(app, 'plane', pbrMaterial('#6d7a5a', { gloss: 0.2 }), [0, 0, 0], [120, 1, 120]);
  const stone = pbrMaterial('#c8c4bb', { gloss: 0.3 });
  addMesh(app, 'box', stone, [0, 1.5, 0], [3, 3, 3]);
  addMesh(app, 'cone', stone, [-5, 2.5, -2], [3, 5, 3]);
  addMesh(app, 'cylinder', stone, [5, 2, -3], [2, 4, 2]);
  addMesh(app, 'sphere', pbrMaterial('#d96c4a', { gloss: 0.6 }), [2.5, 0.8, 3.2], 1.6);

  // The sky is an effect: created, given the directional light it keeps in sync, and added.
  const sky = rig.addEffect(new pc.DynamicSkyEffect(app.graphicsDevice));
  sky.light = sunLight!.light!;
  sky.cloudType = ctx.preview ? pc.CLOUDTYPE_FLAT : pc.CLOUDTYPE_VOLUMETRIC;
  sky.cloudCoverage = 0.5;
  sky.windSpeed = 6;
  sky.azimuth = 130;
  sky.haze = true;
  sky.hazeDensity = 0.002;
  sky.hazeHeight = 40;
  rig.apply();

  // A day and night cycle moves the sun and updates the frame every frame, as the page shows.
  let cycle = true;
  let time = ctx.preview ? 0 : 0.5;
  let rate = ctx.preview ? 0.25 : 0.08;
  let elevation = 35;
  app.on('update', (dt: number) => {
    if (cycle) {
      time += dt * rate;
      elevation = Math.sin(time) * 55;
    }
    sky.elevation = elevation;
    frame.update();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('day and night cycle', true, (on) => (cycle = on));
    panel.slider('cycle speed', 0.02, 0.5, 0.01, rate, (v) => (rate = v));
    panel.slider('elevation (cycle off)', -30, 80, 1, elevation, (v) => {
      cycle = false;
      elevation = v;
    });
    panel.slider('azimuth', 0, 360, 1, sky.azimuth, (v) => (sky.azimuth = v));
    panel.row();
    panel.select('cloudType', Object.keys(CLOUDS) as CloudName[], 'CLOUDTYPE_VOLUMETRIC', (name) => (sky.cloudType = CLOUDS[name]));
    panel.slider('cloudCoverage', 0, 1, 0.01, sky.cloudCoverage, (v) => (sky.cloudCoverage = v));
    panel.slider('windSpeed', 0, 30, 0.5, sky.windSpeed, (v) => (sky.windSpeed = v));
    panel.row();
    panel.slider('turbidity', 1, 20, 0.5, sky.turbidity, (v) => (sky.turbidity = v));
    panel.slider('starBrightness', 0, 2, 0.05, sky.starBrightness, (v) => (sky.starBrightness = v));
    panel.check('haze', true, (on) => (sky.haze = on));
    panel.slider('hazeDensity', 0, 0.01, 0.0002, sky.hazeDensity, (v) => (sky.hazeDensity = v));
  }

  return () => rig.dispose();
};

export default mount;
