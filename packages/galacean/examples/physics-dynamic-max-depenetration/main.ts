// DynamicCollider.maxDepenetrationVelocity caps how fast overlaps separate
import type { Mount } from '@/types.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const LIMITS = [1e32, 4, 1];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 10], target: [0, 1.5, 0], hint: 'Each crate starts 0.5 deep in the floor.' });
  const tags = tagger(w);
  rounds(w, 5, (_n, holder) => {
    tags.clear();
    LIMITS.forEach((limit, i) => {
      const b = crate(holder, [(i - 1) * 3, 0.1, 0], [1.2, 1.2, 1.2], [PALETTE.red, PALETTE.amber, PALETTE.green][i]!);
      b.body.maxDepenetrationVelocity = limit;
      tags.add(b.entity, limit > 1e6 ? 'default (1e32)' : `max ${limit}`);
    });
  });
  w.say('maxDepenetrationVelocity: 1e32 / 4 / 1');
  return w.stage.dispose;
};

export default mount;
