// embedding is a reused buffer: a held reference moves, a copy stays
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { pace, panels } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const [live, copy] = panels(stage, ['kept: umap.embedding', 'kept: new Float32Array(umap.embedding)']);
  const v = clusteredVectors(stage.preview ? 600 : 1500, 40, 6, 9);
  const umap = stage.own(await createUMAP(v.count, v.dim, 2, v.data, { initializeMethod: 'random', seed: 5 }));
  if (stage.disposed) return stage.dispose;

  // Both are taken at epoch 0 and then kept while the layout runs on.
  let alias = umap.embedding;
  let snapshot = new Float32Array(umap.embedding);
  let hold = 0;
  pace(stage, async () => {
    if (umap.epoch < 200) await umap.step(2);
    else if (++hold > (stage.preview ? 80 : 240)) {
      (hold = 0), umap.reset('random');
      alias = umap.embedding;
      snapshot = new Float32Array(umap.embedding);
    }
    if (stage.disposed) return;
    live!.plot.draw(alias, v.label, { ease: 0.3 });
    copy!.plot.draw(snapshot, v.label, { ease: 0.3 });
    live!.label.textContent = `kept: umap.embedding   epoch ${umap.epoch}`;
    copy!.label.textContent = 'kept: copy taken at epoch 0';
  });
  return stage.dispose;
};

export default mount;
