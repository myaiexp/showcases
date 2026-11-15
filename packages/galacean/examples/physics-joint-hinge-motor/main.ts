// HingeJoint.useMotor and JointMotor: a motor-driven paddle wheel
import { BoxColliderShape, DynamicCollider, HingeJoint, JointMotor, PrimitiveMesh, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rain, rnd, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 11], target: [0, 2.4, 0], hint: 'Motor: targetVelocity, forceLimit, freeSpin.' });
  const axle = w.root.createChild('axle');
  axle.transform.setPosition(0, 2.4, 0);
  const axleBody = axle.addComponent(StaticCollider);
  const axleShape = new BoxColliderShape();
  axleShape.size = new Vector3(0.3, 0.3, 0.3);
  axleBody.addShape(axleShape);
  const wheel = w.root.createChild('wheel');
  wheel.transform.setPosition(0, 2.4, 0);
  const body = wheel.addComponent(DynamicCollider);
  body.mass = 4;
  for (const [sx, sy] of [[3, 0.3], [0.3, 3]]) {
    add(wheel, PrimitiveMesh.createCuboid(w.engine, sx!, sy!, 1.2), blinn(w.engine, [...PALETTE.amber]));
    const shape = new BoxColliderShape();
    shape.size = new Vector3(sx!, sy!, 1.2);
    body.addShape(shape);
  }
  body.useGravity = false;
  const hinge = wheel.addComponent(HingeJoint);
  hinge.connectedCollider = axleBody;
  hinge.axis = new Vector3(0, 0, 1);
  hinge.useMotor = true;
  hinge.motor = new JointMotor();
  hinge.motor.targetVelocity = 120;
  hinge.motor.forceLimit = 200;
  hinge.motor.freeSpin = false;
  hinge.motor.gearRatio = 1;
  wall(w.root, [0, -0.2, 0], [14, 0.4, 3], PALETTE.grey, 'tray', false);
  rain(w, 0.8, 8, (n, parent) => {
    const b = ball(parent, [-1.2 + rnd(n) * 0.6, 6, 0], 0.3, PALETTE.cyan);
    b.shape.material.bounciness = 0.4;
    return b.entity;
  });
  tick(w.root, () => w.say(`motor.targetVelocity ${hinge.motor.targetVelocity} deg/s   hinge.velocity ${hinge.velocity.toFixed(0)}   angle ${(hinge.angle % 360).toFixed(0)}`));
  if (!w.stage.preview) {
    slider(w.stage.bar, 'targetVelocity', -360, 360, 10, 120, (v) => (hinge.motor.targetVelocity = v));
    slider(w.stage.bar, 'forceLimit', 0, 400, 10, 200, (v) => (hinge.motor.forceLimit = v));
    checkbox(w.stage.bar, 'freeSpin', false, (v) => (hinge.motor.freeSpin = v));
  }
  return w.stage.dispose;
};

export default mount;
