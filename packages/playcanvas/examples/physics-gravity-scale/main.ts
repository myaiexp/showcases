// gravityScale scales world gravity per body; sleeping needs activate()
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, PALETTE, respawn, tint } from '../../shared/physics.ts';

const SCALES = [1, 0.5, 0, -0.2];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, target: [0, 3, 0], floor: 14 });
  const { app } = scene;
  let wake = true;

  const balls = SCALES.map((g, i) =>
    addBody(app, { shape: 'sphere', name: `gravityScale ${g}`, size: 1, colour: PALETTE[i]!, body: { gravityScale: g, restitution: 0.3, mass: 1 } }),
  );
  const crate = addBody(app, { name: 'crate', size: 1, colour: '#f2c14e', position: [4, 0.5, 0], body: { mass: 1 } });

  const dropBalls = (): void => balls.forEach((b, i) => respawn(b, [-5 + i * 1.8, 7, 0]));

  // The crate lies still until it falls asleep, then gets a negative scale.
  const float = (): void => {
    crate.rigidbody!.gravityScale = -0.2;
    // Without this the sleeping crate stays put "until something disturbs it".
    if (wake) crate.rigidbody!.activate();
  };
  const settle = (): void => {
    crate.rigidbody!.gravityScale = 1;
    respawn(crate, [4, 0.5, 0]);
    tint(crate, '#f2c14e');
  };

  dropBalls();
  settle();
  let cycle = 0;
  every(app, 1, () => {
    cycle = (cycle + 1) % 7;
    if (cycle === 0) {
      dropBalls();
      settle();
    }
    // By second 4 the crate has been asleep for a while.
    if (cycle === 4) float();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('call activate() after changing gravityScale', true, (on) => (wake = on));
    panel.row();
    panel.readout('balls: gravityScale 1, 0.5, 0, -0.2   crate: -0.2 after 4 s');
    panel.button('Drop again', () => {
      dropBalls();
      settle();
      cycle = 0;
    });
  }

  return () => scene.dispose();
};

export default mount;
