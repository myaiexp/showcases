// createNNDescent nNeighbors 3, 15 and 60: neighbours kept per point
import { createNNDescent } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createScatter } from '../../shared/canvas2d.ts';
import { readout } from '../../shared/controls.ts';
import { highlight, planar } from '../../shared/algo-nn.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, maxWidth: 560 });
  const status = readout(stage.box);
  const v = planar(stage.preview ? 700 : 2000);
  let point = 3;
  stage.variants('nNeighbors', ['3', '15', '60'], async (n, host) => {
    const plot = createScatter(host, stage.width, stage.height);
    const nn = await createNNDescent(v.count, v.dim, v.data, { nNeighbors: Number(n), seed: 1 });
    const k = Number(n);
    const show = (): void => {
      const found = nn.queryByIndex(point, k + 1);
      plot.draw(v.data, v.label, { alpha: 0.3, size: 1.3, keepFit: false });
      highlight(plot, v, [v.data[point * 2]!, v.data[point * 2 + 1]!], found.indices);
      status.textContent = `nNeighbors ${n}: queryByIndex(${point}, ${k + 1}) returned ${found.indices.length} rows`;
    };
    show();
    const id = window.setInterval(() => ((point = (point * 7 + 131) % v.count), show()), 900);
    return {
      destroy() {
        clearInterval(id);
        nn.destroy();
      },
    };
  }, 5000);
  return stage.dispose;
};

export default mount;
