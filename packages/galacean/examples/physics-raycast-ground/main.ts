// Downward raycasts read the terrain height under a hovering ball
import { HitResult, Layer, PrimitiveMesh, Ray, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { line, marker, unlit } from '../../shared/core-kit.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { PALETTE, rnd, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 12], target: [0, 1.5, 0], floor: false, hint: 'The ball has no collider: only the ground is on Layer1 and the ray ignores the rest.' });
  for (let i = 0; i < 14; i++) {
    const h = 0.6 + Math.abs(rnd(i * 2.3)) * 2 + (i > 9 ? 0.6 : 0);
    const col = wall(w.root, [-6.5 + i, h / 2, 0], [1, h, 2], PALETTE.blue, `ground ${i + 1}`);
    col.collider.collisionLayer = Layer.Layer1;
  }
  const hover = add(w.root, PrimitiveMesh.createSphere(w.engine, 0.35, 20), blinn(w.engine, [...PALETTE.amber], 40), [0, 5, 0], 'hover ball').entity;
  const beam = line(w.root, unlit(w.engine, PALETTE.white), 0.03);
  const dot = marker(w.root, unlit(w.engine, PALETTE.red), 0.25);
  const ray = new Ray();
  const hit = new HitResult();
  const from = new Vector3();
  const to = new Vector3();
  let y = 5;
  tick(w.root, (dt, t) => {
    const x = Math.sin(t * 0.4) * 6.4;
    ray.origin.set(x, 8, 0);
    ray.direction.set(0, -1, 0);
    const found = w.physics.raycast(ray, 10, Layer.Layer1, hit);
    const ground = found ? hit.point.y : 0;
    y += (ground + 0.7 - y) * Math.min(1, dt * 8);
    hover.transform.setPosition(x, y, 0);
    from.set(x, 8, 0);
    to.set(x, ground, 0);
    beam.set(from, to);
    dot.entity.isActive = found;
    if (found) dot.set(hit.point);
    w.say(`ground height under the ball: ${ground.toFixed(2)}`);
  });
  return w.stage.dispose;
};

export default mount;
