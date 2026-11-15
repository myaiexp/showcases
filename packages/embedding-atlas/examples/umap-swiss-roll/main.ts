// A 10-dimension Swiss roll beside UMAP's unrolled sheet
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { swissRoll } from '../../shared/vectors.ts';
import { pace, panels } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const [raw, out] = panels(stage, ['input: x and z (the spiral)', 'createUMAP result']);
  const v = swissRoll(stage.preview ? 700 : 1800, 10);
  const spiral = new Float32Array(v.count * 2);
  for (let i = 0; i < v.count; i++) {
    spiral[i * 2] = v.data[i * v.dim]!;
    spiral[i * 2 + 1] = v.data[i * v.dim + 2]!;
  }
  raw!.plot.draw(spiral, v.label);
  const umap = stage.own(await createUMAP(v.count, v.dim, 2, v.data, { nNeighbors: 12, initializeMethod: 'random', seed: 4 }));
  if (stage.disposed) return stage.dispose;

  let hold = 0;
  pace(stage, async () => {
    if (umap.epoch < 300) await umap.step(3);
    else if (stage.preview && ++hold > 100) (hold = 0), umap.reset('random');
    if (stage.disposed) return;
    out!.plot.draw(umap.embedding, v.label, { ease: 0.2 });
    out!.label.textContent = `createUMAP result   epoch ${umap.epoch}`;
  });
  return stage.dispose;
};

export default mount;
