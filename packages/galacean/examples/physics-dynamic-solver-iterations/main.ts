// DynamicCollider.solverIterations: accuracy of a stack with a heavy top
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 12], target: [0, 3, 0], hint: 'The lower the iteration count, the softer the stack under the 40-unit block.' });
  const tags = tagger(w);
  const tops: { y: () => number; label: ReturnType<typeof tags.add>; n: number }[] = [];
  rounds(w, 8, (_n, holder) => {
    tags.clear();
    tops.length = 0;
    [1, 4, 16].forEach((iterations, i) => {
      const x = (i - 1) * 4;
      for (let k = 0; k < 5; k++) {
        const c = crate(holder, [x, 0.5 + k * 1, 0], [1, 1, 1], PALETTE.blue);
        c.body.mass = 0.2;
        c.body.solverIterations = iterations;
      }
      const top = crate(holder, [x, 5.9, 0], [1.4, 1.4, 1.4], PALETTE.red);
      top.body.mass = 40;
      top.body.solverIterations = iterations;
      tops.push({ y: () => top.entity.transform.position.y, label: tags.add(top.entity, ''), n: iterations });
    });
  });
  tick(w.root, () => tops.forEach((t) => (t.label.el.textContent = `solverIterations ${t.n}: top y ${t.y().toFixed(2)}`)));
  w.say('stack of five 0.2-mass crates under a 40-mass block');
  return w.stage.dispose;
};

export default mount;
