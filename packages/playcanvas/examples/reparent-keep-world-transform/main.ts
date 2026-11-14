// Parenting: addChild keeps the local transform; saving world position and rotation keeps the world one
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 13, pitch: -30, autoRotate: 5 }, floor: 22 });
  const { app } = scene;

  // Two parents that move and turn: a car and a trailer.
  const car = new pc.Entity('car');
  app.root.addChild(car);
  addShape(car, 'box', material('#e8794a'), [0, 0, 0], [2.4, 0.7, 1.2]);
  const trailer = new pc.Entity('trailer');
  app.root.addChild(trailer);
  addShape(trailer, 'box', material('#4ab3e8'), [0, 0, 0], [2.4, 0.7, 1.2]);

  const wheel = addShape(car, 'cylinder', material('#f2c14e'), [0.9, -0.1, 0.7], [0.7, 0.3, 0.7], 'wheel');
  wheel.setLocalEulerAngles(90, 0, 0);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    car.setPosition(Math.sin(t * 0.5) * 3 - 3, 0.6, 0);
    car.setEulerAngles(0, Math.sin(t * 0.7) * 30, 0);
    trailer.setPosition(3, 0.6, Math.cos(t * 0.5) * 3);
    trailer.setEulerAngles(0, 90 + Math.cos(t * 0.7) * 40, 0);
    wheel.rotateLocal(0, 90 * dt, 0);
  });

  // Moving the wheel between parents, two ways.
  const toTrailer = (keepWorld: boolean): void => {
    const target = wheel.parent === car ? trailer : car;
    const position = wheel.getPosition().clone();
    const rotation = wheel.getRotation().clone();
    target.addChild(wheel); // adding to a new parent takes it from the old one, keeping its LOCAL transform
    if (keepWorld) {
      wheel.setPosition(position);
      wheel.setRotation(rotation);
    }
  };

  if (ctx.preview) {
    let last = -1;
    app.on('update', () => {
      const step = Math.floor(t / 2.5);
      if (step === last) return;
      last = step;
      toTrailer(step % 4 >= 2);
    });
  } else {
    const panel = createPanel(el);
    const out = panel.readout();
    app.on('update', () => (out.textContent = `wheel parent: ${wheel.parent!.name}   local ${wheel.getLocalPosition().toString()}   world ${wheel.getPosition().toString()}`));
    panel.row();
    panel.button('switch parent: keep local transform', () => toTrailer(false));
    panel.button('switch parent: keep world transform', () => toTrailer(true));
    panel.button('insertChild(wheel, 0)', () => wheel.parent!.insertChild(wheel, 0));
    panel.row();
    panel.readout('Keeping the local transform makes the wheel jump to the same spot relative to its new parent; saving and restoring the world pose keeps it where it is.');
  }

  return () => scene.dispose();
};

export default mount;
