// An inset plot: a second pair of axes whose domains sit inside the main plot
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const place = (x0: number, size: number): Record<string, number[]> => ({
  'xaxis2.domain': [x0, Math.min(1, x0 + size)],
  'yaxis2.domain': [0.95 - size, 0.95],
});

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [4, 3, 2], type: 'scatter', name: 'main' },
      { x: [20, 30, 40], y: [30, 40, 50], xaxis: 'x2', yaxis: 'y2', type: 'scatter', name: 'inset' },
    ],
    {
      template: stage.template,
      showlegend: !stage.preview,
      yaxis2: { domain: [0.6, 0.95], anchor: 'x2' },
      xaxis2: { domain: [0.6, 0.95], anchor: 'y2' },
    },
    stage.config,
  );

  if (stage.bar) {
    let [x0, size] = [0.6, 0.35];
    slider(stage.bar, 'inset left edge', [0.05, 0.85, 0.01], x0, (v) => { x0 = v; void relayout(stage.div, place(x0, size)); });
    slider(stage.bar, 'inset size', [0.1, 0.6, 0.01], size, (v) => { size = v; void relayout(stage.div, place(x0, size)); });
  } else {
    stage.every(100, (i) => void relayout(stage.div, place(0.5 + 0.1 * Math.sin(i / 8), 0.28 + 0.1 * Math.cos(i / 11))));
  }
  return () => stage.dispose();
};

export default mount;
