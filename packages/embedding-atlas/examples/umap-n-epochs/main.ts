// createUMAP nEpochs 20, 100 and 500, then run() to the horizon end
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { caption } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 7, 17, 1.6);
  stage.variants('nEpochs', ['20', '100', '500'], async (n, host) => {
    const plot = createScatter(host, stage.width, stage.height);
    const cap = caption(host, `nEpochs: ${n}   running…`);
    const umap = await createUMAP(v.count, v.dim, 2, v.data, { nEpochs: Number(n), seed: 1 });
    plot.draw(umap.embedding, v.label);
    const t0 = performance.now();
    umap.run().then(
      () => {
        plot.draw(umap.embedding, v.label);
        cap.textContent = `nEpochs: ${n}   run() ended at epoch ${umap.epoch} after ${Math.round(performance.now() - t0)} ms`;
      },
      () => {}, // destroyed mid-run
    );
    return umap;
  }, 5000);
  return stage.dispose;
};

export default mount;
