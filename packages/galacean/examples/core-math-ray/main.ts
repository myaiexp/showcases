// A Ray against a plane, a sphere and a box: intersect* return a distance, or -1 for a miss
import { BoundingBox, BoundingSphere, Plane, Ray, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { line, lit, marker, PALETTE, planeSheet, tick, unlit, wireBox, wireSphere } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The ray starts at the origin and swings around. Hit points come from ray.getPoint(distance).' });
  const { engine, root } = stage;
  lit(stage, [0, 3, 12], [0, 2.8, 0]);
  const plane = new Plane(new Vector3(0, 1, 0), -3);
  const sheet = planeSheet(root, unlit(engine, PALETTE.cyan, 0.25), 9);
  sheet.set(plane.normal, plane.distance);
  const sphere = new BoundingSphere(new Vector3(2.4, 5.5, 0), 1);
  const box = new BoundingBox();
  BoundingBox.fromCenterAndExtent(new Vector3(-2.6, 5.4, 0), new Vector3(1, 1, 1), box);
  wireSphere(root, unlit(engine, PALETTE.violet), 0.03).set(sphere.center, sphere.radius);
  wireBox(root, unlit(engine, PALETTE.green), 0.03).set(box.min, box.max);
  const beam = line(root, unlit(engine, PALETTE.amber), 0.04);
  const hits = [PALETTE.cyan, PALETTE.violet, PALETTE.green].map((c) => marker(root, unlit(engine, c), 0.3));
  const info = panel(stage);
  const ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 1, 0));
  const end = new Vector3();
  const point = new Vector3();
  let angle = 0;
  let manual = false;
  if (!stage.preview) slider(stage.bar, 'ray angle (deg from +Y)', -60, 60, 1, 0, (v) => ((manual = true), (angle = v)));
  tick(root, (_dt, t) => {
    if (!manual) angle = Math.sin(t * 0.6) * 42;
    const a = (angle * Math.PI) / 180;
    ray.direction.set(Math.sin(a), Math.cos(a), 0);
    const results = [ray.intersectPlane(plane), ray.intersectSphere(sphere), ray.intersectBox(box)];
    const nearest = results.filter((d) => d >= 0).sort((x, y) => x - y)[0];
    ray.getPoint(nearest ?? 9, end);
    beam.set(ray.origin, end);
    results.forEach((d, i) => {
      hits[i]!.entity.isActive = d >= 0;
      if (d >= 0) hits[i]!.set(ray.getPoint(d, point));
    });
    info.text(`intersectPlane  ${results[0]!.toFixed(2)}\nintersectSphere ${results[1]!.toFixed(2)}\nintersectBox    ${results[2]!.toFixed(2)}   (-1 is a miss)`);
  });
  return stage.dispose;
};

export default mount;
