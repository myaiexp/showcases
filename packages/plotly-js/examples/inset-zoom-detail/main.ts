// An inset showing a magnified slice of the main series, with a box marking the slice
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { gauss, rng } from '../../shared/stat-data.ts';
import { linspace } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const noise = gauss(rng(5));
  const x = linspace(0, 100, 400);
  const y = x.map((v) => Math.sin(v / 9) * 3 + Math.sin(v * 1.3) * 0.5 + noise() * 0.25);
  const WIDTH = 8;

  // The same data drawn twice: once on x/y, once on the inset's x2/y2.
  const view = (x0: number): Record<string, unknown> => {
    const lo = [...y].filter((_, i) => x[i]! >= x0 && x[i]! <= x0 + WIDTH);
    return {
      'xaxis2.range': [x0, x0 + WIDTH],
      'yaxis2.range': [Math.min(...lo) - 0.3, Math.max(...lo) + 0.3],
      'shapes[0].x0': x0,
      'shapes[0].x1': x0 + WIDTH,
    };
  };
  await Plotly.newPlot(
    stage.div,
    [
      { x, y, type: 'scatter', mode: 'lines', name: 'series', line: { width: 1.5 } },
      { x, y, type: 'scatter', mode: 'lines+markers', xaxis: 'x2', yaxis: 'y2', name: 'detail', marker: { size: 3 }, line: { color: '#f59e0b', width: 1.5 } },
    ],
    {
      template: stage.template,
      showlegend: false,
      xaxis: { domain: [0, 1] },
      xaxis2: { domain: [0.6, 0.97], anchor: 'y2', range: [30, 30 + WIDTH] },
      yaxis2: { domain: [0.58, 0.95], anchor: 'x2', range: [-4, 4] },
      shapes: [{ type: 'rect', xref: 'x', yref: 'paper', x0: 30, x1: 30 + WIDTH, y0: 0, y1: 1, line: { width: 0 }, fillcolor: 'rgba(245,158,11,0.15)' }],
    },
    stage.config,
  );
  void relayout(stage.div, view(30));

  if (stage.bar) slider(stage.bar, 'detail starts at x', [0, 92, 1], 30, (v) => void relayout(stage.div, view(v)));
  else stage.every(100, (i) => void relayout(stage.div, view(10 + 40 * (1 + Math.sin(i / 14)))));
  return () => stage.dispose();
};

export default mount;
