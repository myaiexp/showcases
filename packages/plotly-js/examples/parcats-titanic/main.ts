// Titanic passengers by class, gender and outcome, coloured by survival, freeform
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('titanic.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });
  const survived = unpack(rows, 'Survived');

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'parcats',
        dimensions: [
          { values: unpack(rows, 'Pclass'), categoryorder: 'category ascending', label: 'Class' },
          { values: unpack(rows, 'Sex'), label: 'Gender' },
          // categoryarray fixes the order; ticktext relabels 0 and 1
          { values: survived, label: 'Outcome', categoryarray: ['0', '1'], ticktext: ['perished', 'survived'] },
        ],
        line: { color: unpackNum(rows, 'Survived'), colorscale: [[0, 'lightsteelblue'], [1, 'mediumseagreen']] },
        hoveron: 'color',
        hoverinfo: 'count+probability',
        labelfont: { size: 14 },
        arrangement: 'freeform',
      },
    ],
    { template: stage.template },
    stage.config,
  );

  const hoveron = (v: 'category' | 'color' | 'dimension'): void => void Plotly.restyle(stage.div, { hoveron: v });
  if (stage.bar) select(stage.bar, 'hoveron', ['color', 'category', 'dimension'] as const, 'color', hoveron);
  else {
    // Cards: reorder the dimensions to show the paths regroup.
    const orders = [[0, 1, 2], [1, 0, 2], [1, 2, 0], [2, 1, 0], [0, 2, 1]];
    stage.every(1500, (i) => void Plotly.restyle(stage.div, { 'dimensions[0].displayindex': orders[i % 5]?.[0], 'dimensions[1].displayindex': orders[i % 5]?.[1], 'dimensions[2].displayindex': orders[i % 5]?.[2] }));
  }

  return () => stage.dispose();
};

export default mount;
