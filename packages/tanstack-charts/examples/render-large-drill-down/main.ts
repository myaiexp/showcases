// Dense data: aggregate cells are the focus target; a click lists the original rows behind one
import { scaleLinear as d3Linear } from 'd3-scale';
import { defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { cloud } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const source = cloud(12000, 90);
const [x0, x1] = [Math.min(...source.map((p) => p.x)), Math.max(...source.map((p) => p.x))];
const [y0, y1] = [Math.min(...source.map((p) => p.y)), Math.max(...source.map((p) => p.y))];
const NX = 24;
const NY = 14;
const wx = (x1 - x0) / NX;
const wy = (y1 - y0) / NY;
const counts = new Map<number, number>();
for (const p of source) {
  const k = Math.min(NY - 1, Math.floor((p.y - y0) / wy)) * NX + Math.min(NX - 1, Math.floor((p.x - x0) / wx));
  counts.set(k, (counts.get(k) ?? 0) + 1);
}
const cells = [...counts].map(([k, count]) => ({ id: `c${k}`, x1: x0 + (k % NX) * wx, x2: x0 + ((k % NX) + 1) * wx, y1: y0 + Math.floor(k / NX) * wy, y2: y0 + (Math.floor(k / NX) + 1) * wy, count }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a cell: the readout lists the first rows inside it.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  if (readout) readout.textContent = 'no cell selected';

  const definition = defineChart({
    marks: [rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'count', inset: 0.4, key: 'id' })],
    scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, grid: false } },
    color: { scale: d3Linear, range: ['#1e293b', '#38bdf8', '#fde047'] },
    tooltip,
  });
  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Density cells over 12,000 rows',
      onSelect: (point) => {
        if (!readout) return;
        if (!point) {
          readout.textContent = 'no cell selected';
          return;
        }
        const c = point.datum;
        const inside = source.filter((p) => p.x >= c.x1 && p.x < c.x2 && p.y >= c.y1 && p.y < c.y2);
        readout.textContent = `cell holds ${c.count} rows (found ${inside.length})\n` + inside.slice(0, 6).map((p) => `${p.id}  x ${p.x.toFixed(1)}  y ${p.y.toFixed(1)}`).join('\n');
      },
    }),
  );
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
