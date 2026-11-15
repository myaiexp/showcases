// scene.physics.overlapCapsuleAll: every shape inside a tilted capsule
import { type ColliderShape, Layer, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { field } from '../../shared/phys-field.ts';
import { ghostCapsule } from '../../shared/phys-ghost.ts';
import { note, overlap, segmentDistance } from '../../shared/phys-overlap.ts';
import { PALETTE, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 10, 7], target: [0, 0, 0], floor: { w: 16, d: 9 }, hint: 'Radius 0.7, height 3, lying down and turning.' });
  const crates = field(w, 6, 3, 1.9);
  const capsule = ghostCapsule(w.root, unlit(w.engine, PALETTE.white), 0.05);
  const center = new Vector3();
  const orientation = new Quaternion();
  const buffer: ColliderShape[] = [];
  const axis = new Vector3();
  const tipA = new Vector3();
  const tipB = new Vector3();
  let spin = 0.7;
  let angle = 0;
  tick(w.root, (dt, t) => {
    angle += dt * spin;
    center.set(Math.sin(t * 0.4) * 4.5, 0.9, Math.sin(t * 0.7) * 1.8);
    // Lie down (roll 90 degrees about z), then turn about y.
    orientation.set(0, 0, 0, 1).rotateY(angle).rotateZ(Math.PI / 2);
    buffer.length = 0;
    const found = overlap(
      crates.crates,
      Layer.Everything,
      () => w.physics.overlapCapsuleAll(center, 0.7, 3, orientation, Layer.Everything, buffer),
      (p, reach) => {
        // The capsule's axis is its local Y turned by the orientation.
        axis.set(0, 1.5, 0);
        Vector3.transformByQuat(axis, orientation, axis);
        return segmentDistance(p, tipA.copyFrom(center).add(axis), tipB.copyFrom(center).subtract(axis)) < 0.7 + reach;
      },
    );
    capsule.set(center, 0.7, 3, orientation);
    crates.reset();
    for (const e of found.entities) crates.light(e);
    w.say(`overlapCapsuleAll -> ${found.entities.length}${note(found)}`);
  });
  if (!w.stage.preview) slider(w.stage.bar, 'turn speed', 0, 3, 0.1, spin, (v) => (spin = v));
  return w.stage.dispose;
};

export default mount;
