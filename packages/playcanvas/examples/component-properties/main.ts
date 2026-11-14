// Reading and changing component properties at runtime: a lamp's light component
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, ambient: '#0e1016', orbit: { distance: 9, pitch: -30, autoRotate: 10 }, floor: 16 });
  const { app } = scene;
  for (let i = 0; i < 6; i++) addShape(app.root, i % 2 ? 'sphere' : 'box', material('#d8dce4'), [Math.cos(i * 1.05) * 3, 0.6, Math.sin(i * 1.05) * 3], 1.2);

  // Settings go in with the component, and stay readable and writable as properties.
  const lamp = new pc.Entity('lamp');
  lamp.addComponent('light', { type: 'omni', color: new pc.Color(1, 0.8, 0.6), range: 10 });
  lamp.setPosition(0, 2.2, 0);
  app.root.addChild(lamp);
  const bulb = addShape(lamp, 'sphere', material('#000000', { emissive: '#ffffff' }), [0, 0, 0], 0.4);
  bulb.render!.castShadows = false;
  const light = lamp.light!;

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    lamp.setPosition(Math.sin(t) * 3, 2.2, Math.cos(t) * 3);
    if (ctx.preview) {
      light.intensity = 2 + Math.sin(t * 2) * 1.5;
      light.color = new pc.Color(1, 0.6 + Math.sin(t) * 0.35, 0.5 + Math.cos(t * 1.3) * 0.4);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const out = panel.readout();
    app.on('update', () => (out.textContent = `light.intensity ${light.intensity.toFixed(1)}   light.range ${light.range.toFixed(0)}   light.color ${light.color.toString(false)}`));
    panel.slider('intensity', 0, 6, 0.1, 1, (v) => (light.intensity = v));
    panel.slider('range', 2, 20, 0.5, 10, (v) => (light.range = v));
    panel.row();
    const rgb = { r: 1, g: 0.8, b: 0.6 };
    const push = (): void => {
      // Assign a new colour: vectors and colours are replaced, not edited in place.
      light.color = new pc.Color(rgb.r, rgb.g, rgb.b);
    };
    panel.slider('red', 0, 1, 0.01, 1, (v) => ((rgb.r = v), push()));
    panel.slider('green', 0, 1, 0.01, 0.8, (v) => ((rgb.g = v), push()));
    panel.slider('blue', 0, 1, 0.01, 0.6, (v) => ((rgb.b = v), push()));
  }

  return () => scene.dispose();
};

export default mount;
