// PhysicsMaterial.bounciness: five balls dropped from the same height
import { PhysicsMaterialCombineMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { labels } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const VALUES = [0, 0.25, 0.5, 0.75, 1];
const COLORS = [PALETTE.grey, PALETTE.blue, PALETTE.cyan, PALETTE.green, PALETTE.amber];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 12.5], target: [0, 3.2, 0], hint: 'Same drop, different PhysicsMaterial.bounciness.' });
  // Minimum of (ball, floor = 1) is the ball's own value.
  const floor = w.ground!.shape.material;
  floor.bounciness = 1;
  floor.bounceCombine = PhysicsMaterialCombineMode.Minimum;
  const tags = labels(w.stage, w.camera);
  const names = VALUES.map((v) => tags.add(`bounciness ${v}`));
  const balls: ReturnType<typeof ball>[] = [];
  rounds(w, 9, (_n, holder) => {
    balls.length = 0;
    VALUES.forEach((v, i) => {
      const b = ball(holder, [(i - 2) * 2.2, 6.5, 0], 0.4, COLORS[i]!);
      b.shape.material.bounciness = v;
      b.shape.material.bounceCombine = PhysicsMaterialCombineMode.Minimum;
      balls.push(b);
    });
  });
  tick(w.root, () => balls.forEach((b, i) => names[i]!.at(b.entity.transform.worldPosition)));
  w.say('floor.bounceCombine = Minimum, bounciness 1');
  return w.stage.dispose;
};

export default mount;
