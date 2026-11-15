// PhysicsMaterial.frictionCombine decides how two frictions become one
import { PhysicsMaterialCombineMode, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const MODES = [
  ['Average', PhysicsMaterialCombineMode.Average, 0.65],
  ['Minimum', PhysicsMaterialCombineMode.Minimum, 0.5],
  ['Multiply', PhysicsMaterialCombineMode.Multiply, 0.4],
  ['Maximum', PhysicsMaterialCombineMode.Maximum, 0.8],
] as const;
const COLORS = [PALETTE.blue, PALETTE.cyan, PALETTE.violet, PALETTE.amber];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 9, 9], target: [0, 0, 0], floor: { w: 16, d: 9 }, hint: 'Crate friction 0.5, floor friction 0.8; every crate is shoved at 7 m/s.' });
  const floor = w.ground!.shape.material;
  floor.staticFriction = 0.8;
  floor.dynamicFriction = 0.8;
  const tags = tagger(w);
  rounds(w, 6, (_n, holder) => {
    tags.clear();
    MODES.forEach(([name, mode, result], i) => {
      const b = crate(holder, [-6.5, 0.4, (i - 1.5) * 2.2], [0.8, 0.8, 0.8], COLORS[i]!);
      b.shape.material.staticFriction = 0.5;
      b.shape.material.dynamicFriction = 0.5;
      b.shape.material.frictionCombine = mode;
      b.body.linearVelocity = new Vector3(7, 0, 0);
      tags.add(b.entity, `${name} -> ${result}`);
    });
  });
  w.say('Average, Minimum, Multiply, Maximum');
  return w.stage.dispose;
};

export default mount;
