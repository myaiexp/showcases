// setParameters({ learningRate }): step() moves points faster if higher
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
  const umap = stage.own(
    await createUMAP(v.count, v.dim, 2, v.data, { seed: 5, initializeMethod: 'random', learningRate: 1 }),
  );
  if (stage.disposed) return stage.dispose;

  let lr = 1;
  const set = (x: number): void => {
    lr = x;
    umap.setParameters({ learningRate: lr });
  };
  if (stage.bar) slider(stage.bar, 'learningRate', 0.01, 5, 0.01, lr, set, (x) => x.toFixed(2));

  pace(stage, async () => {
    await umap.step(1);
    if (stage.disposed) return;
    plot.draw(umap.embedding, v.label, { ease: 0.25 });
    status.textContent = `epoch ${umap.epoch}   learningRate ${lr.toFixed(2)}`;
    // Cards: alternate a slow and a fast rate, each from a fresh random layout.
    if (stage.preview && umap.epoch > 100) {
      set(lr < 0.5 ? 3 : 0.1);
      umap.reset('random');
    }
  });
  return stage.dispose;
};

export default mount;
