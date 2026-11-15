// rect shapes: x0, y0, x1, y1 on the axes, with line and fillcolor
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [1.5, 4.5], y: [0.75, 0.75], text: ['Unfilled Rectangle', 'Filled Rectangle'], mode: 'text', textfont: { size: stage.preview ? 8 : 12 } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Rectangle Positioned Relative to the Axes' },
      xaxis: { range: [0, 7], showgrid: false },
      yaxis: { range: [0, 3.5] },
      shapes: [
        { type: 'rect', x0: 1, y0: 1, x1: 2, y1: 3, line: { color: 'rgba(200, 120, 220, 1)' } },
        { type: 'rect', x0: 3, y0: 1, x1: 6, y1: 2, line: { color: 'rgba(200, 120, 220, 1)', width: 2 }, fillcolor: 'rgba(160, 60, 180, 0.7)' },
      ],
    },
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'filled x1', [3.5, 7, 0.1], 6, (v) => void relayout(stage.div, { 'shapes[1].x1': v }));
    slider(stage.bar, 'filled y1', [1.2, 3.5, 0.1], 2, (v) => void relayout(stage.div, { 'shapes[1].y1': v }));
    slider(stage.bar, 'line width', [0, 10, 1], 2, (v) => void relayout(stage.div, { 'shapes[1].line.width': v }));
  }
  if (stage.preview) stage.every(100, (i) => void relayout(stage.div, { 'shapes[1].x1': 5 + Math.sin(i / 7), 'shapes[1].y1': 2.2 + Math.cos(i / 9) * 0.7 }));
  return () => stage.dispose();
};

export default mount;
