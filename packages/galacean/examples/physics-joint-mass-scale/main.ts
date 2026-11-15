// Joint.massScale: how heavy the main body counts in the constraint
import { SpringJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { ball, crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const SCALES = [1, 0.3, 0.05];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 7, 9], target: [1, 0, 0], floor: { w: 18, d: 10 }, hint: 'Block mass 10, ball mass 1, spring stiffness 60.' });
  const ice = w.ground!.shape.material;
  ice.staticFriction = 0.05;
  ice.dynamicFriction = 0.05;
  const tags = tagger(w);
  rounds(w, 6, (_n, holder) => {
    tags.clear();
    SCALES.forEach((scale, i) => {
      const z = (i - 1) * 2.6;
      const block = crate(holder, [-2, 0.5, z], [1, 1, 1], PALETTE.red);
      block.body.mass = 10;
      block.shape.material.dynamicFriction = 0.05;
      block.shape.material.staticFriction = 0.05;
      const light = ball(holder, [-0.6, 0.35, z], 0.35, PALETTE.amber);
      light.shape.material.dynamicFriction = 0.05;
      light.shape.material.staticFriction = 0.05;
      const joint = block.entity.addComponent(SpringJoint);
      joint.connectedCollider = light.body;
      joint.minDistance = 0;
      joint.maxDistance = 3;
      joint.stiffness = 60;
      joint.damping = 2;
      joint.massScale = scale;
      light.body.linearVelocity = new Vector3(7, 0, 0);
      tags.add(block.entity, `massScale ${scale}`);
    });
  });
  w.say('joint on the block: massScale 1 / 0.3 / 0.05');
  return w.stage.dispose;
};

export default mount;
