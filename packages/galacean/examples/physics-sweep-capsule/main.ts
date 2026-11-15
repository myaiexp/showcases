// scene.physics.capsuleCast: how far can a character move before it hits?
import { HitResult, Layer, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { marker, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { field } from '../../shared/phys-field.ts';
import { ghostCapsule } from '../../shared/phys-ghost.ts';
import { PALETTE, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 10, 7], target: [0, 0, 0], floor: { w: 16, d: 9 }, hint: 'Capsule radius 0.4, height 1.2. Each step is cast first, then taken.' });
  const crates = field(w, 4, 3, 2.2);
  const body = ghostCapsule(w.root, unlit(w.engine, PALETTE.cyan), 0.04);
  const ahead = ghostCapsule(w.root, unlit(w.engine, PALETTE.amber));
  const dot = marker(w.root, unlit(w.engine, PALETTE.red), 0.3);
  const position = new Vector3(-7, 1.2, -2.2);
  const direction = new Vector3(1, 0, 0);
  const orientation = new Quaternion();
  const probe = new Vector3();
  const hit = new HitResult();
  let lane = 0;
  tick(w.root, (dt) => {
    const step = 2.5 * Math.min(dt, 0.05);
    const found = w.physics.capsuleCast(position, 0.4, 1.2, direction, orientation, 20, Layer.Everything, hit);
    const room = found ? hit.distance : 20;
    if (room > step + 0.02) position.x += step;
    else if (position.x > 6.5 || found) {
      lane = (lane + 1) % 3;
      position.set(-7, 1.2, (lane - 1) * 2.2);
    }
    probe.set(position.x + Math.min(room, 20), position.y, position.z);
    body.set(position, 0.4, 1.2, orientation);
    ahead.set(probe, 0.4, 1.2, orientation);
    dot.entity.isActive = found;
    crates.reset();
    if (found) {
      dot.set(hit.point);
      crates.light(hit.entity);
    }
    w.say(found ? `capsuleCast: ${hit.entity.name} in ${hit.distance.toFixed(2)}` : 'capsuleCast -> false (clear)');
  });
  return w.stage.dispose;
};

export default mount;
