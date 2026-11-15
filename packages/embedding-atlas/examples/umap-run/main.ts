// createUMAP on clustered 50-dimensional vectors, then run() and read embedding
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { readout } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box, 'building the neighbour graph…');

  // 6 clusters in 50 dimensions, as one row-major Float32Array of count * inputDim values.
  const v = clusteredVectors(stage.preview ? 800 : 3000, 50, 6);

  const umap = await createUMAP(v.count, v.dim, 2, v.data, { metric: 'euclidean', seed: 1 });
  if (stage.disposed) {
    umap.destroy();
    return stage.dispose;
  }
  stage.onDispose(() => umap.destroy());

  // Before any epoch the embedding already holds the spectral initialisation.
  plot.draw(umap.embedding, v.label);
  status.textContent = `epoch ${umap.epoch}: spectral initialisation`;

  const anneal = async (): Promise<void> => {
    const t0 = performance.now();
    await umap.run();
    if (stage.disposed) return;
    plot.draw(umap.embedding, v.label);
    status.textContent = `epoch ${umap.epoch}: run() finished in ${Math.round(performance.now() - t0)} ms`;
  };
  await anneal();

  // Cards loop: start again from a random layout and anneal once more.
  if (stage.preview) {
    stage.every(6000, () => {
      umap.reset('random');
      plot.draw(umap.embedding, v.label);
      void anneal();
    });
  }
  return stage.dispose;
};

export default mount;
