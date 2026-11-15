// createUMAP, then step() once per frame so the layout visibly unfolds
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
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 6);

  // Random start so the first epochs show the most motion.
  const umap = stage.own(await createUMAP(v.count, v.dim, 2, v.data, { initializeMethod: 'random', seed: 2 }));
  if (stage.disposed) return stage.dispose;

  let paused = false;
  const restart = (): void => {
    umap.reset('random');
  };
  if (stage.bar) {
    button(stage.bar, 'Restart', restart);
    button(stage.bar, 'Pause / resume', () => (paused = !paused));
  }

  // step(n) advances n epochs at a flat learning rate; the loop awaits it, so frames never pile up.
  pace(stage, async () => {
    if (!paused) await umap.step(2);
    if (stage.disposed) return;
    plot.draw(umap.embedding, v.label, { ease: 0.2 });
    status.textContent = `epoch ${umap.epoch}`;
    if (stage.preview && umap.epoch > 400) restart();
  });
  return stage.dispose;
};

export default mount;
