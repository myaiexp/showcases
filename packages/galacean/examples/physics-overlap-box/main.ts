// scene.physics.overlapBoxAll: every shape inside a rotated box
import { type ColliderShape, Layer, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { field } from '../../shared/phys-field.ts';
import { ghostBox } from '../../shared/phys-ghost.ts';
import { overlap, note } from '../../shared/phys-overlap.ts';
import { PALETTE, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 10, 7], target: [0, 0, 0], floor: { w: 16, d: 9 }, hint: 'Violet crates are on Layer1, blue ones on Layer0.' });
  const crates = field(w, 6, 3, 1.9);
  const frame = ghostBox(w.root, unlit(w.engine, PALETTE.white), 0.05);
  const half = new Vector3(1.4, 0.8, 0.8);
  const center = new Vector3();
  const orientation = new Quaternion();
  const buffer: ColliderShape[] = [];
  const local = new Vector3();
  const inverse = new Quaternion();
  let mask: Layer = Layer.Everything;
  tick(w.root, (_dt, t) => {
    center.set(Math.sin(t * 0.5) * 4.5, 0.9, Math.sin(t * 0.8) * 1.8);
    orientation.set(0, 0, 0, 1).rotateY(t * 0.7);
    buffer.length = 0;
    const found = overlap(
      crates.crates,
      mask,
      () => w.physics.overlapBoxAll(center, half, orientation, mask, buffer),
      (p, reach) => {
        // Into the box's own frame: undo its turn, then compare with the half extents.
        local.copyFrom(p).subtract(center);
        inverse.copyFrom(orientation).invert();
        Vector3.transformByQuat(local, inverse, local);
        return Math.abs(local.x) < half.x + reach && Math.abs(local.y) < half.y + reach && Math.abs(local.z) < half.z + reach;
      },
    );
    frame.set(center, half, orientation);
    crates.reset();
    for (const e of found.entities) crates.light(e);
    w.say(`overlapBoxAll -> ${found.entities.length} shape${found.entities.length === 1 ? '' : 's'}   mask ${mask === Layer.Everything ? 'Everything' : 'Layer1'}${note(found)}`);
  });
  if (!w.stage.preview) checkbox(w.stage.bar, 'layerMask = Layer1 only', false, (v) => (mask = v ? Layer.Layer1 : Layer.Everything));
  return w.stage.dispose;
};

export default mount;
