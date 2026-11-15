// Asymmetric error bars: array above each point and arrayminus below it
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const up = [0.1, 0.2, 0.1, 0.1];
const down = [0.2, 0.4, 1, 0.2];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: [1, 2, 3, 4],
        y: [2, 1, 3, 4],
        // symmetric: false makes arrayminus (not array) the length below the point
        error_y: { type: 'data', symmetric: false, array: up, arrayminus: down },
        type: 'scatter',
      },
    ],
    { template: stage.template, yaxis: { range: [-1, 6] } },
    stage.config,
  );

  const scaleDown = (k: number): void =>
    void Plotly.restyle(stage.div, { 'error_y.arrayminus': [down.map((d) => d * k)] });
  if (stage.bar) slider(stage.bar, 'arrayminus scale', [0, 3, 0.1], 1, scaleDown);
  else stage.every(120, (i) => scaleDown(1.5 + 1.5 * Math.sin(i / 8)));

  return () => stage.dispose();
};

export default mount;
