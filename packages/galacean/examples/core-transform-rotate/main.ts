// Two tilted cubes spin with rotate: around their own tilted Y, and around the world's Y
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Both cubes are tilted 40 degrees about Z, then rotate(0, 90 * dt, 0) every frame.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 2, 8]);
  const tag = labels(stage, camera);
  const mesh = PrimitiveMesh.createCuboid(engine, 0.7, 1.8, 0.7);
  const local = solid(root, mesh, phong(engine, PALETTE.green), [-1.8, 0, 0]);
  const world = solid(root, mesh, phong(engine, PALETTE.violet), [1.8, 0, 0]);
  local.transform.setRotation(0, 0, 40);
  world.transform.setRotation(0, 0, 40);
  const a = tag.add('relativeToLocal: true', '#7be28f');
  const b = tag.add('relativeToLocal: false', '#c6a4ff');
  const above = new Vector3(0, 1.4, 0);
  const at = new Vector3();
  tick(root, (dt) => {
    local.transform.rotate(0, 90 * dt, 0, true);
    world.transform.rotate(0, 90 * dt, 0, false);
    Vector3.add(local.transform.worldPosition, above, at);
    a.at(at);
    Vector3.add(world.transform.worldPosition, above, at);
    b.at(at);
  });
  return stage.dispose;
};

export default mount;
