// createNNDescent seed: the same seed rebuilds the same neighbour lists
import { createNNDescent } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { overlap, recallBoard, sweep } from '../../shared/algo-nn.ts';
import { clusteredVectors } from '../../shared/vectors.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, maxWidth: 640 });
  const board = recallBoard(stage, 'share of neighbours matching a seed 1 build');
  const v = clusteredVectors(stage.preview ? 600 : 2000, 24, 12, 2, 2.2);
  const k = 10;
  const lists = async (seed: number): Promise<number[][]> => {
    const nn = await createNNDescent(v.count, v.dim, v.data, { seed, treeInit: false, nIters: 1 });
    const out = Array.from({ length: 200 }, (_, i) => Array.from(nn.queryByIndex(i, k + 1).indices));
    nn.destroy();
    return out;
  };
  const rerun = sweep(stage, board, ['seed 1', 'seed 1 again', 'seed 2', 'seed 3'], async (label) => {
    const [base, other] = await Promise.all([lists(1), lists(label === 'seed 1' ? 1 : label === 'seed 1 again' ? 1 : label === 'seed 2' ? 2 : 3)]);
    const same = base.reduce((s, row, i) => s + overlap(other[i]!, row), 0) / base.length;
    return { value: same, note: `${(same * 100).toFixed(1)}%` };
  });
  if (stage.bar) button(stage.bar, 'Run again', rerun);
  return stage.dispose;
};

export default mount;
