// A batch load reports progress with AssetPromise.onProgress while items finish at different times
import { AssetPromise, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { SLOW_TYPE } from '../../shared/assets-slow.ts';
import { button } from '../../shared/controls.ts';
import { lit, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const DELAYS = [300, 1500, 700, 2100, 1100, 1800];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Six items load in parallel (0.3 to 2.1 s). Each cube turns green when its item resolves.' });
  const { engine, root } = stage;
  lit(stage, [0, 2, 8]);
  const cubes = DELAYS.map((_, i) => solid(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), phong(engine, [0.35, 0.38, 0.45]), [(i - 2.5) * 1.5, 0, 0]));
  const bar = solid(root, PrimitiveMesh.createCuboid(engine, 1, 0.25, 0.25), unlit(engine, [0.35, 0.85, 0.45]), [0, -1.6, 0], 'progress');
  const info = panel(stage);
  let progress = 0;
  let running = false;
  let generation = 0;
  const start = (): void => {
    const mine = ++generation;
    running = true;
    progress = 0;
    cubes.forEach((c) => c.transform.setScale(1, 1, 1));
    const items = DELAYS.map((ms, i) => ({ type: SLOW_TYPE, url: `slow://${mine}/${i}`, params: { ms } }));
    // load(items) is AssetPromise.all over one load per item; building it by hand keeps each item's own promise.
    const each = items.map((item) => engine.resourceManager.load<string>(item));
    each.forEach((p, i) => p.then(() => mine === generation && !engine.destroyed && cubes[i]!.transform.setScale(1.3, 1.3, 1.3)));
    const all = AssetPromise.all(each);
    all.onProgress((loaded, total) => {
      if (mine === generation) progress = loaded / total;
    });
    all.then(() => {
      if (mine === generation) running = false;
    });
  };
  start();
  if (!stage.preview) button(stage.bar, 'Load again', start);
  let idle = 0;
  tick(root, (dt) => {
    bar.transform.setScale(Math.max(0.001, progress * 6), 1, 1);
    bar.transform.setPosition((progress * 6) / 2 - 3, -1.6, 0);
    cubes.forEach((c) => c.transform.rotate(0, 30 * dt, 0));
    if (!running && stage.preview) {
      idle += dt;
      if (idle > 1.2) {
        idle = 0;
        start();
      }
    }
    info.text(`onProgress(loaded, total) -> ${(progress * 100).toFixed(0)}%\n${running ? 'loading...' : 'all loaded'}`);
  });
  return stage.dispose;
};

export default mount;
