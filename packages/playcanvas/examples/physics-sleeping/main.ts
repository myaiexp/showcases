// A resting body is put to sleep: isActive() polling and activate() to wake it
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, respawn, tint } from '../../shared/physics.ts';

type V3 = [number, number, number];
const SLOTS: V3[] = [
  [-1.2, 0.5, 0], [0, 0.5, 0], [1.2, 0.5, 0],
  [-0.6, 1.5, 0], [0.6, 1.5, 0],
  [0, 2.5, 0],
];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 11, target: [0, 1.5, 0], floor: 12 });
  const { app } = scene;

  const crates = SLOTS.map((p, i) => addBody(app, { name: `crate${i}`, size: 1, position: p, colour: '#f2c14e', body: { mass: 1, friction: 0.7 } }));
  const ball = addBody(app, { shape: 'sphere', name: 'ball', size: 1.2, position: [0, 9, 0], colour: '#ec6fa9', body: { mass: 4 } });
  const awake = new Map(crates.map((c) => [c, true]));

  const pile = (): void => crates.forEach((c, i) => respawn(c, SLOTS[i]!));
  const hit = (): void => respawn(ball, [Math.random() - 0.5, 7, 0]);
  let readout: HTMLElement | null = null;

  // isActive() is a plain query: poll it and recolour a crate when its state flips.
  app.on('update', () => {
    let active = 0;
    for (const c of crates) {
      const on = c.rigidbody!.isActive();
      if (on) active++;
      if (on !== awake.get(c)) {
        awake.set(c, on);
        tint(c, on ? '#f2c14e' : '#4a5470');
      }
    }
    if (readout) readout.textContent = `${active} of ${crates.length} crates awake`;
  });

  // Tidy the pile, let it fall asleep, then wake it with the ball, over and over.
  let step = 0;
  every(app, 3.5, () => {
    step = (step + 1) % 2;
    if (step === 1) hit();
    else {
      respawn(ball, [5, 0.6, 4]); // park the ball out of the way
      pile();
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    panel.button('Wake every crate (activate)', () => crates.forEach((c) => c.rigidbody!.activate()));
    panel.button('Drop the ball', hit);
    panel.button('Rebuild the pile', pile);
  }

  return () => scene.dispose();
};

export default mount;
