// Static, dynamic and kinematic rigid bodies: who owns the transform
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, respawn } from '../../shared/physics.ts';

type V3 = [number, number, number];
const SPAWNS: { at: V3; colour: string }[] = [
  { at: [-4, 4, 0.3], colour: '#7bc67b' },
  { at: [1.2, 3, 0], colour: '#f2c14e' },
  { at: [2.6, 5, 0.4], colour: '#4ab3e8' },
  { at: [-0.5, 7, -0.4], colour: '#a78bfa' },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, target: [0, 1, 0], floor: 16 });
  const { app } = scene;

  // Static: placed once at creation, never read again. Cheap, and other bodies collide with it.
  addBody(app, { type: 'static', name: 'ledge', size: [3, 1.2, 3], position: [-4, 0.6, 0], colour: '#59627a' });
  // Kinematic: the entity's transform is the input; the body follows on the next step.
  const platform = addBody(app, { type: 'kinematic', name: 'platform', size: [3.5, 0.4, 3], position: [2, 0.6, 0], colour: '#e8794a' });
  // Dynamic: forces and gravity decide, and physics writes the transform back every step.
  const crates = SPAWNS.map((s, i) => addBody(app, { name: `crate${i}`, size: 0.9, position: s.at, colour: s.colour, body: { mass: 1, friction: 0.8 } }));

  const drop = (): void => crates.forEach((c, i) => respawn(c, SPAWNS[i]!.at, [0, i * 20, 0]));

  let time = 0;
  app.on('update', (dt: number) => {
    time += dt;
    platform.setPosition(2 + Math.sin(time * 0.9) * 2.6, 0.6, 0);
  });
  every(app, 6, drop);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('grey: static   orange: kinematic   others: dynamic');
    panel.row();
    panel.button('Drop the crates again', drop);
  }

  return () => scene.dispose();
};

export default mount;
