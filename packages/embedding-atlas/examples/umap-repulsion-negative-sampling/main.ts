// setParameters({ repulsionStrength, negativeSampleRate }): push strength
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
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 6);
  const umap = stage.own(await createUMAP(v.count, v.dim, 2, v.data, { seed: 6 }));
  if (stage.disposed) return stage.dispose;
  await umap.step(40);

  let repulsion = 1;
  let negatives = 5;
  const apply = (): void => umap.setParameters({ repulsionStrength: repulsion, negativeSampleRate: negatives });
  if (stage.bar) {
    slider(stage.bar, 'repulsionStrength', 0, 5, 0.1, repulsion, (x) => ((repulsion = x), apply()), (x) => x.toFixed(1));
    slider(stage.bar, 'negativeSampleRate', 1, 20, 1, negatives, (x) => ((negatives = x), apply()));
  } else {
    stage.loop((_dt, t) => {
      repulsion = 0.2 + 3 * (0.5 + 0.5 * Math.sin(t * 0.7));
      apply();
    });
  }
  pace(stage, async () => {
    await umap.step(3);
    if (stage.disposed) return;
    plot.draw(umap.embedding, v.label, { ease: 0.15 });
    status.textContent = `epoch ${umap.epoch}   repulsionStrength ${repulsion.toFixed(1)}   negativeSampleRate ${negatives}`;
  });
  return stage.dispose;
};

export default mount;
