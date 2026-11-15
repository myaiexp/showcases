// DynamicCollider.move: a kinematic elevator and a rocking platform
import { BoxColliderShape, DynamicCollider, PrimitiveMesh, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { crate, PALETTE, rounds, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 12], target: [0, 2, 0], hint: 'move(position) for the elevator, move(position, rotation) for the rocker.' });
  const platform = (x: number, color: readonly [number, number, number]): DynamicCollider => {
    const e = w.root.createChild('platform');
    e.transform.setPosition(x, 1, 0);
    add(e, PrimitiveMesh.createCuboid(w.engine, 3.2, 0.4, 3), blinn(w.engine, [...color]));
    const body = e.addComponent(DynamicCollider);
    const shape = new BoxColliderShape();
    shape.size = new Vector3(3.2, 0.4, 3);
    body.addShape(shape);
    body.isKinematic = true;
    return body;
  };
  const elevator = platform(-3.2, PALETTE.blue);
  const rocker = platform(3.2, PALETTE.violet);
  wall(w.root, [0, 0.6, 2.2], [14, 1.2, 0.2], PALETTE.grey, 'back rail', false);
  rounds(w, 12, (_n, holder) => {
    for (const x of [-3.2, 3.2]) for (let k = 0; k < 2; k++) {
      const c = crate(holder, [x + (k - 0.5) * 0.9, 1.7 + k * 0.1, 0], [0.8, 0.8, 0.8], k ? PALETTE.amber : PALETTE.green);
      c.shape.material.staticFriction = 1;
      c.shape.material.dynamicFriction = 1;
    }
  });
  const position = new Vector3();
  const rotation = new Quaternion();
  tick(w.root, (_dt, t) => {
    position.set(-3.2, 1.5 + Math.sin(t * 0.8) * 1.1, 0);
    elevator.move(position);
    position.set(3.2, 1.5, 0);
    rotation.set(0, 0, 0, 1).rotateZ(Math.sin(t * 0.9) * 0.22);
    rocker.move(position, rotation);
    w.say(`elevator y ${(1.5 + Math.sin(t * 0.8) * 1.1).toFixed(2)}   rocker ${((Math.sin(t * 0.9) * 0.22 * 180) / Math.PI).toFixed(0)} deg`);
  });
  return w.stage.dispose;
};

export default mount;
