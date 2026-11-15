// Styling a waterfall: increasing, decreasing and totals each get their own colour
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'waterfall',
        x: [
          ['2016', '2017', '2017', '2017', '2017', '2018', '2018', '2018', '2018'],
          ['initial', 'q1', 'q2', 'q3', 'total', 'q1', 'q2', 'q3', 'total'],
        ],
        measure: ['absolute', 'relative', 'relative', 'relative', 'total', 'relative', 'relative', 'relative', 'total'],
        y: [10, 20, 30, -10, null, 10, 20, -40, null],
        base: 300,
        decreasing: { marker: { color: 'Maroon', line: { color: 'red', width: 2 } } },
        increasing: { marker: { color: 'Teal' } },
        totals: { marker: { color: 'deepskyblue', line: { color: 'blue', width: 3 } } },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Profit and loss statement' },
      waterfallgap: 0.3,
      xaxis: { title: { text: '' }, tickfont: { size: stage.preview ? 9 : 15 }, ticks: 'outside' },
    },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'waterfallgap', [0, 0.9, 0.05], 0.3, (v) => void Plotly.relayout(stage.div, { waterfallgap: v }));
  else stage.every(160, (i) => void Plotly.relayout(stage.div, { waterfallgap: 0.4 + 0.35 * Math.sin(i / 7) }));

  return () => stage.dispose();
};

export default mount;
