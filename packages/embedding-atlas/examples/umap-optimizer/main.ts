// createUMAP with optimizer sgd vs momentum from the same random start
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { pace, panels } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const [left, right] = panels(stage, ['optimizer: sgd', 'optimizer: momentum']);
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 8, 21);
  // Momentum forces a random start, so both begin random to compare like with like.
  const [a, b] = await Promise.all([
    createUMAP(v.count, v.dim, 2, v.data, { optimizer: 'sgd', initializeMethod: 'random', seed: 2 }),
    createUMAP(v.count, v.dim, 2, v.data, { optimizer: 'momentum', initializeMethod: 'random', seed: 2 }),
  ]);
  stage.own(a);
  stage.own(b);
  if (stage.disposed) return stage.dispose;

  const restart = (): void => (a.reset('random'), b.reset('random'));
  if (stage.bar) button(stage.bar, 'Restart', restart);
  let hold = 0;
  pace(stage, async () => {
    if (a.epoch < 250) await Promise.all([a.step(3), b.step(3)]);
    else if (stage.preview && ++hold > 80) (hold = 0), restart();
    if (stage.disposed) return;
    left!.plot.draw(a.embedding, v.label, { ease: 0.25 });
    right!.plot.draw(b.embedding, v.label, { ease: 0.25 });
    left!.label.textContent = `sgd   epoch ${a.epoch}`;
    right!.label.textContent = `momentum   epoch ${b.epoch}`;
  });
  return stage.dispose;
};

export default mount;
