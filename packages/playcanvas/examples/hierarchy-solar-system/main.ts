// A hierarchy of orbit entities: only two turn, the earth and moon ride along
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, ambient: '#1c1e28', clear: '#07090f', orbit: { distance: 15, pitch: -35, autoRotate: 3 } });
  const { app } = scene;

  const sphere = (name: string, mat: pc.Material): pc.Entity => {
    const e = new pc.Entity(name);
    e.addComponent('render', { type: 'sphere', material: mat, castShadows: false });
    return e;
  };

  // sun, with an omni light so it lights the planets
  const sun = sphere('sun', material('#000000', { emissive: '#ffbf4d' }));
  sun.addComponent('light', { type: 'omni', range: 30, intensity: 2 });
  sun.setLocalScale(2, 2, 2);
  app.root.addChild(sun);

  // earthOrbit sits at the centre; earth is 6 units out along its X axis.
  const earthOrbit = new pc.Entity('earthOrbit');
  app.root.addChild(earthOrbit);
  const earth = sphere('earth', material('#3373ff'));
  earth.setLocalPosition(6, 0, 0);
  earthOrbit.addChild(earth);

  // moonOrbit sits at the centre of the earth; the moon is 1.5 units out from it.
  const moonOrbit = new pc.Entity('moonOrbit');
  earth.addChild(moonOrbit);
  const moon = sphere('moon', material('#c0c0c0'));
  moon.setLocalPosition(1.5, 0, 0);
  moon.setLocalScale(0.35, 0.35, 0.35);
  moonOrbit.addChild(moon);

  let earthSpeed = 20;
  let moonSpeed = 90;
  let tilt = 0;
  let moonAngle = 0;
  app.on('update', (dt: number) => {
    // Nothing moves the earth or the moon directly.
    earthOrbit.rotateLocal(0, earthSpeed * dt, 0);
    // The angle is kept in a variable and set each frame: reading Euler angles back is unreliable.
    moonAngle += moonSpeed * dt;
    moonOrbit.setLocalEulerAngles(tilt, moonAngle, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('earthOrbit speed', -90, 90, 1, earthSpeed, (v) => (earthSpeed = v));
    panel.slider('moonOrbit speed', -360, 360, 1, moonSpeed, (v) => (moonSpeed = v));
    panel.slider('moonOrbit tilt', 0, 80, 1, 0, (v) => (tilt = v));
    panel.slider('earth scale', 0.5, 2.5, 0.05, 1, (v) => earth.setLocalScale(v, v, v));
    panel.row();
    const out = panel.readout();
    app.on('update', () => (out.textContent = `moon world position ${moon.getPosition().toString()}   local ${moon.getLocalPosition().toString()}`));
  }

  return () => scene.dispose();
};

export default mount;
