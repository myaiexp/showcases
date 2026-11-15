// A BoundingFrustum from a view-projection matrix, with boxes and spheres tested against it
import { BoundingBox, BoundingFrustum, BoundingSphere, CollisionUtil, ContainmentType, Matrix, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, polyline, solid, tick, unlit, wireBox } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The frustum belongs to a camera that is never drawn: its view and projection matrices are built by hand.' });
  const { engine, root } = stage;
  lit(stage, [13, 11, 9], [0, 0, -2]);
  // The probe camera sits at the origin looking down -Z, like a default entity.
  const view = new Matrix();
  const projection = new Matrix();
  const vp = new Matrix();
  Matrix.lookAt(new Vector3(0, 0, 3), new Vector3(0, 0, -1), new Vector3(0, 1, 0), view);
  Matrix.perspective((50 * Math.PI) / 180, 1.4, 1, 9, projection);
  Matrix.multiply(projection, view, vp);
  const frustum = new BoundingFrustum(vp);
  // Corners come back out of NDC space through the inverse view-projection matrix.
  const inverse = new Matrix();
  Matrix.invert(vp, inverse);
  const corners = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const c = new Vector3(i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1);
    Vector3.transformCoordinate(c, inverse, c);
    return c;
  });
  const edge = unlit(engine, PALETTE.grey);
  const order = [[0, 1, 3, 2], [4, 5, 7, 6]];
  for (const loop of order) polyline(root, edge, 4, 0.04).set(loop.map((i) => corners[i]!), true);
  for (let i = 0; i < 4; i++) polyline(root, edge, 1, 0.04).set([corners[i]!, corners[i + 4]!]);

  const box = new BoundingBox();
  const sphere = new BoundingSphere();
  const boxMat = phong(engine, PALETTE.green);
  const ballMat = phong(engine, PALETTE.green);
  const boxMesh = solid(root, PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2), boxMat);
  const ballMesh = solid(root, PrimitiveMesh.createSphere(engine, 0.7, 20), ballMat);
  const boxWire = wireBox(root, unlit(engine, PALETTE.white), 0.015);
  const info = panel(stage);
  const labelOf = (c: ContainmentType): string => ['Disjoint', 'Contains', 'Intersects'][c]!;
  tick(root, (_dt, t) => {
    const bx = Math.sin(t * 0.9) * 5;
    boxMesh.transform.setPosition(bx, 0.5, -4 + Math.cos(t * 0.5) * 0.6);
    boxMesh.transform.rotate(0, 0.6, 0);
    const c = boxMesh.transform.worldPosition;
    box.min.set(c.x - 0.6, c.y - 0.6, c.z - 0.6);
    box.max.set(c.x + 0.6, c.y + 0.6, c.z + 0.6);
    boxWire.set(box.min, box.max);
    ballMesh.transform.setPosition(Math.cos(t * 0.7) * 5, -1.8, -3.5);
    sphere.center.copyFrom(ballMesh.transform.worldPosition);
    sphere.radius = 0.7;
    const hitBox = frustum.intersectsBox(box);
    const hitBall = frustum.intersectsSphere(sphere);
    boxMat.baseColor.set(hitBox ? 0.35 : 0.9, hitBox ? 0.85 : 0.3, hitBox ? 0.45 : 0.3, 1);
    ballMat.baseColor.set(hitBall ? 0.35 : 0.9, hitBall ? 0.85 : 0.3, hitBall ? 0.45 : 0.3, 1);
    info.text(`box    intersectsBox ${hitBox}   ${labelOf(CollisionUtil.frustumContainsBox(frustum, box))}\nsphere intersectsSphere ${hitBall}   ${labelOf(CollisionUtil.frustumContainsSphere(frustum, sphere))}`);
  });
  return stage.dispose;
};

export default mount;
