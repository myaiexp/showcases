// Two subplots of different widths, set by xaxis.domain; a slider moves the split
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const split = (s: number): Record<string, number[]> => ({ 'xaxis.domain': [0, s], 'xaxis2.domain': [Math.min(1, s + 0.1), 1] });

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [4, 5, 6], type: 'scatter' },
      { x: [20, 30, 40], y: [50, 60, 70], xaxis: 'x2', yaxis: 'y2', type: 'scatter' },
    ],
    { template: stage.template, showlegend: false, xaxis: { domain: [0, 0.7] }, yaxis2: { anchor: 'x2' }, xaxis2: { domain: [0.8, 1] } },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'xaxis.domain end', [0.2, 0.9, 0.02], 0.7, (s) => void relayout(stage.div, split(s)));
  else stage.every(100, (i) => void relayout(stage.div, split(0.55 + 0.25 * Math.sin(i / 8))));
  return () => stage.dispose();
};

export default mount;
