// PhysicsMaterial.bounceCombine: Average, Minimum, Multiply, Maximum compared
import { PhysicsMaterialCombineMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { labels } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const MODES = [
  ['Average', PhysicsMaterialCombineMode.Average, 0.6],
  ['Minimum', PhysicsMaterialCombineMode.Minimum, 0.4],
  ['Multiply', PhysicsMaterialCombineMode.Multiply, 0.32],
  ['Maximum', PhysicsMaterialCombineMode.Maximum, 0.8],
] as const;
const COLORS = [PALETTE.blue, PALETTE.cyan, PALETTE.violet, PALETTE.amber];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 11], target: [0, 3, 0], hint: 'Floor bounciness 0.8, ball bounciness 0.4: the combined value is in each label.' });
  w.ground!.shape.material.bounciness = 0.8;
  const tags = labels(w.stage, w.camera);
  const names = MODES.map(([name, , result]) => tags.add(`${name} -> ${result}`));
  const balls: ReturnType<typeof ball>[] = [];
  rounds(w, 8, (_n, holder) => {
    balls.length = 0;
    MODES.forEach(([, mode], i) => {
      const b = ball(holder, [(i - 1.5) * 2.4, 6, 0], 0.4, COLORS[i]!);
      b.shape.material.bounciness = 0.4;
      b.shape.material.bounceCombine = mode;
      balls.push(b);
    });
  });
  tick(w.root, () => balls.forEach((b, i) => names[i]!.at(b.entity.transform.worldPosition)));
  w.say('ball: bounciness 0.4   floor: bounciness 0.8');
  return w.stage.dispose;
};

export default mount;
