// createNNDescent queryByIndex: a point's nearest neighbours in turn
import { createNNDescent } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { readout, slider } from '../../shared/controls.ts';
import { highlight, planar } from '../../shared/algo-nn.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a point to see its neighbours', height: 420, maxWidth: 560 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box);
  const v = planar(stage.preview ? 700 : 2000);
  const nn = stage.own(await createNNDescent(v.count, v.dim, v.data, { nNeighbors: 30, seed: 1 }));
  if (stage.disposed) return stage.dispose;

  let k = 10;
  let point = 0;
  const show = (): void => {
    // queryByIndex returns the point itself first, then its neighbours nearest first.
    const { indices, distances } = nn.queryByIndex(point, k + 1);
    plot.draw(v.data, v.label, { alpha: 0.35, size: 1.4 });
    highlight(plot, v, [v.data[point * 2]!, v.data[point * 2 + 1]!], indices);
    status.textContent = `point ${point}   ${k} neighbours   farthest at distance ${distances[distances.length - 1]!.toFixed(2)}`;
  };
  show();
  if (stage.bar) {
    slider(stage.bar, 'k', 1, 25, 1, k, (x) => ((k = x), show()));
    plot.canvas.addEventListener('pointerdown', (e) => {
      const r = plot.canvas.getBoundingClientRect();
      const [x, y] = plot.toData(e.clientX - r.left, e.clientY - r.top);
      let best = 0, bd = Infinity;
      for (let i = 0; i < v.count; i++) {
        const d = (v.data[i * 2]! - x) ** 2 + (v.data[i * 2 + 1]! - y) ** 2;
        if (d < bd) (bd = d), (best = i);
      }
      point = best;
      show();
    });
  } else {
    stage.every(900, () => ((point = (point * 7 + 131) % v.count), show()));
  }
  return stage.dispose;
};

export default mount;
