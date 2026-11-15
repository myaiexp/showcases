// DynamicCollider.useGravity switches gravity off for one body
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { ball, PALETTE, rounds, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 12], target: [0, 3.2, 0], floor: false, hint: 'Flip useGravity on the cyan ball.' });
  wall(w.root, [0, -0.2, 0], [10, 0.4, 2], PALETTE.grey, 'bottom');
  wall(w.root, [0, 6.6, 0], [10, 0.4, 2], PALETTE.grey, 'top', false);
  for (const x of [-1, 1]) wall(w.root, [x * 5.2, 3.2, 0], [0.4, 7, 2], PALETTE.grey, 'side', false);
  for (const z of [-1, 1]) wall(w.root, [0, 3.2, z * 1.2], [10, 7, 0.4], PALETTE.grey, 'glass', false);
  const balls: ReturnType<typeof ball>[] = [];
  let useGravity = false;
  rounds(w, w.stage.preview ? 10 : 1e9, (_n, holder) => {
    balls.length = 0;
    for (const [y, color, g] of [[1, PALETTE.amber, true], [1.6, PALETTE.cyan, useGravity]] as const) {
      const b = ball(holder, [-4, y, 0], 0.4, color);
      b.shape.material.bounciness = 1;
      b.body.useGravity = g;
      b.body.linearVelocity = new Vector3(5, 4, 0);
      balls.push(b);
    }
    w.say('amber: useGravity = true    cyan: useGravity = false');
  });
  if (!w.stage.preview) checkbox(w.stage.bar, 'cyan ball useGravity', false, (v) => (balls[1]!.body.useGravity = useGravity = v));
  return w.stage.dispose;
};

export default mount;
