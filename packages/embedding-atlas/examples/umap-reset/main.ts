// reset() and reset('random') restart a running UMAP from epoch 0
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { button, readout } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { pace } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box);
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 6, 12);
  const umap = stage.own(await createUMAP(v.count, v.dim, 2, v.data, { seed: 3 }));
  if (stage.disposed) return stage.dispose;

  let method = 'spectral (default)';
  const spectral = (): void => ((method = 'spectral (default)'), umap.reset());
  const random = (): void => ((method = 'random'), umap.reset('random'));
  if (stage.bar) {
    button(stage.bar, "reset()", spectral);
    button(stage.bar, "reset('random')", random);
  }
  let last = 0;
  pace(stage, async () => {
    // reset() is queued behind the step in flight, so the epoch drops after it settles.
    await umap.step(3);
    if (stage.disposed) return;
    plot.draw(umap.embedding, v.label, { ease: 0.3 });
    status.textContent = `last reset: ${method}   epoch ${umap.epoch}`;
    if (stage.preview && umap.epoch - last > 90) {
      (last = 0), method === 'random' ? spectral() : random();
      last = umap.epoch;
    }
  });
  return stage.dispose;
};

export default mount;
