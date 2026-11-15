// PhysicsMaterial friction: lanes of one ramp, one box shape each
import { BoxColliderShape, PrimitiveMesh, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn } from '../../shared/gfx-kit.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const FRICTION = [0.1, 0.3, 0.5, 0.7];
const TILT = -30;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [7, 7, 11], target: [0, 2.2, 0], hint: 'Slope 30 degrees: it takes friction above tan(30) = 0.58 to hold a crate.' });
  const ramp = w.root.createChild('ramp');
  ramp.transform.setPosition(0, 3, 0);
  ramp.transform.setRotation(0, 0, TILT);
  const collider = ramp.addComponent(StaticCollider);
  FRICTION.forEach((f, i) => {
    const z = (i - 1.5) * 2;
    const shape = new BoxColliderShape();
    shape.size = new Vector3(10, 0.4, 1.8);
    shape.position = new Vector3(0, 0, z);
    shape.material.staticFriction = f;
    shape.material.dynamicFriction = f;
    collider.addShape(shape);
    add(ramp, PrimitiveMesh.createCuboid(w.engine, 10, 0.4, 1.8), blinn(w.engine, [0.35 + i * 0.12, 0.45, 0.8 - i * 0.12]), [0, 0, z]);
  });
  const tags = tagger(w);
  const c = Math.cos((TILT * Math.PI) / 180);
  const s = Math.sin((TILT * Math.PI) / 180);
  rounds(w, 6, (_n, holder) => {
    tags.clear();
    FRICTION.forEach((f, i) => {
      const [x, y] = [-3.5, 0.6];
      const b = crate(holder, [x * c - y * s, 3 + x * s + y * c, (i - 1.5) * 2], [0.8, 0.8, 0.8], PALETTE.amber);
      b.entity.transform.setRotation(0, 0, TILT);
      b.shape.material.staticFriction = f;
      b.shape.material.dynamicFriction = f;
      tags.add(b.entity, `friction ${f}`);
    });
  });
  w.say('crate and ramp lane share the same friction');
  return w.stage.dispose;
};

export default mount;
