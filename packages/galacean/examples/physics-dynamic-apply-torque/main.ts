// DynamicCollider.applyTorque in pulses on a flywheel
import { BoxColliderShape, DynamicCollider, PrimitiveMesh, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { PALETTE, world } from '../../shared/phys-kit.ts';

class Wheel extends Script {
  body!: DynamicCollider;
  on = false;
  strength = 6;
  override onPhysicsUpdate(): void {
    if (this.on) this.body.applyTorque(new Vector3(0, 0, this.strength));
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 0, 8], target: [0, 0, 0], floor: false, hint: 'Hold the button to keep torque on; release and angularDamping slows the wheel.' });
  const e = w.root.createChild('flywheel');
  add(e, PrimitiveMesh.createCuboid(w.engine, 3.2, 0.5, 0.5), blinn(w.engine, [...PALETTE.amber]));
  add(e, PrimitiveMesh.createCuboid(w.engine, 0.5, 3.2, 0.5), blinn(w.engine, [...PALETTE.cyan]));
  const body = e.addComponent(DynamicCollider);
  for (const size of [new Vector3(3.2, 0.5, 0.5), new Vector3(0.5, 3.2, 0.5)]) {
    const shape = new BoxColliderShape();
    shape.size = size;
    body.addShape(shape);
  }
  body.useGravity = false;
  body.angularDamping = 0.8;
  const wheel = e.addComponent(Wheel);
  wheel.body = body;
  let held = false;
  tick(w.root, (_dt, t) => {
    wheel.on = w.stage.preview ? t % 2 < 1 : held;
    w.say(`applyTorque(0, 0, ${wheel.strength}) ${wheel.on ? 'ON ' : 'off'}   angularVelocity.z ${body.angularVelocity.z.toFixed(0)} deg/s`);
  });
  if (!w.stage.preview) {
    const b = button(w.stage.bar, 'Hold for torque', () => {});
    const release = (): void => void (held = false);
    b.onpointerdown = () => (held = true);
    window.addEventListener('pointerup', release);
    w.stage.own(() => window.removeEventListener('pointerup', release));
  }
  return w.stage.dispose;
};

export default mount;
