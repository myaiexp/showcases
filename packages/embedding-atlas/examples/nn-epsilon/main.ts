// createNNDescent epsilon 0 to 1: queryByVector accuracy vs speed
import { createNNDescent } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { recallBoard, recallByVector, sweep } from '../../shared/algo-nn.ts';
import { clusteredVectors } from '../../shared/vectors.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, maxWidth: 640 });
  const board = recallBoard(stage, 'epsilon: recall of queryByVector vs brute force, and query time');
  const v = clusteredVectors(stage.preview ? 800 : 3000, 24, 12, 2, 1.8);
  const k = 10;
  const rerun = sweep(stage, board, ['0', '0.05', '0.1', '0.3', '1'], async (label) => {
    const nn = await createNNDescent(v.count, v.dim, v.data, { seed: 1, epsilon: Number(label) });
    let micro = 0;
    // Only the queries are timed: epsilon changes the search, not the build.
    const recall = recallByVector(v, k, (q) => {
      const t0 = performance.now();
      const r = nn.queryByVector(q, k).indices;
      micro += performance.now() - t0;
      return r;
    }, 60);
    nn.destroy();
    return { value: recall, note: `${(recall * 100).toFixed(1)}%   ${((micro / 60) * 1000).toFixed(0)} µs / query` };
  });
  if (stage.bar) button(stage.bar, 'Run again', rerun);
  return stage.dispose;
};

export default mount;
