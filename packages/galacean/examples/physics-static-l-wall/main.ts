// A composite StaticCollider: two box shapes make an L-shaped wall
import { BoxColliderShape, PrimitiveMesh, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { unlit } from '../../shared/core-kit.ts';
import { add, blinn } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rain, rnd, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 9, 9], target: [0, 0, 0], floor: { w: 16, d: 12 }, hint: 'Balls are launched from the right at random heights of aim.' });
  const e = w.root.createChild('L wall');
  e.transform.setPosition(-1, 1.5, -1);
  const collider = e.addComponent(StaticCollider);
  const main = new BoxColliderShape();
  main.size = new Vector3(5, 3, 0.5);
  collider.addShape(main);
  const side = new BoxColliderShape();
  side.size = new Vector3(0.5, 3, 3);
  side.position = new Vector3(2.25, 0, 1.25);
  collider.addShape(side);
  add(e, PrimitiveMesh.createCuboid(w.engine, 5, 3, 0.5), blinn(w.engine, [...PALETTE.blue]));
  add(e, PrimitiveMesh.createCuboid(w.engine, 0.5, 3, 3), blinn(w.engine, [...PALETTE.violet]), [2.25, 0, 1.25]);
  outline(w.root, collider, unlit(w.engine, PALETTE.white));
  rain(w, 1.2, 6, (n, parent) => {
    const b = ball(parent, [6, 0.4, 2.6 + rnd(n) * 1.8], 0.4, PALETTE.amber);
    b.body.linearVelocity = new Vector3(-6.5, 0, -1.6 + rnd(n * 2) * 0.8);
    b.shape.material.bounciness = 0.5;
    return b.entity;
  });
  w.say('StaticCollider with two BoxColliderShapes');
  return w.stage.dispose;
};

export default mount;
