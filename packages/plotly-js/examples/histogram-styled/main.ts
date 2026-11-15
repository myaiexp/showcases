// A styled histogram: explicit xbins, outlined translucent bars, axis titles
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(31);
  const k = Array.from({ length: 499 }, () => rand());

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: k.map((v) => v * 5),
        y: k,
        name: 'control',
        autobinx: false,
        histnorm: '',
        marker: { color: 'rgba(255, 100, 102, 0.7)', line: { color: 'rgba(255, 100, 102, 1)', width: 1 } },
        opacity: 0.5,
        type: 'histogram',
        xbins: { end: 2.8, size: 0.06, start: 0.5 },
      },
      {
        x: k.map((v) => v * 10),
        y: k.map((v) => v * 2),
        autobinx: false,
        marker: { color: 'rgba(100, 200, 102, 0.7)', line: { color: 'rgba(100, 200, 102, 1)', width: 1 } },
        name: 'experimental',
        opacity: 0.75,
        type: 'histogram',
        xbins: { end: 4, size: 0.06, start: -3.2 },
      },
    ],
    {
      template: stage.template,
      bargap: 0.05,
      bargroupgap: 0.2,
      barmode: 'overlay',
      title: { text: stage.preview ? '' : 'Sampled Results' },
      xaxis: { title: { text: 'Value' } },
      yaxis: { title: { text: 'Count' } },
    },
    stage.config,
  );

  const size = (s: number): void => void Plotly.restyle(stage.div, { 'xbins.size': s });
  if (stage.bar) slider(stage.bar, 'xbins.size', [0.02, 0.5, 0.01], 0.06, size);
  else stage.every(200, (i) => size(0.06 + 0.1 * (1 + Math.sin(i / 7))));

  return () => stage.dispose();
};

export default mount;
