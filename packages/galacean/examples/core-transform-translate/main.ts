// translate along the cube's own axes versus the world's
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Both cubes are turned 45 degrees about Y and translate by (0, 0, -1) per second.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 6, 6.5], [0, 0, 0]);
  const tag = labels(stage, camera);
  const mesh = PrimitiveMesh.createCuboid(engine, 0.8, 0.5, 1.4);
  const local = solid(root, mesh, phong(engine, PALETTE.green), [-2, 0, 2]);
  const world = solid(root, mesh, phong(engine, PALETTE.violet), [2, 0, 2]);
  local.transform.setRotation(0, 45, 0);
  world.transform.setRotation(0, 45, 0);
  const a = tag.add('translate(v, true)', '#7be28f');
  const b = tag.add('translate(v, false)', '#c6a4ff');
  let running = true;
  if (!stage.preview) checkbox(stage.bar, 'moving', true, (on) => (running = on));
  tick(root, (dt) => {
    if (running) {
      local.transform.translate(0, 0, -dt, true);
      world.transform.translate(0, 0, -dt, false);
      for (const c of [local, world]) {
        if (c.transform.position.z < -2.5 || c.transform.position.x < -4 || c.transform.position.x > 4) c.transform.setPosition(c === local ? -2 : 2, 0, 2);
      }
    }
    a.at(local.transform.worldPosition);
    b.at(world.transform.worldPosition);
  });
  return stage.dispose;
};

export default mount;
