// Stacked plots that share one x axis, each y axis given its own domain
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

/** Three equal bands from the bottom up, separated by `gap`. */
const bands = (gap: number): Record<string, number[]> => {
  const h = (1 - 2 * gap) / 3;
  return { 'yaxis.domain': [0, h], 'yaxis2.domain': [h + gap, 2 * h + gap], 'yaxis3.domain': [2 * h + 2 * gap, 1] };
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [0, 1, 2], y: [10, 11, 12], type: 'scatter', name: 'yaxis' },
      { x: [2, 3, 4], y: [100, 110, 120], yaxis: 'y2', type: 'scatter', name: 'yaxis2' },
      { x: [3, 4, 5], y: [1000, 1100, 1200], yaxis: 'y3', type: 'scatter', name: 'yaxis3' },
    ],
    {
      template: stage.template,
      showlegend: !stage.preview,
      yaxis: { domain: [0, 0.33] },
      legend: { traceorder: 'reversed' },
      yaxis2: { domain: [0.33, 0.66] },
      yaxis3: { domain: [0.66, 1] },
    },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'gap between domains', [0, 0.15, 0.01], 0, (g) => void relayout(stage.div, bands(g)));
  else stage.every(100, (i) => void relayout(stage.div, bands(0.07 * (1 + Math.sin(i / 7)))));
  return () => stage.dispose();
};

export default mount;
