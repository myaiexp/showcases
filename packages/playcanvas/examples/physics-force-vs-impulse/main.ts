// applyForce over time against a single applyImpulse, light and heavy crates
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, respawn } from '../../shared/physics.ts';

const PUSH_SECONDS = 0.6;

interface Lane {
  mode: 'force' | 'impulse';
  mass: number;
  z: number;
  colour: string;
}
const LANES: Lane[] = [
  { mode: 'force', mass: 1, z: -3.6, colour: '#e8794a' },
  { mode: 'force', mass: 4, z: -1.2, colour: '#b5532c' },
  { mode: 'impulse', mass: 1, z: 1.2, colour: '#4ab3e8' },
  { mode: 'impulse', mass: 4, z: 3.6, colour: '#2a7aa8' },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 19, target: [0, 0.5, 0], floor: 20, pitch: -38, yaw: 25, autoRotate: 3 });
  const { app } = scene;
  let force = 12;
  let impulse = 7;
  let elapsed = 99;

  const crates = LANES.map((l) => addBody(app, { name: `${l.mode} ${l.mass}kg`, size: [1, 0.8, 1.6].map((s) => s * (0.8 + l.mass * 0.1)) as [number, number, number], colour: l.colour, body: { mass: l.mass } }));
  const readouts: HTMLElement[] = [];

  const launch = (): void => {
    elapsed = 0;
    crates.forEach((c, i) => respawn(c, [-8, 0.5, LANES[i]!.z]));
    // An impulse is applied once, not every frame.
    crates.forEach((c, i) => LANES[i]!.mode === 'impulse' && c.rigidbody!.applyImpulse(impulse, 0, 0));
  };

  app.on('update', (dt: number) => {
    elapsed += dt;
    // A force acts for as long as it is applied; heavier bodies accelerate more slowly under it.
    if (elapsed < PUSH_SECONDS) crates.forEach((c, i) => LANES[i]!.mode === 'force' && c.rigidbody!.applyForce(force, 0, 0));
    crates.forEach((c, i) => {
      if (readouts[i]) readouts[i]!.textContent = `${LANES[i]!.mode} ${LANES[i]!.mass} kg: ${c.rigidbody!.linearVelocity.x.toFixed(1)} m/s`;
    });
  });
  launch();
  every(app, 6, launch);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('force (N, 0.6 s)', 2, 30, 1, force, (v) => (force = v));
    panel.slider('impulse (N s)', 1, 20, 1, impulse, (v) => (impulse = v));
    panel.button('Push again', launch);
    panel.row();
    for (let i = 0; i < LANES.length; i++) readouts.push(panel.readout());
  }

  return () => scene.dispose();
};

export default mount;
