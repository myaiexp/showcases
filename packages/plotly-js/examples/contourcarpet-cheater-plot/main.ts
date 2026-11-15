// A carpet drawn from 1D a, b, x and y, a cheater plot, with smoothing and gridline controls
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  // 1D a, b, x and y list one carpet point each (twelve of them), a-fastest.
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        a: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
        b: [4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
        x: [2, 3, 4, 5, 2.2, 3.1, 4.1, 5.1, 1.5, 2.5, 3.5, 4.5],
        y: [1, 1.4, 1.6, 1.75, 2, 2.5, 2.7, 2.75, 3, 3.5, 3.7, 3.75],
        aaxis: { tickprefix: 'a = ', smoothing: 0, minorgridcount: 9, type: 'linear' },
        baxis: { tickprefix: 'b = ', smoothing: 0, minorgridcount: 9, type: 'linear' },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Cheater plot with 1d input' },
      margin: stage.preview ? undefined : { t: 40, r: 30, b: 30, l: 30 },
      yaxis: { range: [0.388, 4.361] },
      xaxis: { range: [0.667, 5.932] },
    },
    stage.config,
  );

  const smooth = (v: number): void => void restyle(stage.div, { 'aaxis.smoothing': v, 'baxis.smoothing': v });
  if (stage.bar) slider(stage.bar, 'smoothing', [0, 1.3, 0.1], 0, smooth);
  else stage.every(120, (i) => smooth(0.65 + 0.65 * Math.sin(i / 8)));

  return () => stage.dispose();
};

export default mount;
