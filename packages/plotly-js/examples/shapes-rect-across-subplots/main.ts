// xref: ['x', 'x2'] and yref: ['y', 'y2']: x0/y0 on one subplot, x1/y1 on the other
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [4, 5, 6], mode: 'markers', marker: { size: 10 }, xaxis: 'x', yaxis: 'y' },
      { x: [1, 2, 3], y: [6, 5, 4], mode: 'markers', marker: { size: 10 }, xaxis: 'x2', yaxis: 'y2' },
    ],
    {
      template: stage.template,
      grid: { rows: 1, columns: 2, pattern: 'independent' },
      shapes: [{ type: 'rect', xref: ['x', 'x2'], yref: ['y', 'y2'], x0: 2, y0: 4.5, x1: 3, y1: 5.5, fillcolor: 'rgba(255, 0, 0, 0.2)', line: { color: '#f87171', width: 2 } }],
      showlegend: false,
    } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'x0 (subplot 1)', [1, 3, 0.1], 2, (v) => void relayout(stage.div, { 'shapes[0].x0': v }));
    slider(stage.bar, 'x1 (subplot 2)', [1, 3, 0.1], 3, (v) => void relayout(stage.div, { 'shapes[0].x1': v }));
  }
  if (stage.preview) stage.every(100, (i) => void relayout(stage.div, { 'shapes[0].x0': 2 + Math.sin(i / 9) * 0.8, 'shapes[0].x1': 2 + Math.cos(i / 11) * 0.8, 'shapes[0].y1': 5.5 + Math.sin(i / 7) * 0.4 }));
  return () => stage.dispose();
};

export default mount;
