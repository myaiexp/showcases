// CollisionUtil shape tests: sphere-sphere, sphere-box and box-box decide which static shapes light up
import { BoundingBox, BoundingSphere, CollisionUtil, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'A moving sphere (cyan) and box (violet) pass a static sphere and box. A static shape turns amber when any test touches it.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 2, 13]);
  const tag = labels(stage, camera);
  const ballMat = phong(engine, PALETTE.grey);
  const boxMat = phong(engine, PALETTE.grey);
  solid(root, PrimitiveMesh.createSphere(engine, 0.9, 24), ballMat, [-1.8, 0, 0]);
  solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), boxMat, [1.8, 0, 0]);
  const movingBall = solid(root, PrimitiveMesh.createSphere(engine, 0.6, 20), phong(engine, PALETTE.cyan));
  const movingBox = solid(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), phong(engine, PALETTE.violet));
  const tags = [tag.add('static sphere', '#cfd6e4'), tag.add('static box', '#cfd6e4')];
  const info = panel(stage);
  const staticSphere = new BoundingSphere(new Vector3(-1.8, 0, 0), 0.9);
  const staticBox = new BoundingBox(new Vector3(1, -0.8, -0.8), new Vector3(2.6, 0.8, 0.8));
  const sphere = new BoundingSphere(new Vector3(), 0.6);
  const box = new BoundingBox();
  const tint = (m: typeof ballMat, hit: boolean): void => void m.baseColor.set(hit ? 1 : 0.6, hit ? 0.75 : 0.64, hit ? 0.25 : 0.7, 1);
  tick(root, (_dt, t) => {
    const x = Math.sin(t * 0.7) * 4.6;
    movingBall.transform.setPosition(x, 1.6, 0);
    movingBox.transform.setPosition(-x, -1.6, 0);
    sphere.center.set(x, 1.6, 0);
    box.min.set(-x - 0.5, -2.1, -0.5);
    box.max.set(-x + 0.5, -1.1, 0.5);
    const ss = CollisionUtil.intersectsSphereAndSphere(sphere, staticSphere);
    const sb = CollisionUtil.intersectsSphereAndBox(sphere, staticBox);
    const bb = CollisionUtil.intersectsBoxAndBox(box, staticBox);
    const bs = CollisionUtil.intersectsSphereAndBox(staticSphere, box);
    tint(ballMat, ss || bs);
    tint(boxMat, sb || bb);
    tags[0]!.at(new Vector3(-1.8, 1, 0));
    tags[1]!.at(new Vector3(1.8, 1, 0));
    info.text(`sphere x sphere ${ss}\nsphere x box    ${sb}\nbox x box       ${bb}\nbox x sphere    ${bs}   (intersectsSphereAndBox)`);
  });
  return stage.dispose;
};

export default mount;
