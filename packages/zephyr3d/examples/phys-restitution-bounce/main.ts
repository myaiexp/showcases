// Restitution: balls with different bounce dropped from one height
import { Vector3 } from '@zephyr3d/base';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, colliderOf, dynBall, floor, GREEN, launch, orbit, ORANGE, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  const ground = floor(kit, 16, 8);
  // restitution 0 never bounces, 1 keeps nearly all energy; a touching pair averages theirs
  colliderOf(ground).restitution = 1;
  stage.caption('ball restitution 0 · 0.3 · 0.6 · 0.9 on a floor of 1');

  const values = [0, 0.3, 0.6, 0.9];
  const colors = [ORANGE, YELLOW, GREEN, BLUE];
  respawn(
    kit,
    () =>
      values.map((r, i) => {
        const ball = dynBall(kit, 0.4, new Vector3(-3.6 + i * 2.4, 5, 0), colors[i]!, 1);
        colliderOf(ball).restitution = r;
        return ball;
      }),
    7000,
    'Drop again',
  );

  if (stage.bar) slider(stage.bar, 'Floor restitution', [0, 1, 0.05], 1, (v) => (colliderOf(ground).restitution = v));

  orbit(kit, new Vector3(0, 3.5, 9), new Vector3(0, 2.4, 0));
  launch(kit);
});
