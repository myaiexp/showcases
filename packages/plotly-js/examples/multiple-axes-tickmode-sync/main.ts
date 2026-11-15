// An overlaying y axis with its own ticks, or ticks synced to the first axis with tickmode 'sync'
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['auto', 'sync', 'linear', 'array'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const purple = 'rgb(148, 103, 189)';
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [40, 50, 60], name: 'yaxis data', type: 'scatter' },
      { x: [2, 3, 4], y: [4, 5, 6], name: 'yaxis2 data', yaxis: 'y2', type: 'scatter', line: { color: purple } },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Independent Ticks on an Overlaying Axis' },
      showlegend: !stage.preview,
      yaxis: { title: { text: 'yaxis title' } },
      yaxis2: {
        title: { text: 'yaxis2 title', font: { color: purple } },
        tickfont: { color: purple },
        overlaying: 'y',
        side: 'right',
        tickmode: 'auto',
        // Used only by the 'linear' and 'array' modes.
        tick0: 4,
        dtick: 0.25,
        tickvals: [4, 4.5, 5.5, 6],
      },
    },
    stage.config,
  );

  const mode = (m: string): void => void relayout(stage.div, { 'yaxis2.tickmode': m });
  if (stage.bar) select(stage.bar, 'yaxis2.tickmode', MODES, 'auto', mode);
  else stage.every(1500, (i) => mode(MODES[i % MODES.length]!));
  return () => stage.dispose();
};

export default mount;
