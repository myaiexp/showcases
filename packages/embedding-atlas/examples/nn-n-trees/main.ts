// createNNDescent nTrees 1 to 16: more projection trees, better start
import { createNNDescent } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { recallBoard, recallByIndex, sweep } from '../../shared/algo-nn.ts';
import { clusteredVectors } from '../../shared/vectors.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, maxWidth: 640 });
  const board = recallBoard(stage, 'nTrees: recall of queryByIndex vs brute force, and build time');
  const v = clusteredVectors(stage.preview ? 600 : 2000, 24, 12, 2, 1.8);
  const k = 10;

  const rerun = sweep(stage, board, ['1', '2', '4', '8', '16'], async (label) => {
    const t0 = performance.now();
    const nn = await createNNDescent(v.count, v.dim, v.data, { seed: 1, nTrees: Number(label) });
    const ms = Math.round(performance.now() - t0);
    const recall = recallByIndex(v, k + 1, (i) => nn.queryByIndex(i, k + 1).indices);
    nn.destroy();
    return { value: recall, note: `${(recall * 100).toFixed(1)}%   ${ms} ms` };
  });
  if (stage.bar) button(stage.bar, 'Run again', rerun);
  return stage.dispose;
};

export default mount;
