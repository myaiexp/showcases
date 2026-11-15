// Collider.addShape, removeShape and clearShapes on a StaticCollider
import { BoxColliderShape, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { unlit } from '../../shared/core-kit.ts';
import { steps } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rain, rnd, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 1, 11], target: [0, 0.5, 0], floor: false, hint: 'Six steps, repeating.' });
  const holder = w.root.createChild('static');
  const collider = holder.addComponent(StaticCollider);
  outline(w.root, collider, unlit(w.engine, PALETTE.cyan), unlit(w.engine, PALETTE.amber), 0.05);
  const piece = (x: number, y: number): BoxColliderShape => {
    const s = new BoxColliderShape();
    s.size = new Vector3(2.4, 0.4, 3);
    s.position = new Vector3(x, y, 0);
    return s;
  };
  const left = piece(-3, -1);
  const middle = piece(0, -0.2);
  const right = piece(3, -1);
  const log = ['addShape(left)', 'addShape(middle)', 'addShape(right)', 'removeShape(middle)', 'clearShapes()', 'shapes is empty'];
  steps(w.root, 3, 6, (i) => {
    if (i === 0) collider.addShape(left);
    if (i === 1) collider.addShape(middle);
    if (i === 2) collider.addShape(right);
    if (i === 3) collider.removeShape(middle);
    if (i === 4) collider.clearShapes();
    w.say(`${log[i]}\ncollider.shapes.length = ${collider.shapes.length}`);
  });
  rain(w, 0.6, 9, (n, parent) => {
    const b = ball(parent, [rnd(n) * 3.6, 4.5, 0], 0.3, PALETTE.green);
    b.shape.material.bounciness = 0.3;
    return b.entity;
  });
  return w.stage.dispose;
};

export default mount;
