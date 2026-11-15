// scene.physics.raycast(ray, distance, outHitResult) with a limited reach
import { HitResult, Ray, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { line, marker, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { PALETTE, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 11, 5], target: [0, 0, 0], floor: { w: 16, d: 12 }, hint: 'The ring of pillars is 4.5 away; try a shorter distance.' });
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + 0.2;
    wall(w.root, [Math.cos(a) * 4.5, 0.8, Math.sin(a) * 4.5], [0.9, 1.6, 0.9], PALETTE.blue, `pillar ${i + 1}`);
  }
  const beam = line(w.root, unlit(w.engine, PALETTE.white), 0.06);
  const dot = marker(w.root, unlit(w.engine, PALETTE.red), 0.35);
  const ray = new Ray();
  const hit = new HitResult();
  const end = new Vector3();
  let reach = 6;
  tick(w.root, (_dt, t) => {
    if (w.stage.preview) reach = 3.2 + (Math.sin(t * 0.35) + 1) * 2.2;
    const a = t * 0.8;
    ray.origin.set(0, 0.8, 0);
    ray.direction.set(Math.cos(a), 0, Math.sin(a));
    const found = w.physics.raycast(ray, reach, hit);
    const d = found ? hit.distance : reach;
    end.set(ray.origin.x + ray.direction.x * d, ray.origin.y, ray.origin.z + ray.direction.z * d);
    beam.set(ray.origin, end);
    dot.entity.isActive = found;
    if (found) dot.set(hit.point);
    w.say(`raycast(ray, ${reach.toFixed(1)}, hitResult) -> ${found ? `${hit.entity.name} at ${hit.distance.toFixed(2)}` : 'false'}`);
  });
  if (!w.stage.preview) slider(w.stage.bar, 'distance', 1, 8, 0.1, reach, (v) => (reach = v));
  return w.stage.dispose;
};

export default mount;
