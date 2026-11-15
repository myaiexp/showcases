// Collision events: enter, stay and exit raised on a bouncing ball's physics data
import { Vector3 } from '@zephyr3d/base';
import { BLUE, colliderOf, dynBall, floor, launch, orbit, ORANGE, respawn, startPhysics, tint, YELLOW } from '../../shared/phys-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 14, 8);
  const readout = stage.readout();

  let enters = 0;
  let stays = 0;
  let exits = 0;
  let lastImpulse = 0;
  const report = (): void => {
    const text = `collisionenter ${enters} · collisionstay ${stays} · collisionexit ${exits} · last impulse ${lastImpulse.toFixed(1)} N·s`;
    stage.caption(text);
    if (readout) readout.textContent = text;
  };

  respawn(
    kit,
    () => {
      enters = stays = exits = 0;
      return [BLUE, YELLOW, ORANGE].map((_, i) => {
        // restitution 0.55: the ball hops, touching and parting again and again
        const ball = dynBall(kit, 0.45, new Vector3(-2.4 + i * 2.4, 3.5 + i, 0), BLUE);
        colliderOf(ball).restitution = 0.55;
        ball.physics!.on('collisionenter', (ev) => {
          enters++;
          lastImpulse = ev.impulse; // big for an impact, small for resting contact
          tint(ball, ORANGE);
        });
        ball.physics!.on('collisionstay', () => {
          stays++;
        });
        ball.physics!.on('collisionexit', () => {
          exits++;
          tint(ball, BLUE);
        });
        return ball;
      });
    },
    8000,
    'Drop again',
  );

  kit.myApp.on('tick', report);

  orbit(kit, new Vector3(0, 3.5, 9), new Vector3(0, 1.5, 0));
  launch(kit);
});
