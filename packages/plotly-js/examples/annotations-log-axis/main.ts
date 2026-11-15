// An annotation on a log axis takes its position as log10(value)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [{ x: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06'], y: [1, 30, 70, 100, 1000, 10000000], mode: 'lines+markers', type: 'scatter' }],
    {
      template: stage.template,
      yaxis: { type: 'log' },
      annotations: [{ x: '2024-01-05', y: Math.log10(1000), text: 'Log axis annotation', showarrow: true, xanchor: 'right' }],
    },
    stage.config,
  );
  // The slider is the exponent: y is written as the log10 value, 10^e on the axis.
  const at = (e: number): Promise<void> => relayout(stage.div, { 'annotations[0].y': e, 'annotations[0].text': `Log axis annotation (y = ${e.toFixed(1)}, value ${(10 ** e).toPrecision(3)})` });
  if (stage.bar) slider(stage.bar, 'annotation y as log10', [0, 7, 0.1], 3, (v) => void at(v));
  if (stage.preview) stage.every(100, (i) => void at(3.5 + Math.sin(i / 10) * 3));
  return () => stage.dispose();
};

export default mount;
