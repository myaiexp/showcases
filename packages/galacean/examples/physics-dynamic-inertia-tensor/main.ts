// DynamicCollider.inertiaTensor: the same torque spins big-inertia bars slower
import { BoxColliderShape, DynamicCollider, PrimitiveMesh, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

class Spinner extends Script {
  body!: DynamicCollider;
  override onPhysicsUpdate(): void {
    this.body.applyTorque(new Vector3(0, 0, 8));
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 0, 10], target: [0, 0, 0], floor: false, hint: 'Torque (0, 0, 8) every step on all three.' });
  const tags = tagger(w);
  const bodies: DynamicCollider[] = [];
  const labels: ReturnType<typeof tags.add>[] = [];
  rounds(w, 6, (_n, holder) => {
    tags.clear();
    bodies.length = labels.length = 0;
    [1, 5, 25].forEach((inertia, i) => {
      const e = holder.createChild('bar');
      e.transform.setPosition((i - 1) * 3.4, 0, 0);
      add(e, PrimitiveMesh.createCuboid(w.engine, 2.4, 0.3, 0.3), blinn(w.engine, [...[PALETTE.green, PALETTE.amber, PALETTE.red][i]!]));
      const body = e.addComponent(DynamicCollider);
      const shape = new BoxColliderShape();
      shape.size = new Vector3(2.4, 0.3, 0.3);
      body.addShape(shape);
      body.useGravity = false;
      body.angularDamping = 0;
      body.automaticInertiaTensor = false;
      body.inertiaTensor = new Vector3(inertia, inertia, inertia);
      e.addComponent(Spinner).body = body;
      bodies.push(body);
      labels.push(tags.add(e, ''));
    });
  });
  tick(w.root, () => bodies.forEach((b, i) => (labels[i]!.el.textContent = `inertia ${b.inertiaTensor.x}: ${b.angularVelocity.z.toFixed(0)} deg/s`)));
  w.say('automaticInertiaTensor = false');
  return w.stage.dispose;
};

export default mount;
