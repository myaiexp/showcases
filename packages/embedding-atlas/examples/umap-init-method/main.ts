// createUMAP with initializeMethod spectral vs random, drawn from epoch 0
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { pace, panels } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const [left, right] = panels(stage, ['initializeMethod: spectral', 'initializeMethod: random']);
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 6, 8);
  const [a, b] = await Promise.all([
    createUMAP(v.count, v.dim, 2, v.data, { initializeMethod: 'spectral', seed: 1 }),
    createUMAP(v.count, v.dim, 2, v.data, { initializeMethod: 'random', seed: 1 }),
  ]);
  stage.own(a);
  stage.own(b);
  if (stage.disposed) return stage.dispose;

  // Back to epoch 0 with each instance's own method: spectral starts already organised.
  const restart = (): void => (a.reset('spectral'), b.reset('random'));
  if (stage.bar) button(stage.bar, 'Restart', restart);
  let hold = 0;
  pace(stage, async () => {
    if (a.epoch < 150) await Promise.all([a.step(2), b.step(2)]);
    else if (stage.preview && ++hold > 90) (hold = 0), restart();
    if (stage.disposed) return;
    left!.plot.draw(a.embedding, v.label, { ease: 0.25 });
    right!.plot.draw(b.embedding, v.label, { ease: 0.25 });
    left!.label.textContent = `spectral   epoch ${a.epoch}`;
    right!.label.textContent = `random   epoch ${b.epoch}`;
  });
  return stage.dispose;
};

export default mount;
