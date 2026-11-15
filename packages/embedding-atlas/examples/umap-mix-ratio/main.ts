// createUMAP with mixRatio 0, 0.5 and 1 on overlapping clusters
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { follow } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  const v = clusteredVectors(stage.preview ? 700 : 2000, 40, 8, 23, 2.2);
  stage.variants('mixRatio', ['0', '0.5', '1'], async (n, host) => {
    const umap = await createUMAP(v.count, v.dim, 2, v.data, { mixRatio: Number(n), seed: 1 });
    return follow(stage, host, umap, v.label, `mixRatio: ${n}`, { epochs: 250 });
  }, 4500);
  return stage.dispose;
};

export default mount;
