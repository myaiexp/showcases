// knnIndices and knnDistances of a UMAP instance, drawn as a neighbour graph
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { readout, slider } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { drawLinks, pace } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box);
  const v = clusteredVectors(stage.preview ? 300 : 500, 30, 5, 18, 2.4);
  const umap = stage.own(await createUMAP(v.count, v.dim, 2, v.data, { nNeighbors: 8, seed: 2 }));
  if (stage.disposed) return stage.dispose;

  // Rows of knnIndices list each point's neighbours, nearest first, available before any step.
  const k = umap.knnIndices.length / v.count;
  let shown = k;
  if (stage.bar) slider(stage.bar, 'neighbours drawn', 1, k, 1, shown, (x) => (shown = x));
  const mean = umap.knnDistances.reduce((s, d) => s + d, 0) / umap.knnDistances.length;
  pace(stage, async () => {
    if (umap.epoch < 200) await umap.step(2);
    if (stage.disposed) return;
    plot.draw(umap.embedding, v.label, { size: 2, ease: 0.2 });
    drawLinks(plot, umap.embedding, umap.knnIndices, k, shown);
    status.textContent = `knnIndices: ${v.count} rows of ${k}   mean knnDistance ${mean.toFixed(2)}   epoch ${umap.epoch}`;
  });
  return stage.dispose;
};

export default mount;
