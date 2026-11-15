// A scattercarpet trace placed by a and b values on a carpet, as a straight or splined line
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  // The docs scale a by 1e-6 and b by 1e6, to show that the carpet's axes follow the data's own units.
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        a: [4, 4, 4, 4.5, 4.5, 4.5, 5, 5, 5, 6, 6, 6].map((v) => v * 1e-6),
        b: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((v) => v * 1e6),
        y: [2, 3.5, 4, 3, 4.5, 5, 5.5, 6.5, 7.5, 8, 8.5, 10],
        aaxis: { tickprefix: 'a = ', ticksuffix: 'm', smoothing: 1, minorgridcount: 9 },
        baxis: { tickprefix: 'b = ', ticksuffix: 'Pa', smoothing: 1, minorgridcount: 9 },
      },
      {
        type: 'scattercarpet',
        a: [4, 4.5, 5, 6].map((v) => v * 1e-6),
        b: [1.5, 2.5, 1.5, 2.5].map((v) => v * 1e6),
        line: { shape: 'spline', smoothing: 1 },
        marker: { size: 10 },
      },
    ],
    { template: stage.template, showlegend: false },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'line.shape', ['spline', 'linear'] as const, 'spline', (v) => void restyle(stage.div, { 'line.shape': v }, [1]));
    slider(stage.bar, 'line.smoothing', [0, 1.3, 0.1], 1, (v) => void restyle(stage.div, { 'line.smoothing': v }, [1]));
  } else {
    stage.every(120, (i) => void restyle(stage.div, { 'line.smoothing': 0.65 + 0.65 * Math.sin(i / 7) }, [1]));
  }

  return () => stage.dispose();
};

export default mount;
