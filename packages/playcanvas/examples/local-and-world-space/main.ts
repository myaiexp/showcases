// Local and world transforms: a wheel on a car, set and read in both spaces
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 12, pitch: -35, autoRotate: 6 }, floor: 20 });
  const { app } = scene;

  const car = new pc.Entity('car');
  car.setPosition(3, 0.6, 0);
  app.root.addChild(car);
  addShape(car, 'box', material('#e8794a'), [0, 0, 0], [2.6, 0.8, 1.3], 'body');
  const wheel = addShape(car, 'cylinder', material('#3a3f4c'), [0, 0, 0], [0.8, 0.3, 0.8], 'wheel');
  wheel.setLocalEulerAngles(90, 0, 0);
  wheel.setLocalPosition(1, -0.3, 0.8); // relative to the car
  // A marker at the world origin, for reference.
  addShape(app.root, 'cylinder', material('#7bc67b'), [0, 0.05, 0], [0.3, 0.1, 0.3], 'origin');

  let t = 0;
  let auto = true;
  app.on('update', (dt: number) => {
    t += dt;
    if (auto) {
      car.setPosition(3 + Math.sin(t * 0.8) * 3, 0.6, Math.cos(t * 0.8) * 3);
      car.setEulerAngles(0, t * 40, 0);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const out = panel.readout();
    app.on('update', () => (out.textContent = `wheel.getLocalPosition() ${wheel.getLocalPosition().toString()}    wheel.getPosition() ${wheel.getPosition().toString()}`));
    panel.row();
    panel.button('stop the car', () => (auto = false));
    panel.button("wheel.setPosition(0, 0.5, 0): the world origin", () => {
      auto = false;
      wheel.setPosition(0, 0.5, 0);
    });
    panel.button('wheel.setLocalPosition(1, -0.3, 0.8)', () => wheel.setLocalPosition(1, -0.3, 0.8));
    panel.row();
    panel.slider('car yaw', -180, 180, 1, 0, (v) => ((auto = false), car.setEulerAngles(0, v, 0)));
    panel.slider('car scale', 0.5, 2, 0.05, 1, (v) => car.setLocalScale(v, v, v));
    panel.row();
    panel.readout('Local values stay the same while the car moves; world values change. Setting the world position changes the local one.');
  }

  return () => scene.dispose();
};

export default mount;
