// createUMAP with outputDim 3, drawn as a slowly rotating 3D projection
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { readout } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { pace } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box);
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 8, 6);
  // outputDim 3: the embedding holds x, y, z triples, so count * 3 values.
  const umap = stage.own(await createUMAP(v.count, v.dim, 3, v.data, { seed: 1 }));
  if (stage.disposed) return stage.dispose;

  const xy = new Float32Array(v.count * 2);
  let angle = 0;
  pace(stage, async () => {
    if (umap.epoch < 250) await umap.step(3);
    if (stage.disposed) return;
    const e = umap.embedding;
    angle += 0.012;
    const c = Math.cos(angle), s = Math.sin(angle);
    let cx = 0, cy = 0, cz = 0;
    for (let i = 0; i < v.count; i++) (cx += e[i * 3]!), (cy += e[i * 3 + 1]!), (cz += e[i * 3 + 2]!);
    cx /= v.count; cy /= v.count; cz /= v.count;
    for (let i = 0; i < v.count; i++) {
      const x = e[i * 3]! - cx, y = e[i * 3 + 1]! - cy, z = e[i * 3 + 2]! - cz;
      xy[i * 2] = x * c + z * s; // rotate about the vertical axis, drop depth
      xy[i * 2 + 1] = y;
    }
    plot.draw(xy, v.label, { ease: 0.1 });
    status.textContent = `outputDim ${umap.outputDim}   epoch ${umap.epoch}`;
  });
  return stage.dispose;
};

export default mount;
