// Two waterfall traces over a two-level category axis, with a shifted base
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const x = [
  ['2016', '2017', '2017', '2017', '2017', '2018', '2018', '2018', '2018'],
  ['initial', 'q1', 'q2', 'q3', 'total', 'q1', 'q2', 'q3', 'total'],
];
const measure = ['absolute', 'relative', 'relative', 'relative', 'total', 'relative', 'relative', 'relative', 'total'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'waterfall', x, measure, y: [1, 2, 3, -1, null, 1, 2, -4, null], base: 1000 },
      { type: 'waterfall', x, measure, y: [1.1, 2.2, 3.3, -1.1, null, 1.1, 2.2, -4.4, null], base: 1000 },
    ],
    {
      template: stage.template,
      waterfallgroupgap: 0.5,
      xaxis: { title: { text: stage.preview ? '' : 'MULTI-CATEGORY' }, tickfont: { size: stage.preview ? 9 : 16 }, ticks: 'outside' },
    },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'waterfallmode', ['group', 'overlay'] as const, 'group', (v) => void Plotly.relayout(stage.div, { waterfallmode: v }));
    slider(stage.bar, 'waterfallgroupgap', [0, 1, 0.05], 0.5, (v) => void Plotly.relayout(stage.div, { waterfallgroupgap: v }));
  } else {
    stage.every(160, (i) => void Plotly.relayout(stage.div, { waterfallgroupgap: 0.5 + 0.4 * Math.sin(i / 7) }));
  }

  return () => stage.dispose();
};

export default mount;
