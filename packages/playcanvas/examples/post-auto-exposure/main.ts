// AutoExposureEffect on a CameraFrame: exposure adapts as the light swings
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { sky: false, distance: 11, pitch: -15, yaw: 25, autoRotate: 6, clearColor: new pc.Color(0.1, 0.12, 0.16) });
  const { app, frame, sunLight } = rig;
  app.scene.ambientLight = new pc.Color(0.15, 0.16, 0.2);
  const scene = buildTestScene(app);
  const sun = sunLight!.light!;

  // The effect needs tone mapping (the frame has one). It is not built in: create and add it.
  const autoExposure = rig.addEffect(new pc.AutoExposureEffect(app.graphicsDevice));
  autoExposure.speedDarkToLight = 2.5;
  autoExposure.speedLightToDark = 0.8;
  autoExposure.minEv = -4;
  autoExposure.maxEv = 4;
  rig.apply();

  // Light levels swing between a dim interior and bright daylight; the exposure follows.
  let level = true;
  let manual: number | null = null;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    scene.animate(t);
    if (manual === null) level = Math.sin(t * 0.55) > 0;
    const target = manual ?? (level ? 3.5 : 0.08);
    sun.intensity += (target - sun.intensity) * Math.min(1, dt * 5);
    app.scene.ambientLight = new pc.Color(0.03 + sun.intensity * 0.05, 0.035 + sun.intensity * 0.05, 0.05 + sun.intensity * 0.06);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const readout = panel.readout();
    const histogram = document.createElement('canvas');
    histogram.width = 256;
    histogram.height = 40;
    Object.assign(histogram.style, { width: '256px', height: '40px', background: 'var(--bg-sunken, #0003)' });
    panel.el.append(histogram);
    const g = histogram.getContext('2d')!;
    app.on('update', () => {
      readout.textContent = `exposure ${autoExposure.exposure.toFixed(3)}   sun intensity ${sun.intensity.toFixed(2)}`;
      const bins = autoExposure.histogram;
      const peak = Math.max(1, ...bins);
      g.clearRect(0, 0, 256, 40);
      g.fillStyle = '#4ab3e8';
      bins.forEach((v, i) => g.fillRect(i * 4, 40 - (v / peak) * 40, 3, (v / peak) * 40));
    });
    panel.row();
    panel.check('swing the light automatically', true, (on) => (manual = on ? null : sun.intensity));
    panel.slider('compensation (EV)', -3, 3, 0.1, 0, (v) => rig.tweak(() => (autoExposure.compensation = v)));
    panel.slider('centerWeight', 0, 1, 0.05, autoExposure.centerWeight, (v) => rig.tweak(() => (autoExposure.centerWeight = v)));
    panel.slider('speedDarkToLight', 0.2, 8, 0.1, 2.5, (v) => rig.tweak(() => (autoExposure.speedDarkToLight = v)));
    panel.slider('speedLightToDark', 0.2, 8, 0.1, 0.8, (v) => rig.tweak(() => (autoExposure.speedLightToDark = v)));
    panel.button('reset()', () => autoExposure.reset());
    panel.check('autoexposure debug view', false, (on) => rig.tweak(() => (frame.debug = on ? 'autoexposure' : null)));
  }

  return () => rig.dispose();
};

export default mount;
