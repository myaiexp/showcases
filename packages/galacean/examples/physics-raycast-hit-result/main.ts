// HitResult: entity, distance, point, normal and shape of a raycast
import { BoxColliderShape, CapsuleColliderShape, HitResult, PrimitiveMesh, Ray, SphereColliderShape, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { arrow, line, marker, unlit } from '../../shared/core-kit.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { PALETTE, fmt, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 11], target: [0, 1, 0], floor: false, hint: 'The ray falls from y = 4 and slides along x.' });
  wall(w.root, [0, -0.2, 0], [16, 0.4, 3], PALETTE.grey, 'floor');
  const sphere = add(w.root, PrimitiveMesh.createSphere(w.engine, 0.9, 24), blinn(w.engine, [...PALETTE.red]), [-4.5, 0.9, 0], 'sphere');
  const s = new SphereColliderShape();
  s.radius = 0.9;
  sphere.entity.addComponent(StaticCollider).addShape(s);
  const crate = add(w.root, PrimitiveMesh.createCuboid(w.engine, 1.6, 1.2, 1.6), blinn(w.engine, [...PALETTE.green]), [-1.5, 0.6, 0], 'box');
  const bs = new BoxColliderShape();
  bs.size = new Vector3(1.6, 1.2, 1.6);
  crate.entity.addComponent(StaticCollider).addShape(bs);
  const capsule = add(w.root, PrimitiveMesh.createCapsule(w.engine, 0.5, 1.2, 20, 1), blinn(w.engine, [...PALETTE.amber]), [1.5, 1.1, 0], 'capsule');
  const cs = new CapsuleColliderShape();
  cs.radius = 0.5;
  cs.height = 1.2;
  capsule.entity.addComponent(StaticCollider).addShape(cs);
  const slope = wall(w.root, [4.5, 0.6, 0], [2.4, 0.3, 1.6], PALETTE.blue, 'slope');
  slope.entity.transform.setRotation(0, 0, 25);
  const beam = line(w.root, unlit(w.engine, PALETTE.white), 0.04);
  const dot = marker(w.root, unlit(w.engine, PALETTE.white), 0.25);
  const normal = arrow(w.root, unlit(w.engine, PALETTE.cyan), 0.05);
  const ray = new Ray();
  const hit = new HitResult();
  const end = new Vector3();
  tick(w.root, (_dt, t) => {
    ray.origin.set(-6 + (Math.sin(t * 0.45) + 1) * 5.6, 4, 0);
    ray.direction.set(0, -1, 0);
    const found = w.physics.raycast(ray, 100, hit);
    end.set(ray.origin.x, found ? hit.point.y : 0, 0);
    beam.set(ray.origin, end);
    dot.entity.isActive = found;
    if (found) {
      dot.set(hit.point);
      normal.set(hit.point, hit.normal.clone().scale(0.9));
      const kind = hit.shape instanceof SphereColliderShape ? 'SphereColliderShape' : hit.shape instanceof CapsuleColliderShape ? 'CapsuleColliderShape' : 'BoxColliderShape';
      w.say(`entity   ${hit.entity.name}\ndistance ${hit.distance.toFixed(2)}\npoint    ${fmt(hit.point, 2)}\nnormal   ${fmt(hit.normal, 2)}\nshape    ${kind}`);
    } else {
      normal.set(end, end.clone().set(0, 0, 0));
      w.say('raycast -> false');
    }
  });
  return w.stage.dispose;
};

export default mount;
