// scene.physics.boxCast: slide a box along a direction until it touches
import { HitResult, Layer, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { arrow, marker, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { field } from '../../shared/phys-field.ts';
import { ghostBox } from '../../shared/phys-ghost.ts';
import { PALETTE, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 10, 7], target: [0, 0, 0], floor: { w: 16, d: 9 }, hint: 'Cast distance 11 along +x; the box turns and slides in z.' });
  const crates = field(w, 4, 3, 2.2);
  const start = ghostBox(w.root, unlit(w.engine, PALETTE.cyan));
  const stop = ghostBox(w.root, unlit(w.engine, PALETTE.amber));
  const dot = marker(w.root, unlit(w.engine, PALETTE.red), 0.3);
  const normal = arrow(w.root, unlit(w.engine, PALETTE.red), 0.05);
  const half = new Vector3(0.5, 0.5, 0.5);
  const center = new Vector3();
  const end = new Vector3();
  const direction = new Vector3(1, 0, 0);
  const orientation = new Quaternion();
  const hit = new HitResult();
  tick(w.root, (_dt, t) => {
    center.set(-7, 0.8, Math.sin(t * 0.5) * 2.6);
    orientation.set(0, 0, 0, 1).rotateY(t * 0.6);
    const found = w.physics.boxCast(center, half, direction, orientation, 11, Layer.Everything, hit);
    const d = found ? hit.distance : 11;
    end.set(center.x + d, center.y, center.z);
    start.set(center, half, orientation);
    stop.set(end, half, orientation);
    dot.entity.isActive = found;
    crates.reset();
    if (found) {
      dot.set(hit.point);
      normal.set(hit.point, hit.normal.clone().scale(0.8));
      crates.light(hit.entity);
    } else normal.set(end, end.clone().set(0, 0, 0));
    w.say(found ? `boxCast hit ${hit.entity.name}\ndistance ${hit.distance.toFixed(2)}` : 'boxCast -> false');
  });
  return w.stage.dispose;
};

export default mount;
