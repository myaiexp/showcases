// circle shapes: the x0, y0, x1, y1 box in data coordinates
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [1.5, 3.5], y: [0.75, 2.5], text: ['Unfilled Circle', 'Filled Circle'], mode: 'text' }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Circles' },
      xaxis: { range: [0, 4.5], zeroline: false },
      yaxis: { range: [0, 4.5], scaleanchor: 'x' },
      shapes: [
        { type: 'circle', xref: 'x', yref: 'y', x0: 1, y0: 1, x1: 3, y1: 3, line: { color: 'rgba(50, 171, 96, 1)' } },
        { type: 'circle', xref: 'x', yref: 'y', fillcolor: 'rgba(50, 171, 96, 0.7)', x0: 3, y0: 3, x1: 4, y1: 4, line: { color: 'rgba(50, 171, 96, 1)' } },
      ],
    },
    stage.config,
  );
  const size = (s: number): Promise<void> => relayout(stage.div, { 'shapes[1].x0': 4 - s, 'shapes[1].y0': 4 - s });
  if (stage.bar) slider(stage.bar, 'filled circle diameter', [0.2, 3, 0.1], 1, (v) => void size(v));
  if (stage.preview) stage.every(100, (i) => void size(1.2 + Math.sin(i / 6)));
  return () => stage.dispose();
};

export default mount;
