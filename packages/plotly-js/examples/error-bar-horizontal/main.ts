// error_x: horizontal error bars as a percentage of x, adjustable
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4], y: [2, 1, 3, 4], error_x: { type: 'percent', value: 10 }, type: 'scatter' }],
    { template: stage.template, xaxis: { range: [0, 6] } },
    stage.config,
  );

  const setPercent = (v: number): void => void Plotly.restyle(stage.div, { 'error_x.value': v });
  if (stage.bar) slider(stage.bar, 'error_x.value (%)', [0, 50, 1], 10, setPercent);
  else stage.every(120, (i) => setPercent(5 + 45 * Math.abs(Math.sin(i / 14))));

  return () => stage.dispose();
};

export default mount;
