// Joint.breakForce: the weak weld snaps under impact, the unbreakable one holds
import { FixedJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { ball, crate, PALETTE, rounds, wall, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 11], target: [0, 2.5, 0], hint: 'breakForce is the largest force a joint carries before it breaks.' });
  const beam = wall(w.root, [0, 5.3, 0], [10, 0.4, 1.5], PALETTE.blue, 'beam');
  const tags = tagger(w);
  rounds(w, 6, (_n, holder) => {
    tags.clear();
    [Infinity, 80].forEach((limit, i) => {
      const c = crate(holder, [(i ? 2.8 : -2.8), 4.1, 0], [1.6, 2, 1.6], i ? PALETTE.red : PALETTE.green);
      c.body.mass = 2;
      const joint = c.entity.addComponent(FixedJoint);
      joint.connectedCollider = beam.collider;
      joint.breakForce = limit;
      joint.breakTorque = Infinity;
      tags.add(c.entity, `breakForce ${limit === Infinity ? 'Infinity' : limit}`);
      const shot = ball(holder, [(i ? 6.5 : -6.5), 4.1, 0], 0.5, PALETTE.amber);
      shot.body.mass = 6;
      shot.body.linearVelocity = new Vector3(i ? -11 : 11, 0, 0);
    });
  });
  w.say('a 6-mass ball hits both crates at 11 m/s');
  return w.stage.dispose;
};

export default mount;
