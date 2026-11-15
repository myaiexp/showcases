// FixedJoint with no connectedCollider welds a body to a world point
import { FixedJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { ball, crate, PALETTE, rain, rnd, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 11], target: [0, 2.5, 0], hint: 'automaticConnectedAnchor keeps the pose the crate had when the joint was added.' });
  const tags = tagger(w);
  const pinned = crate(w.root, [-2.5, 3, 0], [1.6, 1.6, 1.6], PALETTE.green);
  const joint = pinned.entity.addComponent(FixedJoint);
  joint.automaticConnectedAnchor = true;
  joint.anchor = new Vector3(0, 0, 0);
  tags.add(pinned.entity, 'FixedJoint, no connectedCollider');
  const loose = crate(w.root, [2.5, 3, 0], [1.6, 1.6, 1.6], PALETTE.amber);
  tags.add(loose.entity, 'no joint');
  rain(w, 0.9, 5, (n, parent) => {
    const b = ball(parent, [-2.5 + rnd(n) * 1.2, 6.5, rnd(n + 3) * 0.4], 0.35, PALETTE.red);
    b.body.mass = 2;
    return b.entity;
  });
  w.say('welded to the world, balls bounce off');
  return w.stage.dispose;
};

export default mount;
