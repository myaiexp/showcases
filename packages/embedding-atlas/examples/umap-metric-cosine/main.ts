// createUMAP metric euclidean vs cosine on rows of varying length
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { pace, panels, withMagnitudes } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const [left, right] = panels(stage, ['metric: euclidean', 'metric: cosine']);
  // Same six directions, but every row is scaled by a random length: only cosine ignores it.
  const v = withMagnitudes(clusteredVectors(stage.preview ? 700 : 2000, 40, 6, 3, 0.7));
  const [a, b] = await Promise.all([
    createUMAP(v.count, v.dim, 2, v.data, { metric: 'euclidean', seed: 1 }),
    createUMAP(v.count, v.dim, 2, v.data, { metric: 'cosine', seed: 1 }),
  ]);
  stage.own(a);
  stage.own(b);
  if (stage.disposed) return stage.dispose;

  if (stage.bar) button(stage.bar, 'Restart', () => (a.reset('random'), b.reset('random')));
  pace(stage, async () => {
    if (a.epoch < 200) await Promise.all([a.step(4), b.step(4)]);
    if (stage.disposed) return;
    left!.plot.draw(a.embedding, v.label, { ease: 0.2 });
    right!.plot.draw(b.embedding, v.label, { ease: 0.2 });
    if (stage.preview && a.epoch >= 200) {
      a.reset('random');
      b.reset('random');
    }
  });
  return stage.dispose;
};

export default mount;
