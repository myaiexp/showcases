// scene.physics.sphereCast: where would a rolling ball first touch something
import { HitResult, Layer, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { marker, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { field } from '../../shared/phys-field.ts';
import { ghostSphere } from '../../shared/phys-ghost.ts';
import { PALETTE, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 10, 7], target: [0, 0, 0], floor: { w: 16, d: 9 }, hint: 'Origin is the left edge; the direction sweeps through an angle.' });
  const crates = field(w, 4, 3, 2.2);
  const start = ghostSphere(w.root, unlit(w.engine, PALETTE.cyan));
  const stop = ghostSphere(w.root, unlit(w.engine, PALETTE.amber));
  const dot = marker(w.root, unlit(w.engine, PALETTE.red), 0.3);
  const center = new Vector3(-7, 0.9, 0);
  const direction = new Vector3();
  const end = new Vector3();
  const hit = new HitResult();
  let radius = 0.6;
  tick(w.root, (_dt, t) => {
    const a = Math.sin(t * 0.5) * 0.45;
    direction.set(Math.cos(a), 0, Math.sin(a));
    const found = w.physics.sphereCast(center, radius, direction, 14, Layer.Everything, hit);
    const d = found ? hit.distance : 14;
    end.set(center.x + direction.x * d, 0.9, center.z + direction.z * d);
    start.set(center, radius);
    stop.set(end, radius);
    dot.entity.isActive = found;
    crates.reset();
    if (found) {
      dot.set(hit.point);
      crates.light(hit.entity);
    }
    w.say(found ? `sphereCast hit ${hit.entity.name}\ndistance ${hit.distance.toFixed(2)}` : 'sphereCast -> false');
  });
  if (!w.stage.preview) slider(w.stage.bar, 'radius', 0.2, 1.2, 0.05, radius, (v) => (radius = v));
  return w.stage.dispose;
};

export default mount;
