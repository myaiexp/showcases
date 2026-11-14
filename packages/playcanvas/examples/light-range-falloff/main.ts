// Omni light range and falloffMode: linear against inverse squared
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 12, pitch: -40, autoRotate: 8 }, floor: 24, ambient: '#0e1016' });
  const { app } = scene;

  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      if ((x + z) % 2) continue;
      addShape(app.root, 'cylinder', material('#c9ced9'), [x * 2.2, 0.4, z * 2.2], [1, 0.8, 1]);
    }
  }

  const lamp = new pc.Entity('lamp');
  lamp.addComponent('light', { type: 'omni', range: 8, intensity: 3, falloffMode: pc.LIGHTFALLOFF_LINEAR, color: new pc.Color(1, 0.8, 0.55) });
  lamp.setPosition(0, 2.2, 0);
  app.root.addChild(lamp);
  const bulb = addShape(lamp, 'sphere', material('#000000', { emissive: '#ffd89a' }), [0, 0, 0], 0.35);
  bulb.render!.castShadows = false;

  const light = lamp.light!;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    lamp.setPosition(Math.sin(t * 0.6) * 5, 2.2, Math.cos(t * 0.45) * 5);
    if (ctx.preview) {
      light.range = 6 + Math.sin(t) * 3;
      light.falloffMode = Math.floor(t / 4) % 2 ? pc.LIGHTFALLOFF_INVERSESQUARED : pc.LIGHTFALLOFF_LINEAR;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('range', 1, 20, 0.5, 8, (v) => (light.range = v));
    panel.slider('intensity', 0, 20, 0.1, 3, (v) => (light.intensity = v));
    panel.select('falloffMode', ['linear', 'inverse squared'], 'linear', (v) => (light.falloffMode = v === 'linear' ? pc.LIGHTFALLOFF_LINEAR : pc.LIGHTFALLOFF_INVERSESQUARED));
    panel.row();
    panel.readout('Range is where the light reaches zero. Inverse squared falls fast, so it needs more intensity.');
  }

  return () => scene.dispose();
};

export default mount;
