// A noisy 30-dimension loop laid out by createUMAP, until noise tears it
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ringVectors } from '../../shared/vectors.ts';
import { follow } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 520 });
  stage.variants('noise', ['0.02', '0.15', '0.4'], async (noise, host) => {
    const v = ringVectors(stage.preview ? 500 : 1000, 30, 5, Number(noise));
    const umap = await createUMAP(v.count, v.dim, 2, v.data, { initializeMethod: 'random', seed: 1 });
    return follow(stage, host, umap, v.label, `ring noise: ${noise}`, { epochs: 250 });
  }, 5000);
  return stage.dispose;
};

export default mount;
