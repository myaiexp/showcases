// createNNDescent metric euclidean vs cosine: distance or direction
import { createNNDescent } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { highlight, planar } from '../../shared/algo-nn.ts';
import { panels } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click either plot to pick a point', height: 380 });
  const ps = panels(stage, ['metric: euclidean', 'metric: cosine']);
  const status = readout(stage.box);
  const v = planar(stage.preview ? 700 : 2000);
  const [a, b] = await Promise.all([
    createNNDescent(v.count, v.dim, v.data, { metric: 'euclidean', seed: 1 }),
    createNNDescent(v.count, v.dim, v.data, { metric: 'cosine', seed: 1 }),
  ]);
  stage.own(a);
  stage.own(b);
  if (stage.disposed) return stage.dispose;

  let point = 5;
  const show = (): void => {
    const c: [number, number] = [v.data[point * 2]!, v.data[point * 2 + 1]!];
    ps.forEach((p, n) => {
      p.plot.draw(v.data, v.label, { alpha: 0.3, size: 1.3 });
      const found = (n === 0 ? a : b).queryByIndex(point, 31);
      highlight(p.plot, v, c, found.indices);
    });
    status.textContent = `point ${point}: cosine neighbours share a direction from the origin, euclidean ones share a place`;
  };
  show();
  if (stage.bar) {
    for (const p of ps) {
      p.plot.canvas.addEventListener('pointerdown', (e) => {
        const r = p.plot.canvas.getBoundingClientRect();
        const [x, y] = p.plot.toData(e.clientX - r.left, e.clientY - r.top);
        let best = 0, bd = Infinity;
        for (let i = 0; i < v.count; i++) {
          const d = (v.data[i * 2]! - x) ** 2 + (v.data[i * 2 + 1]! - y) ** 2;
          if (d < bd) (bd = d), (best = i);
        }
        point = best;
        show();
      });
    }
  } else stage.every(1100, () => ((point = (point * 7 + 131) % v.count), show()));
  return stage.dispose;
};

export default mount;
