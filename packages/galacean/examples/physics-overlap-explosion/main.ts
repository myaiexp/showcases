// overlapSphereAll to find the bodies in a blast, then applyForce on each
import { type ColliderShape, DynamicCollider, type Entity, Layer, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ghostSphere } from '../../shared/phys-ghost.ts';
import { crate, onPress, PALETTE, rnd, rounds, world } from '../../shared/phys-kit.ts';
import { note, overlap } from '../../shared/phys-overlap.ts';
import { tint } from '../../shared/phys-tag.ts';

const RADIUS = 3;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 6, 10], target: [0, 1, 0], floor: { w: 18, d: 10 }, hint: 'Press the floor to blow up the crates around that spot.' });
  const wave = ghostSphere(w.root, unlit(w.engine, PALETTE.red), 0.05);
  const buffer: ColliderShape[] = [];
  const direction = new Vector3();
  const blast = new Vector3();
  let age = 9;
  let count = 0;
  let status = '';
  const crates: Entity[] = [];
  const explode = (x: number, z: number): void => {
    blast.set(x, 0.4, z);
    buffer.length = 0;
    const found = overlap(
      crates,
      Layer.Layer0,
      () => w.physics.overlapSphereAll(blast, RADIUS, Layer.Layer0, buffer),
      (p, reach) => Vector3.distance(p, blast) < RADIUS + reach,
    );
    status = note(found);
    count = 0;
    for (const e of found.entities) {
      const body = e.getComponent(DynamicCollider);
      if (!body) continue;
      count++;
      Vector3.subtract(body.entity.transform.worldPosition, blast, direction);
      const d = direction.length();
      direction.y += 0.6;
      direction.normalize().scale(500 * (1 - Math.min(1, d / RADIUS)) + 60);
      body.wakeUp();
      body.applyForce(direction);
      tint(body.entity, PALETTE.red);
    }
    age = 0;
  };
  rounds(w, 5, (n, holder) => {
    crates.length = 0;
    for (let i = 0; i < 12; i++) {
      const c = crate(holder, [rnd(n * 20 + i) * 1.8, 0.4 + Math.floor(i / 6) * 0.9, rnd(n * 20 + i + 50) * 1.2], [0.8, 0.8, 0.8], PALETTE.blue);
      c.body.sleepThreshold = 0.05;
      crates.push(c.entity);
    }
    age = 9;
  });
  let next = 2;
  tick(w.root, (dt, t) => {
    age += dt;
    if (w.stage.preview && t > next) {
      next = t + 5;
      explode(rnd(t) * 1.2, rnd(t + 3) * 0.8);
    }
    wave.set(age < 0.5 ? blast : false, (age / 0.5) * RADIUS);
    w.say(`overlapSphereAll(r = ${RADIUS}) -> ${count} bodies pushed${status}`);
  });
  onPress(w, (ray) => {
    const t = -ray.origin.y / ray.direction.y;
    if (t > 0) explode(ray.origin.x + ray.direction.x * t, ray.origin.z + ray.direction.z * t);
  });
  return w.stage.dispose;
};

export default mount;
