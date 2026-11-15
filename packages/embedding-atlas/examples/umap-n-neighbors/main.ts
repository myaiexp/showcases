// createUMAP with nNeighbors 5, 15 and 50: few neighbours fragment, many merge
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { follow } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  // Overlapping clusters, so the neighbourhood size changes what the graph connects.
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 8, 14, 2.2);
  stage.variants('nNeighbors', ['5', '15', '50'], async (n, host) => {
    const umap = await createUMAP(v.count, v.dim, 2, v.data, { nNeighbors: Number(n), seed: 1 });
    return follow(stage, host, umap, v.label, `nNeighbors: ${n}`, { epochs: 250 });
  }, 4500);
  return stage.dispose;
};

export default mount;
