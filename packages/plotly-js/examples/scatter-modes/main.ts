// scatter trace mode: markers, lines, or lines+markers
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const modes = ['markers', 'lines', 'lines+markers'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const trace1: Data = { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'markers', type: 'scatter' };
  const trace2: Data = { x: [2, 3, 4, 5], y: [16, 5, 11, 9], mode: 'lines', type: 'scatter' };
  const trace3: Data = { x: [1, 2, 3, 4], y: [12, 9, 15, 12], mode: 'lines+markers', type: 'scatter' };

  await Plotly.newPlot(stage.div, [trace1, trace2, trace3], { template: stage.template }, stage.config);

  // Every trace shares one mode string; restyle with an array would set one per trace.
  if (stage.bar) {
    select(stage.bar, 'All traces', ['as drawn', ...modes], 'as drawn', (m) => {
      if (m === 'as drawn') void restyle(stage.div, { mode: ['markers', 'lines', 'lines+markers'] });
      else void restyle(stage.div, { mode: m });
    });
  }
  // The card rotates the three traces through the three modes.
  if (stage.preview) stage.every(1400, (i) => {
    void restyle(stage.div, { mode: [pick(modes, i), pick(modes, i + 1), pick(modes, i + 2)] });
  });

  return () => stage.dispose();
};

export default mount;
