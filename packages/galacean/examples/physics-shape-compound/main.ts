// One DynamicCollider holding two box shapes, the second offset upwards
import { BoxColliderShape, DynamicCollider, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { unlit } from '../../shared/core-kit.ts';
import { add, blinn } from '../../shared/gfx-kit.ts';
import { PALETTE, rnd, rounds, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 9], target: [0, 1.2, 0], hint: 'Two shapes, one body.' });
  const wire = unlit(w.engine, PALETTE.white);
  rounds(w, 4.5, (n, holder) => {
    for (const x of [-2, 2]) {
      const e = holder.createChild('T body');
      e.transform.setPosition(x, 3.5, 0);
      e.transform.setRotation(rnd(n + x) * 40, 0, rnd(n * 3 + x) * 60);
      add(e, PrimitiveMesh.createCuboid(w.engine, 2, 1, 1), blinn(w.engine, [...PALETTE.amber]));
      add(e, PrimitiveMesh.createCuboid(w.engine, 1, 1, 1), blinn(w.engine, [...PALETTE.violet]), [0, 1, 0]);
      const body = e.addComponent(DynamicCollider);
      const main = new BoxColliderShape();
      main.size = new Vector3(2, 1, 1);
      body.addShape(main);
      const top = new BoxColliderShape();
      top.size = new Vector3(1, 1, 1);
      top.position = new Vector3(0, 1, 0);
      body.addShape(top);
      outline(holder, body, wire);
    }
    w.say('DynamicCollider.shapes: 2 BoxColliderShapes');
  });
  return w.stage.dispose;
};

export default mount;
