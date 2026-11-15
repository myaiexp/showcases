// CapsuleColliderShape: radius, height and which axis the capsule points along
import { CapsuleColliderShape, ColliderShapeUpAxis, DynamicCollider, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { unlit } from '../../shared/core-kit.ts';
import { add, blinn } from '../../shared/gfx-kit.ts';
import { PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const AXES = [
  ['X', ColliderShapeUpAxis.X, PALETTE.red],
  ['Y', ColliderShapeUpAxis.Y, PALETTE.green],
  ['Z', ColliderShapeUpAxis.Z, PALETTE.blue],
] as const;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 9], target: [0, 1, 0], hint: 'Radius and height reshape every capsule on the next drop.' });
  const wire = unlit(w.engine, PALETTE.white);
  let radius = 0.4;
  let height = 1.2;
  const round = rounds(w, w.stage.preview ? 5 : 1e9, (n, holder) => {
    AXES.forEach(([name, axis, color], i) => {
      const e = holder.createChild(`capsule ${name}`);
      e.transform.setPosition((i - 1) * 2.6, 3.2, 0);
      e.transform.setRotation(0, 0, 4 + n * 3);
      const mesh = add(e, PrimitiveMesh.createCapsule(w.engine, radius, height, 20, 1), blinn(w.engine, [...color], 40)).entity;
      // The mesh points along Y; turn it onto the shape's axis.
      mesh.transform.setRotation(axis === ColliderShapeUpAxis.Z ? 90 : 0, 0, axis === ColliderShapeUpAxis.X ? 90 : 0);
      const body = e.addComponent(DynamicCollider);
      const shape = new CapsuleColliderShape();
      shape.radius = radius;
      shape.height = height;
      shape.upAxis = axis;
      body.addShape(shape);
      outline(holder, body, wire);
    });
    w.say(`radius ${radius.toFixed(2)}  height ${height.toFixed(2)}  upAxis X / Y / Z`);
  });
  if (!w.stage.preview) {
    slider(w.stage.bar, 'radius', 0.2, 0.8, 0.05, radius, (v) => (radius = v));
    slider(w.stage.bar, 'height', 0.4, 2.4, 0.1, height, (v) => (height = v));
    button(w.stage.bar, 'Drop again', () => round.restart());
  }
  return w.stage.dispose;
};

export default mount;
