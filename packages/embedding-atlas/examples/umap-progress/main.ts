// createUMAP progress callback: stage names and a 0..1 fraction
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { eventLog } from '../../shared/controls.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { bar } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, maxWidth: 520 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const set = bar(stage.box);
  const log = eventLog(stage.box, stage.preview ? 1 : 8);
  const v = clusteredVectors(stage.preview ? 1500 : 6000, 60, 8, 41);

  const build = async (): Promise<void> => {
    let lastStage = '';
    const umap = await createUMAP(v.count, v.dim, 2, v.data, {
      seed: 1,
      progress(fraction, name) {
        set(fraction);
        if (name !== lastStage) log(`${name}: ${Math.round(fraction * 100)}%`);
        lastStage = name;
      },
    });
    if (stage.disposed) return void umap.destroy();
    log('createUMAP resolved');
    plot.draw(umap.embedding, v.label);
    await umap.run(); // progress keeps reporting during run()
    if (stage.disposed) return void umap.destroy();
    plot.draw(umap.embedding, v.label);
    set(1);
    log('run() finished');
    umap.destroy();
  };
  await build();
  if (stage.preview) stage.every(6000, () => void build());
  return stage.dispose;
};

export default mount;
