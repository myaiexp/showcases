// A carpet's a and b axes with prefixes, suffixes, curve smoothing and minor gridlines
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        a: [4, 4, 4, 4.5, 4.5, 4.5, 5, 5, 5, 6, 6, 6],
        b: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
        y: [2, 3.5, 4, 3, 4.5, 5, 5.5, 6.5, 7.5, 8, 8.5, 10],
        aaxis: { tickprefix: 'a = ', ticksuffix: 'm', smoothing: 1, minorgridcount: 9 },
        baxis: { tickprefix: 'b = ', ticksuffix: 'Pa', smoothing: 1, minorgridcount: 9 },
      },
    ],
    { template: stage.template },
    stage.config,
  );

  // smoothing 0 joins the data points with straight segments; 1.3 is the maximum curve.
  const smooth = (v: number): void => void restyle(stage.div, { 'aaxis.smoothing': v, 'baxis.smoothing': v });
  if (stage.bar) {
    slider(stage.bar, 'smoothing', [0, 1.3, 0.1], 1, smooth);
    slider(stage.bar, 'minorgridcount', [0, 12, 1], 9, (v) => void restyle(stage.div, { 'aaxis.minorgridcount': v, 'baxis.minorgridcount': v }));
  } else stage.every(120, (i) => smooth(0.65 + 0.65 * Math.sin(i / 8)));

  return () => stage.dispose();
};

export default mount;
