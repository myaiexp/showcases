// Asymmetric percent error bars: value above, valueminus below, both as % of y
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: [1, 2, 3, 4],
        y: [2, 1, 3, 4],
        error_y: { type: 'percent', symmetric: false, value: 15, valueminus: 25 },
        type: 'scatter',
      },
    ],
    { template: stage.template, yaxis: { range: [0, 6] } },
    stage.config,
  );

  const set = (key: 'value' | 'valueminus', v: number): void => void Plotly.restyle(stage.div, { [`error_y.${key}`]: v });
  if (stage.bar) {
    slider(stage.bar, 'value (up, %)', [0, 100, 1], 15, (v) => set('value', v));
    slider(stage.bar, 'valueminus (down, %)', [0, 100, 1], 25, (v) => set('valueminus', v));
  } else {
    stage.every(120, (i) => {
      set('value', 15 + 12 * Math.sin(i / 7));
      set('valueminus', 40 - 20 * Math.sin(i / 7));
    });
  }

  return () => stage.dispose();
};

export default mount;
