// Restitution of two bodies in contact multiplies: balls on an adjustable floor
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, PALETTE, respawn } from '../../shared/physics.ts';

const BALL_RESTITUTION = [0, 0.3, 0.6, 0.9, 1];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 14, target: [0, 2.5, 0], floorRestitution: 1, autoRotate: 5 });
  const { app, floor } = scene;

  const balls = BALL_RESTITUTION.map((r, i) =>
    addBody(app, { shape: 'sphere', name: `restitution ${r}`, size: 1, colour: PALETTE[i]!, body: { restitution: r, mass: 1 } }),
  );
  const drop = (): void => balls.forEach((b, i) => respawn(b, [(i - 2) * 2, 6, 0]));
  drop();
  every(app, 7, drop);

  if (!ctx.preview) {
    const panel = createPanel(el);
    // Changing a property on the rigidbody component takes effect immediately.
    panel.slider('floor restitution', 0, 1, 0.05, 1, (v) => (floor!.rigidbody!.restitution = v));
    panel.row();
    panel.readout('balls, left to right: restitution 0, 0.3, 0.6, 0.9, 1');
    panel.button('Drop again', drop);
  }

  return () => scene.dispose();
};

export default mount;
