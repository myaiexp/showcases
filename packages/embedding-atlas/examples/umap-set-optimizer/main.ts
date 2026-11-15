// setOptimizer switches a running UMAP between sgd and momentum
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { readout, select } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { pace } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box);
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 8, 5);
  const umap = stage.own(await createUMAP(v.count, v.dim, 2, v.data, { initializeMethod: 'random', seed: 7 }));
  if (stage.disposed) return stage.dispose;

  let optimizer: 'sgd' | 'momentum' = 'sgd';
  const set = (o: 'sgd' | 'momentum'): void => {
    optimizer = o;
    umap.setOptimizer(o); // queued behind any step in flight; resets the velocity buffer
  };
  const sel = stage.bar ? select(stage.bar, 'optimizer', ['sgd', 'momentum'] as const, set) : null;
  let since = 0;
  pace(stage, async () => {
    await umap.step(2);
    if (stage.disposed) return;
    plot.draw(umap.embedding, v.label, { ease: 0.25 });
    status.textContent = `optimizer ${optimizer}   epoch ${umap.epoch}`;
    if (stage.preview && ++since > 70) {
      since = 0;
      set(optimizer === 'sgd' ? 'momentum' : 'sgd');
      if (sel) sel.value = optimizer;
    }
  });
  return stage.dispose;
};

export default mount;
