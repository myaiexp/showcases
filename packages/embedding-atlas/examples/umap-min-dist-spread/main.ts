// setParameters({ minDist, spread }) re-fits the curve while stepping
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { readout, slider } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { pace } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box);
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 5);
  const umap = stage.own(await createUMAP(v.count, v.dim, 2, v.data, { seed: 4, minDist: 0.1, spread: 1 }));
  if (stage.disposed) return stage.dispose;
  await umap.step(60);

  let minDist = 0.1;
  let spread = 1;
  const apply = (): void => umap.setParameters({ minDist, spread });
  if (stage.bar) {
    slider(stage.bar, 'minDist', 0, 1.5, 0.05, minDist, (x) => ((minDist = x), apply()), (x) => x.toFixed(2));
    slider(stage.bar, 'spread', 0.5, 3, 0.1, spread, (x) => ((spread = x), apply()), (x) => x.toFixed(1));
  } else {
    // Cards: swing minDist back and forth, tight clumps to loose clouds.
    stage.loop((_dt, t) => {
      minDist = 0.05 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.8));
      apply();
    });
  }
  pace(stage, async () => {
    await umap.step(3);
    if (stage.disposed) return;
    plot.draw(umap.embedding, v.label, { ease: 0.15 });
    status.textContent = `epoch ${umap.epoch}   minDist ${minDist.toFixed(2)}   spread ${spread.toFixed(1)}`;
  });
  return stage.dispose;
};

export default mount;
