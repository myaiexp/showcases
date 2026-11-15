// DynamicCollider.angularVelocity is clamped by maxAngularVelocity
import { BoxColliderShape, DynamicCollider, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { PALETTE, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 1, 9], target: [0, 0, 0], floor: false, hint: 'Request an angular velocity; the limits stay at 5000, 1000 and 300 deg/s.' });
  const bodies: DynamicCollider[] = [];
  [5000, 1000, 300].forEach((limit, i) => {
    const e = w.root.createChild(`bar ${limit}`);
    e.transform.setPosition((i - 1) * 3.2, 0, 0);
    add(e, PrimitiveMesh.createCuboid(w.engine, 2.4, 0.3, 0.3), blinn(w.engine, [...[PALETTE.green, PALETTE.amber, PALETTE.red][i]!]));
    const body = e.addComponent(DynamicCollider);
    const shape = new BoxColliderShape();
    shape.size = new Vector3(2.4, 0.3, 0.3);
    body.addShape(shape);
    body.useGravity = false;
    body.angularDamping = 0;
    body.maxAngularVelocity = limit;
    bodies.push(body);
  });
  let request = 2000;
  const spinUp = (): void => bodies.forEach((b) => (b.angularVelocity = new Vector3(0, 0, request)));
  spinUp();
  tick(w.root, () => {
    w.say(bodies.map((b) => `max ${b.maxAngularVelocity}: spinning ${b.angularVelocity.z.toFixed(0)} deg/s`).join('\n'));
  });
  if (!w.stage.preview) slider(w.stage.bar, 'angularVelocity.z', 0, 8000, 100, request, (v) => {
    request = v;
    spinUp();
  }, (v) => `${v} deg/s`);
  return w.stage.dispose;
};

export default mount;
