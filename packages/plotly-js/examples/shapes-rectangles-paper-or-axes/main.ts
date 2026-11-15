// rect shapes with xref/yref 'x'/'y' against 'paper'
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [1.5, 3], y: [2.5, 2.5], text: ['Rectangle reference to the plot', 'Rectangle reference to the axes'], mode: 'text', textfont: { size: stage.preview ? 8 : 12 } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Rectangles Positioned Relative to the Plot and to the Axes' },
      xaxis: { range: [0, 4], showgrid: false },
      yaxis: { range: [0, 4] },
      shapes: [
        { type: 'rect', xref: 'x', yref: 'y', x0: 2.5, y0: 0, x1: 3.5, y1: 2, line: { color: 'rgb(55, 128, 191)', width: 3 }, fillcolor: 'rgba(55, 128, 191, 0.6)' },
        { type: 'rect', xref: 'paper', yref: 'paper', x0: 0.25, y0: 0, x1: 0.5, y1: 0.5, line: { color: 'rgb(50, 171, 96)', width: 3 }, fillcolor: 'rgba(50, 171, 96, 0.6)' },
      ],
    },
    stage.config,
  );
  const pan = (lo: number): Promise<void> => relayout(stage.div, { 'xaxis.range': [lo, lo + 4], 'yaxis.range': [lo * 0.5, lo * 0.5 + 4] });
  if (stage.bar) slider(stage.bar, 'pan the axes', [-2, 2, 0.1], 0, (v) => void pan(v));
  if (stage.preview) stage.every(100, (i) => void pan(Math.sin(i / 10) * 1.5));
  return () => stage.dispose();
};

export default mount;
