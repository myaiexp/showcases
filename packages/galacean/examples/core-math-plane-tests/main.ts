// CollisionUtil against a plane: a point, a sphere and a box classified as Front, Back or Intersecting
import { BoundingBox, BoundingSphere, CollisionUtil, Plane, PlaneIntersectionType, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, phong, planeSheet, PALETTE, solid, tick, unlit } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS: Record<PlaneIntersectionType, readonly [number, number, number]> = {
  [PlaneIntersectionType.Back]: PALETTE.red,
  [PlaneIntersectionType.Front]: PALETTE.green,
  [PlaneIntersectionType.Intersecting]: PALETTE.amber,
};
const NAMES = ['Back', 'Front', 'Intersecting'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The plane is y = 0 with its normal up: Front is above, Back is below.' });
  const { engine, root } = stage;
  const camera = lit(stage, [2, 3, 11], [0, 0, 0]);
  const tag = labels(stage, camera);
  const plane = new Plane(new Vector3(0, 1, 0), 0);
  planeSheet(root, unlit(engine, PALETTE.cyan, 0.28), 10).set(plane.normal, plane.distance);
  const materials = [phong(engine, PALETTE.green), phong(engine, PALETTE.green), phong(engine, PALETTE.green)];
  const point = solid(root, PrimitiveMesh.createSphere(engine, 0.12, 12), materials[0]!);
  const ball = solid(root, PrimitiveMesh.createSphere(engine, 0.9, 24), materials[1]!);
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), materials[2]!);
  const tags = ['point', 'sphere', 'box'].map((n) => tag.add(n, '#cfd6e4'));
  const info = panel(stage);
  const sphere = new BoundingSphere(new Vector3(), 0.9);
  const box = new BoundingBox();
  tick(root, (_dt, t) => {
    const y = Math.sin(t * 0.9) * 2;
    point.transform.setPosition(-3.6, y, 0);
    ball.transform.setPosition(0, y, 0);
    cube.transform.setPosition(3.6, y, 0);
    sphere.center.copyFrom(ball.transform.worldPosition);
    box.min.set(2.8, y - 0.8, -0.8);
    box.max.set(4.4, y + 0.8, 0.8);
    const results = [
      CollisionUtil.intersectsPlaneAndPoint(plane, point.transform.worldPosition),
      CollisionUtil.intersectsPlaneAndSphere(plane, sphere),
      CollisionUtil.intersectsPlaneAndBox(plane, box),
    ];
    results.forEach((r, i) => {
      const [cr, cg, cb] = COLORS[r];
      materials[i]!.baseColor.set(cr, cg, cb, 1);
    });
    [point, ball, cube].forEach((e, i) => tags[i]!.at(new Vector3(e.transform.position.x, 2.7, 0)));
    info.text(
      `distancePlaneAndPoint ${CollisionUtil.distancePlaneAndPoint(plane, point.transform.worldPosition).toFixed(2)}\n` +
        results.map((r, i) => `${['point', 'sphere', 'box  '][i]} ${NAMES[r]}`).join('\n'),
    );
  });
  return stage.dispose;
};

export default mount;
