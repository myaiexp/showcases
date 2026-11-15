// createUMAPFromKNN on a hand-made ring graph of neighbouring nodes
import { createUMAPFromKNN } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { button, readout } from '../../shared/controls.ts';
import { drawLinks, pace } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box);

  // Node i is joined to i ± 1 and i ± 2 (distances 1, 1, 2, 2): four columns per row, ascending.
  const count = 160;
  const k = 4;
  const indices = new Int32Array(count * k);
  const distances = new Float32Array(count * k);
  for (let i = 0; i < count; i++) {
    [1, -1, 2, -2].forEach((off, j) => {
      indices[i * k + j] = (i + off + count) % count;
      distances[i * k + j] = Math.abs(off);
    });
  }
  const label = Uint8Array.from({ length: count }, (_, i) => Math.floor((i / count) * 8));
  // No high-dimensional data: the graph is all UMAP gets.
  const umap = stage.own(await createUMAPFromKNN(count, 2, indices, distances, { initializeMethod: 'random', seed: 1 }));
  if (stage.disposed) return stage.dispose;

  let annealed = false;
  const restart = (): void => ((annealed = false), umap.reset('random'));
  if (stage.bar) button(stage.bar, 'Restart', restart);
  let hold = 0;
  pace(stage, async () => {
    // Flat steps first, then run() anneals the learning rate to zero so the layout settles.
    if (umap.epoch < 150) await umap.step(2);
    else if (!annealed) (annealed = true), await umap.run();
    else if (stage.preview) await new Promise((r) => setTimeout(r, 60));
    if (stage.disposed) return;
    plot.draw(umap.embedding, label, { size: 3, ease: 0.2 });
    drawLinks(plot, umap.embedding, indices, k, 2, 1, 'rgba(255,255,255,0.3)');
    status.textContent = `${count} nodes, ${k} neighbours each   epoch ${umap.epoch}   inputDim ${umap.inputDim}`;
    if (stage.preview && annealed && ++hold > 60) (hold = 0), restart();
  });
  return stage.dispose;
};

export default mount;
