// Linear and angular damping: speed and spin lost per second
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, PALETTE, respawn } from '../../shared/physics.ts';

const DAMPING = [0, 0.2, 0.5, 0.8];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 19, target: [0, 1, 0], floor: 18, pitch: -35, yaw: 20, autoRotate: 4 });
  const { app } = scene;
  let speed = 4;
  let spin = 9;

  // Gravity off (gravityScale 0) keeps the spheres level, so damping is the only thing slowing them.
  const spheres = DAMPING.map((d, i) =>
    addBody(app, { shape: 'sphere', name: `linearDamping ${d}`, size: 0.9, colour: PALETTE[i]!, body: { linearDamping: d, gravityScale: 0, friction: 0, mass: 1 } }),
  );
  // A zero linear factor pins the boxes in place so only their rotation shows.
  const boxes = DAMPING.map((d, i) =>
    addBody(app, { name: `angularDamping ${d}`, size: [1.8, 0.4, 0.7], colour: PALETTE[i]!, body: { angularDamping: d, gravityScale: 0, linearFactor: new pc.Vec3(0, 0, 0), mass: 1 } }),
  );

  const launch = (): void => {
    spheres.forEach((s, i) => {
      respawn(s, [-8, 1, (i - 1.5) * 1.6 + 1.5]);
      s.rigidbody!.linearVelocity = new pc.Vec3(speed, 0, 0);
    });
    boxes.forEach((b, i) => {
      respawn(b, [(i - 1.5) * 3, 1.2, -5]);
      b.rigidbody!.angularVelocity = new pc.Vec3(0, spin, 0);
    });
  };
  launch();
  every(app, 5, launch);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('launch speed', 1, 8, 0.5, speed, (v) => (speed = v));
    panel.slider('spin (rad/s)', 2, 20, 1, spin, (v) => (spin = v));
    panel.row();
    panel.readout('damping 0, 0.2, 0.5, 0.8: spheres back to front, boxes left to right');
    panel.button('Launch again', launch);
  }

  return () => scene.dispose();
};

export default mount;
