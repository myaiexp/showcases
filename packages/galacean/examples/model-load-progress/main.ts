// onProgress on a batch load: the task total, then each file's own loaded and total
import { Animator, AssetType, type GLTFResource } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { blinn, demo, floor, tick } from '../../shared/gfx-kit.ts';
import { blobGlb, robotGlb, tentacleGlb } from '../../shared/gltf-models.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { add } from '../../shared/gfx-kit.ts';
import { PrimitiveMesh } from '@galacean/engine';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.7, 7], target: [0, 1, 0] });
  floor(root, engine, 0, 14, blinn(engine, [0.3, 0.34, 0.42], 10));
  stage.scene.ambientLight = await loadStudioEnv(engine);
  const log = eventLog(stage, 6);
  const urls = [robotGlb(), tentacleGlb(), blobGlb()].map((b) => b.url());
  stage.own(() => urls.forEach((u) => URL.revokeObjectURL(u)));
  const bar = add(root, PrimitiveMesh.createCuboid(engine, 1, 0.2, 0.2), blinn(engine, [0.4, 0.9, 0.5]), [0, -0.4, 0], 'progress').entity;
  let fraction = 0;
  const models: ReturnType<GLTFResource['instantiateSceneRoot']>[] = [];
  let run = 0;
  const load = (): void => {
    const mine = ++run;
    models.splice(0).forEach((m) => m.destroy());
    log.clear();
    fraction = 0;
    const promise = engine.resourceManager.load(urls.map((url) => ({ url, type: AssetType.GLTF })));
    promise.onProgress(
      (loaded, total) => {
        if (mine !== run) return;
        fraction = loaded / total;
        log.log(`task ${loaded}/${total}`);
      },
      (url, loaded, total) => {
        if (mine === run) log.log(`${url.slice(-6)} ${loaded}/${total}`);
      },
    );
    promise.then((loaded) => {
      const all = loaded as GLTFResource[];
      if (mine !== run || engine.destroyed) return;
      all.forEach((g, i) => {
        const m = g.instantiateSceneRoot();
        m.transform.setPosition((i - 1) * 2.6, i === 2 ? 1 : 0, 0);
        m.getComponent(Animator)?.play(g.animations![0]!.name);
        if (i === 1) m.transform.setScale(0.7, 0.7, 0.7);
        root.addChild(m);
        models.push(m);
      });
    });
  };
  load();
  if (stage.preview) {
    let t = 0;
    tick(root, (dt) => {
      t += dt;
      if (t > 4) {
        t = 0;
        load();
      }
    });
  } else button(stage.bar, 'Load again', load);
  tick(root, () => {
    bar.transform.setScale(Math.max(0.001, fraction * 7), 1, 1);
    bar.transform.setPosition((fraction * 7) / 2 - 3.5, -0.4, 0);
  });
  return stage.dispose;
};

export default mount;
