// raycast(ray, distance, obstacleLayer): is anything between two points?
import { HitResult, Layer, MeshRenderer, PrimitiveMesh, Ray, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { line, marker, unlit } from '../../shared/core-kit.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { PALETTE, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 11, 5], target: [0, 0, 0], floor: { w: 16, d: 12 }, hint: 'Walls are on Layer1 and the ray only looks at Layer1.' });
  for (const [x, z, sx, sz] of [[-2.2, -0.5, 0.5, 3], [2.4, 1.2, 3, 0.5], [0.5, -3.2, 2.5, 0.5]] as const) wall(w.root, [x, 0.8, z], [sx, 1.6, sz], PALETTE.blue, 'wall').collider.collisionLayer = Layer.Layer1;
  const guard = add(w.root, PrimitiveMesh.createCuboid(w.engine, 0.7, 1, 0.7), blinn(w.engine, [...PALETTE.amber]), [0, 0.5, 0], 'guard').entity;
  const player = add(w.root, PrimitiveMesh.createSphere(w.engine, 0.4, 16), blinn(w.engine, [...PALETTE.cyan]), [4, 0.4, 0], 'player').entity;
  const clear = unlit(w.engine, PALETTE.green);
  const blocked = unlit(w.engine, PALETTE.red);
  const beam = line(w.root, clear, 0.07);
  const dot = marker(w.root, unlit(w.engine, PALETTE.white), 0.3);
  const ray = new Ray();
  const hit = new HitResult();
  const from = new Vector3();
  const to = new Vector3();
  const dir = new Vector3();
  tick(w.root, (_dt, t) => {
    player.transform.setPosition(Math.cos(t * 0.5) * 5.5, 0.4, Math.sin(t * 0.5) * 4);
    from.copyFrom(guard.transform.worldPosition).add(dir.set(0, 0.3, 0));
    to.copyFrom(player.transform.worldPosition);
    Vector3.subtract(to, from, dir);
    const distance = dir.length();
    ray.origin.copyFrom(from);
    ray.direction.copyFrom(dir.normalize());
    const hidden = w.physics.raycast(ray, distance, Layer.Layer1, hit);
    beam.entity.getComponent(MeshRenderer)?.setMaterial(hidden ? blocked : clear);
    beam.set(from, hidden ? hit.point : to);
    dot.entity.isActive = hidden;
    if (hidden) dot.set(hit.point);
    w.say(hidden ? 'line of sight blocked' : 'the guard can see the player');
  });
  return w.stage.dispose;
};

export default mount;
