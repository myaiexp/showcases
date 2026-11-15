// A heatmap on category axes with a missing cell, hover skipping the gap with hoverongaps
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { Fx, type HoverPoint } from '../../shared/fx.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        z: [
          [1, null, 30, 50, 1],
          [20, 1, 60, 80, 30],
          [30, 60, 1, -10, 20],
        ],
        x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        y: ['Morning', 'Afternoon', 'Evening'],
        type: 'heatmap',
        hoverongaps: false,
      },
    ],
    { template: stage.template },
    stage.config,
  );

  // hoverongaps false: the hover label never appears over the null cell (Tuesday morning).
  if (stage.bar) toggle(stage.bar, 'hoverongaps', false, (v) => void restyle(stage.div, { hoverongaps: v }));
  else {
    const cells: HoverPoint[] = [
      { xval: 'Monday', yval: 'Morning' },
      { xval: 'Thursday', yval: 'Afternoon' },
      { xval: 'Wednesday', yval: 'Evening' },
      { xval: 'Friday', yval: 'Morning' },
    ];
    stage.every(1100, (i) => Fx.hover(stage.div, cells[i % cells.length] as HoverPoint));
  }

  return () => stage.dispose();
};

export default mount;
