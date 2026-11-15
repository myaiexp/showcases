// histogram2d options: histnorm, explicit xbins and ybins, a five-stop colorscale
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const NORMS = ['probability', '', 'percent', 'density', 'probability density'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(17);

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: uniform(rand, 500),
        y: uniform(rand, 500, 1, 1),
        histnorm: 'probability',
        autobinx: false,
        xbins: { start: -3, end: 3, size: 0.1 },
        autobiny: false,
        ybins: { start: -2.5, end: 4, size: 0.1 },
        colorscale: [[0, 'rgb(12,51,131)'], [0.25, 'rgb(10,136,186)'], [0.5, 'rgb(242,211,56)'], [0.75, 'rgb(242,143,56)'], [1, 'rgb(217,30,30)']],
        type: 'histogram2d',
      },
    ],
    { template: stage.template },
    stage.config,
  );

  const size = (s: number): void => void Plotly.restyle(stage.div, { 'xbins.size': s, 'ybins.size': s });
  if (stage.bar) {
    select(stage.bar, 'histnorm', NORMS, 'probability', (v) => void Plotly.restyle(stage.div, { histnorm: v }));
    slider(stage.bar, 'bin size', [0.05, 0.5, 0.01], 0.1, size);
  } else {
    stage.every(250, (i) => size(0.1 + 0.08 * (1 + Math.sin(i / 6))));
  }

  return () => stage.dispose();
};

export default mount;
