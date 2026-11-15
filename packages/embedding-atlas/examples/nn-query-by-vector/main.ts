// queryByVector with a moving query point that is not in the data
import { createNNDescent } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { readout, slider } from '../../shared/controls.ts';
import { highlight, planar } from '../../shared/algo-nn.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the plot', height: 420, maxWidth: 560 });
  const plot = createScatter(stage.view, stage.width, stage.height);
  const status = readout(stage.box);
  const v = planar(stage.preview ? 700 : 2000);
  const nn = stage.own(await createNNDescent(v.count, v.dim, v.data, { seed: 1 }));
  if (stage.disposed) return stage.dispose;
  plot.draw(v.data, v.label);

  let k = 12;
  let q: [number, number] = [0, 0];
  const show = (): void => {
    // The query is any Float32Array of inputDim values.
    const { indices, distances } = nn.queryByVector(new Float32Array(q), k);
    plot.draw(v.data, v.label, { alpha: 0.35, size: 1.4, keepFit: true });
    highlight(plot, v, q, indices);
    status.textContent = `query (${q[0].toFixed(1)}, ${q[1].toFixed(1)})   nearest ${distances[0]!.toFixed(2)}   ${k}th ${distances[k - 1]!.toFixed(2)}`;
  };
  if (stage.bar) {
    slider(stage.bar, 'k', 1, 30, 1, k, (x) => ((k = x), show()));
    plot.canvas.addEventListener('pointermove', (e) => {
      const r = plot.canvas.getBoundingClientRect();
      q = plot.toData(e.clientX - r.left, e.clientY - r.top);
      show();
    });
    show();
  } else {
    stage.loop((_dt, t) => {
      q = [Math.cos(t * 0.7) * 6, Math.sin(t * 1.1) * 5];
      show();
    });
  }
  return stage.dispose;
};

export default mount;
