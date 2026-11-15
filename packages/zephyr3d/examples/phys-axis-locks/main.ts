// Axis locks: the same push on a free box, a rotation-locked box and a translation-locked box
import { Vector3 } from '@zephyr3d/base';
import type { Mesh } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, dynBall, dynBox, floor, launch, orbit, ORANGE, respawn, startPhysics, YELLOW, GREEN } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 14, 10);
  stage.caption('free · lockRotation (slides) · lockTranslationX (pinned: spins)');

  respawn(
    kit,
    () => {
      const nodes: Mesh[] = [];
      const lanes = [-3, 0, 3];
      const colors = [ORANGE, BLUE, YELLOW];
      lanes.forEach((z, i) => {
        const post = dynBox(kit, new Vector3(0.6, 1.6, 0.6), new Vector3(2, 0.8, z), colors[i]!, 3);
        const body = post.physics!.body!;
        if (i === 1) {
          // Rotation locked on every axis: it can only slide
          body.lockRotationX = true;
          body.lockRotationY = true;
          body.lockRotationZ = true;
        }
        if (i === 2) {
          // Cannot move along X (the push direction): the hit can only spin it
          body.lockTranslationX = true;
        }
        nodes.push(post);
        // The same ball, the same speed, at each post
        const ball = dynBall(kit, 0.3, new Vector3(-4, 1.3, z), GREEN, 4);
        ball.physics!.body!.setLinearVelocity(new Vector3(9, 0, 0));
        nodes.push(ball);
      });
      return nodes;
    },
    6500,
    'Shoot again',
  );

  orbit(kit, new Vector3(0, 4, 10), new Vector3(0, 0.8, 0));
  launch(kit);
});
