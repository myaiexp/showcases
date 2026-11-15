// Circle shapes sized from the min and max of each cluster's x and y values
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';
import { gauss, rng } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const normal = gauss(rng(12));
  const cluster = (mean: number, sd: number, n: number): number[] => Array.from({ length: n }, () => mean + sd * normal());
  const x0 = cluster(2, 0.45, 300);
  const y0 = cluster(2, 0.45, 300);
  const x1 = cluster(6, 0.4, 200);
  const y1 = cluster(6, 0.4, 200);
  const x2 = cluster(4, 0.3, 200);
  const y2 = cluster(4, 0.3, 200);
  const extent = (v: number[]): [number, number] => [Math.min(...v), Math.max(...v)];
  const circle = (xs: number[], ys: number[], color: string, pad = 0): Partial<Plotly.Shape> => {
    const [xa, xb] = extent(xs);
    const [ya, yb] = extent(ys);
    return { type: 'circle', xref: 'x', yref: 'y', x0: xa - pad, y0: ya - pad, x1: xb + pad, y1: yb + pad, opacity: 0.2, fillcolor: color, line: { color } };
  };
  const shapes = (pad: number): Partial<Plotly.Shape>[] => [
    circle(x0, y0, '#60a5fa', pad),
    circle(x1, y1, '#f59e0b', pad),
    circle(x2, y2, '#34d399', pad),
    circle(x1, y0, '#fb7185', pad),
  ];

  await Plotly.newPlot(
    stage.div,
    [
      { x: x0, y: y0, mode: 'markers', marker: { size: stage.preview ? 4 : 6 } },
      { x: x1, y: y1, mode: 'markers', marker: { size: stage.preview ? 4 : 6 } },
      { x: x2, y: y2, mode: 'markers', marker: { size: stage.preview ? 4 : 6 } },
      { x: x1, y: y0, mode: 'markers', marker: { size: stage.preview ? 4 : 6 } },
    ],
    { template: stage.template, shapes: shapes(0), showlegend: false, yaxis: { scaleanchor: 'x' } },
    stage.config,
  );
  const grow = (pad: number): Promise<void> => relayout(stage.div, { shapes: shapes(pad) });
  if (stage.bar) slider(stage.bar, 'padding around each cluster', [-0.5, 1.5, 0.1], 0, (v) => void grow(v));
  if (stage.preview) stage.every(100, (i) => void grow(Math.sin(i / 8) * 0.5));
  return () => stage.dispose();
};

export default mount;
