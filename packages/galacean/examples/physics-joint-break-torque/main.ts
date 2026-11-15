// Joint.breakTorque: a hinge that gives way when twisted off its axis
import { HingeJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { ball, crate, PALETTE, rounds, wall, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 11], target: [0, 1.5, 0], hint: 'The door turns freely about y; torque about any other axis is what breakTorque measures.' });
  const tags = tagger(w);
  rounds(w, 6, (_n, holder) => {
    tags.clear();
    [Infinity, 40].forEach((limit, i) => {
      const x = i ? 2.2 : -4.2;
      const post = wall(holder, [x, 1.5, 0], [0.4, 3, 0.4], PALETTE.blue, 'post');
      const door = crate(holder, [x + 1.2, 2.2, 0], [2, 0.2, 0.9], i ? PALETTE.red : PALETTE.green, 'door');
      door.body.mass = 2;
      const hinge = door.entity.addComponent(HingeJoint);
      hinge.connectedCollider = post.collider;
      hinge.anchor = new Vector3(-1.2, 0, 0);
      hinge.axis = new Vector3(0, 1, 0);
      hinge.breakTorque = limit;
      tags.add(door.entity, `breakTorque ${limit === Infinity ? 'Infinity' : limit}`);
      const drop = ball(holder, [x + 1.9, 5.5, 0], 0.4, PALETTE.amber);
      drop.body.mass = 5;
    });
  });
  w.say('a 5-mass ball lands on each door tip');
  return w.stage.dispose;
};

export default mount;
