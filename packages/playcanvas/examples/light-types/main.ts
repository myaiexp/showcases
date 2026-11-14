// Light type: directional, omni and spot lights over the same scene
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const TYPES = ['directional', 'omni', 'spot'] as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 11, pitch: -32, autoRotate: 10 }, floor: 14, ambient: '#14161e' });
  const { app } = scene;

  const cols = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'];
  cols.forEach((c, i) => addShape(app.root, i % 2 ? 'sphere' : 'box', material(c), [(i - 2) * 2.2, 0.6, 0], 1.2));

  // One entity whose light component changes type. A light shines along its -Y axis.
  const lamp = new pc.Entity('lamp');
  lamp.addComponent('light', { type: 'omni', range: 12, intensity: 2, outerConeAngle: 40, innerConeAngle: 20, color: new pc.Color(1, 0.95, 0.85) });
  app.root.addChild(lamp);
  const bulb = addShape(lamp, 'sphere', material('#000000', { emissive: '#ffe9b0' }), [0, 0, 0], 0.3);
  bulb.render!.castShadows = false;

  const setType = (type: (typeof TYPES)[number]): void => {
    lamp.light!.type = type;
    bulb.enabled = type !== 'directional';
    lamp.light!.intensity = type === 'directional' ? 1 : 2;
  };
  setType('omni');

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    // Position matters for omni and spot; orientation for directional and spot.
    lamp.setPosition(Math.sin(t * 0.7) * 4, 4, Math.cos(t * 0.5) * 1.5);
    lamp.setEulerAngles(Math.sin(t * 0.7) * 25, 0, Math.cos(t * 0.7) * 25);
    if (ctx.preview) setType(TYPES[Math.floor(t / 2.5) % 3]!);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('type', TYPES, 'omni', setType);
    panel.slider('intensity', 0, 8, 0.1, 2, (v) => (lamp.light!.intensity = v));
    panel.row();
    panel.readout('Directional light ignores position; omni ignores direction; spot uses both.');
  }

  return () => scene.dispose();
};

export default mount;
