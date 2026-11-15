// cancelNotLoaded(url) and cancelNotLoaded() stop unfinished loads
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { SLOW_TYPE } from '../../shared/assets-slow.ts';
import { button } from '../../shared/controls.ts';
import { lit, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const DELAYS = [600, 3000, 3200, 1400, 3400];
const GREY: [number, number, number] = [0.45, 0.48, 0.55];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Grey is pending, green loaded, red cancelled. A cancelled load rejects, so each load needs a catch.' });
  const { engine, root } = stage;
  lit(stage, [0, 2, 8]);
  const log = eventLog(stage, 8, 'bl');
  const materials = DELAYS.map(() => phong(engine, GREY));
  const cubes = materials.map((m, i) => solid(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), m, [(i - 2) * 1.6, 0, 0]));
  let generation = 0;
  const urls: string[] = [];
  const start = (): void => {
    const mine = ++generation;
    log.clear();
    urls.length = 0;
    DELAYS.forEach((ms, i) => {
      const url = `slow://${mine}/${i}`;
      urls.push(url);
      materials[i]!.baseColor.set(...GREY, 1);
      engine.resourceManager
        .load({ type: SLOW_TYPE, url, params: { ms } })
        .then(() => {
          if (engine.destroyed) return;
          materials[i]!.baseColor.set(0.35, 0.85, 0.45, 1);
          log.log(`item ${i + 1} loaded`);
        })
        .catch(() => {
          if (engine.destroyed) return; // destroying the engine cancels every pending load
          materials[i]!.baseColor.set(0.9, 0.3, 0.3, 1);
          log.log(`item ${i + 1} rejected (cancelled)`);
        });
    });
  };
  const cancelOne = (): void => {
    log.log('cancelNotLoaded(item 2 url)');
    engine.resourceManager.cancelNotLoaded(urls[1]!);
  };
  const cancelAll = (): void => {
    log.log('cancelNotLoaded()');
    engine.resourceManager.cancelNotLoaded();
  };
  start();
  if (!stage.preview) {
    button(stage.bar, 'cancelNotLoaded(item 2)', cancelOne);
    button(stage.bar, 'cancelNotLoaded()', cancelAll);
    button(stage.bar, 'Restart', start);
  }
  let started = 0;
  let step = 0;
  tick(root, (dt, t) => {
    cubes.forEach((c) => c.transform.rotate(0, 40 * dt, 0));
    if (stage.preview) {
      const k = t - started;
      if (step === 0 && k > 0.9) {
        step = 1;
        cancelOne();
      } else if (step === 1 && k > 1.7) {
        step = 2;
        cancelAll();
      } else if (step === 2 && k > 3.4) {
        step = 0;
        started = t;
        start();
      }
    }
  });
  return stage.dispose;
};

export default mount;
