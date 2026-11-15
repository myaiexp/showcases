// createUMAPFromKNN on a hand-made 20 by 20 grid lattice
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

  const side = 20;
  const count = side * side;
  const k = 8;
  const indices = new Int32Array(count * k);
  const distances = new Float32Array(count * k);
  for (let i = 0; i < count; i++) {
    const ix = i % side, iy = Math.floor(i / side);
    // Every row needs the same length (the effective k is the shortest row), so edge cells
    // simply take their 8 nearest cells by grid distance, excluding themselves.
    const near: [number, number][] = [];
    for (let j = 0; j < count; j++) {
      if (j !== i) near.push([Math.hypot((j % side) - ix, Math.floor(j / side) - iy), j]);
    }
    near.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    for (let c = 0; c < k; c++) {
      indices[i * k + c] = near[c]![1];
      distances[i * k + c] = near[c]![0];
    }
  }
  const label = Uint8Array.from({ length: count }, (_, i) => (i % side < side / 2 ? 0 : 1) + (i < count / 2 ? 0 : 2));
  const umap = stage.own(await createUMAPFromKNN(count, 2, indices, distances, { initializeMethod: 'random', seed: 3 }));
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
    drawLinks(plot, umap.embedding, indices, k, 4, 1, 'rgba(255,255,255,0.15)');
    status.textContent = `${side} x ${side} lattice   epoch ${umap.epoch}`;
    if (stage.preview && annealed && ++hold > 60) (hold = 0), restart();
  });
  return stage.dispose;
};

export default mount;
