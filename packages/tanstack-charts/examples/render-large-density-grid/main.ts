// Aggregate before drawing: 20,000 rows become grid cells whose counts add back to 20,000
import { scaleLinear as d3Linear } from 'd3-scale';
import { defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cloud } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const source = cloud(20000, 41);
const [x0, x1] = [Math.min(...source.map((p) => p.x)), Math.max(...source.map((p) => p.x))];
const [y0, y1] = [Math.min(...source.map((p) => p.y)), Math.max(...source.map((p) => p.y))];

interface Cell {
  id: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  count: number;
}

// Every row lands in exactly one cell; cells with no rows are not emitted.
function grid(nx: number, ny: number): Cell[] {
  const counts = new Map<number, number>();
  const wx = (x1 - x0) / nx;
  const wy = (y1 - y0) / ny;
  for (const p of source) {
    const i = Math.min(nx - 1, Math.floor((p.x - x0) / wx));
    const j = Math.min(ny - 1, Math.floor((p.y - y0) / wy));
    counts.set(j * nx + i, (counts.get(j * nx + i) ?? 0) + 1);
  }
  return [...counts].map(([k, count]) => {
    const i = k % nx;
    const j = Math.floor(k / nx);
    return { id: `c${k}`, x1: x0 + i * wx, x2: x0 + (i + 1) * wx, y1: y0 + j * wy, y2: y0 + (j + 1) * wy, count };
  });
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'More cells show more detail. The readout counts source rows against what the cells account for.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  const options = (n: number) => {
    const cells = grid(n, Math.round(n * 0.6));
    const total = cells.reduce((s, c) => s + c.count, 0);
    const text = `source ${source.length} rows, represented ${total}, prepared ${cells.length} cells`;
    if (readout) readout.textContent = text;
    else stage.say(text);
    return {
      definition: defineChart({
        marks: [rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'count', inset: 0.4, key: 'id' })],
        scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, grid: false } },
        color: { scale: d3Linear, range: ['#1e293b', '#38bdf8', '#fde047'] },
        tooltip,
      }),
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Density of 20,000 points',
    };
  };
  const host = stage.own(mountChart(stage.box, options(30)));
  if (stage.bar) slider(stage.bar, 'grid columns', 8, 80, 2, 30, (v) => host.update(options(v)));
  else {
    stage.cycle([12, 30, 60], 1800, (v) => host.update(options(v)));
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
