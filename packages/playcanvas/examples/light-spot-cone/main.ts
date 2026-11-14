// Spot light innerConeAngle and outerConeAngle: where the light fades and where it ends
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 11, pitch: -35, autoRotate: 6 }, floor: 20, ambient: '#0c0e14' });
  const { app } = scene;

  const spot = new pc.Entity('spot');
  spot.addComponent('light', { type: 'spot', range: 14, intensity: 4, innerConeAngle: 15, outerConeAngle: 35, castShadows: false, color: new pc.Color(1, 0.95, 0.85) });
  spot.setPosition(0, 6, 0);
  app.root.addChild(spot);
  const housing = new pc.Entity('housing');
  housing.addComponent('render', { type: 'cone', material: material('#4a5164'), castShadows: false });
  housing.setLocalScale(0.7, 0.7, 0.7);
  housing.setLocalEulerAngles(180, 0, 0); // tip up, opening down the beam
  spot.addChild(housing);

  const light = spot.light!;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    spot.setEulerAngles(Math.sin(t * 0.8) * 18, 0, Math.cos(t * 0.6) * 18);
    if (ctx.preview) {
      light.outerConeAngle = 30 + Math.sin(t) * 12;
      light.innerConeAngle = Math.min(light.outerConeAngle, 14 + Math.sin(t * 0.7) * 10);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const inner = panel.slider('innerConeAngle', 0, 80, 1, 15, (v) => {
      light.innerConeAngle = v;
    });
    panel.slider('outerConeAngle', 1, 85, 1, 35, (v) => {
      light.outerConeAngle = v;
      // Keep the inner cone inside the outer one.
      if (light.innerConeAngle > v) {
        light.innerConeAngle = v;
        inner.value = String(v);
        inner.dispatchEvent(new Event('input'));
      }
    });
    panel.slider('range', 3, 20, 0.5, 14, (v) => (light.range = v));
    panel.row();
    panel.readout('Light is full strength inside the inner cone and fades to nothing at the outer one.');
  }

  return () => scene.dispose();
};

export default mount;
