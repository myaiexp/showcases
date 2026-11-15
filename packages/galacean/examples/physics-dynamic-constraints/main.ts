// DynamicCollider.constraints locks position or rotation axes
import { DynamicColliderConstraints, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { ball, crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const C = DynamicColliderConstraints;
const CASES = [
  ['None', C.None],
  ['FreezePositionY', C.FreezePositionY],
  ['FreezeRotation X|Y|Z', C.FreezeRotationX | C.FreezeRotationY | C.FreezeRotationZ],
  ['FreezePosition X|Z', C.FreezePositionX | C.FreezePositionZ],
] as const;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [5, 5, 12], target: [0, 0.6, 0], floor: { w: 16, d: 10 }, hint: 'One ball per crate, aimed at the upper edge.' });
  const tags = tagger(w);
  rounds(w, 5, (_n, holder) => {
    tags.clear();
    CASES.forEach(([name, flags], i) => {
      const z = (i - 1.5) * 2.4;
      const c = crate(holder, [0, 0.5, z], [1, 1, 1], PALETTE.violet);
      c.body.constraints = flags;
      const b = ball(holder, [-6, 1, z], 0.35, PALETTE.amber);
      b.body.mass = 4;
      b.body.linearVelocity = new Vector3(10, 0.5, 0);
      tags.add(c.entity, name).el.style.transform = 'translate(-130%,-60%)';
    });
  });
  w.say('constraints is a bit mask of DynamicColliderConstraints');
  return w.stage.dispose;
};

export default mount;
