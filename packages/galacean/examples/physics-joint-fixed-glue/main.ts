// FixedJoint with connectedCollider: two crates that move as one body
import { FixedJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { ball, crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 11], target: [0, 0.8, 0], hint: 'Left: FixedJoint. Right: nothing.' });
  const tags = tagger(w);
  rounds(w, 5, (_n, holder) => {
    tags.clear();
    [false, true].forEach((glued, i) => {
      const z = (i ? 1 : -1) * 1.7;
      const a = crate(holder, [-1.5, 0.5, z], [1, 1, 1], PALETTE.green);
      const b = crate(holder, [-0.5, 0.5, z], [1, 1, 1], PALETTE.amber);
      if (glued) {
        const joint = a.entity.addComponent(FixedJoint);
        joint.connectedCollider = b.body;
      }
      const shot = ball(holder, [5, 0.55, z], 0.45, PALETTE.red);
      shot.body.mass = 4;
      shot.body.linearVelocity = new Vector3(-8, 0, 0);
      tags.add(a.entity, glued ? 'FixedJoint' : 'no joint').el.style.transform = 'translate(-50%,-250%)';
    });
  });
  w.say('joint.connectedCollider = the neighbouring crate');
  return w.stage.dispose;
};

export default mount;
