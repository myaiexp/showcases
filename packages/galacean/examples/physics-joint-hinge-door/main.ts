// HingeJoint with useLimits: a door that opens only so far
import { HingeJoint, JointLimits, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, crate, PALETTE, rain, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [1.2, 8, 6], target: [1.2, 0.5, 0], floor: { w: 14, d: 10 }, hint: 'Seen from above. The door is held by a hinge on the left.' });
  const post = wall(w.root, [0, 1, 0], [0.4, 2, 0.4], PALETTE.blue, 'post');
  const door = crate(w.root, [1.2, 1, 0], [2, 1.4, 0.15], PALETTE.amber, 'door');
  door.body.mass = 2;
  const hinge = door.entity.addComponent(HingeJoint);
  hinge.connectedCollider = post.collider;
  hinge.anchor = new Vector3(-1.2, 0, 0);
  hinge.axis = new Vector3(0, 1, 0);
  hinge.useLimits = true;
  hinge.limits = new JointLimits();
  hinge.limits.min = -70;
  hinge.limits.max = 70;
  tick(w.root, () => w.say(`hinge.angle ${hinge.angle.toFixed(1)}   limits ${hinge.limits.min} .. ${hinge.limits.max}`));
  rain(w, 2.2, 3, (n, parent) => {
    const b = ball(parent, [1.4 + (n % 2) * 0.4, 0.9, 4.5], 0.35, PALETTE.red);
    b.body.mass = 2;
    b.body.linearVelocity = new Vector3(0, 0, -5 - (n % 3));
    return b.entity;
  });
  if (!w.stage.preview) {
    slider(w.stage.bar, 'limits.min', -170, 0, 5, -70, (v) => (hinge.limits.min = v));
    slider(w.stage.bar, 'limits.max', 0, 170, 5, 70, (v) => (hinge.limits.max = v));
  }
  return w.stage.dispose;
};

export default mount;
