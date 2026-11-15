// DynamicCollider.angularDamping slows a spinning body
import { BoxColliderShape, DynamicCollider, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn } from '../../shared/gfx-kit.ts';
import { PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 0, 11], target: [0, 0, 0], floor: false, hint: 'Same spin, four dampings.' });
  const tags = tagger(w);
  rounds(w, 6, (_n, holder) => {
    tags.clear();
    [0.05, 0.5, 1.5, 4].forEach((damping, i) => {
      const e = holder.createChild('bar');
      e.transform.setPosition((i - 1.5) * 3, 0, 0);
      add(e, PrimitiveMesh.createCuboid(w.engine, 2.2, 0.3, 0.3), blinn(w.engine, [...[PALETTE.red, PALETTE.amber, PALETTE.green, PALETTE.cyan][i]!]));
      const body = e.addComponent(DynamicCollider);
      const shape = new BoxColliderShape();
      shape.size = new Vector3(2.2, 0.3, 0.3);
      body.addShape(shape);
      body.useGravity = false;
      body.angularDamping = damping;
      body.angularVelocity = new Vector3(0, 0, 720);
      tags.add(e, `angularDamping ${damping}`).el.style.transform = 'translate(-50%,-260%)';
    });
  });
  w.say('angularVelocity = (0, 0, 720) deg/s at the start');
  return w.stage.dispose;
};

export default mount;
