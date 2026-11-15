// Violins per day split by sex, side by side (violinmode group) or overlaid
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('violin_data.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  // One trace per sex: the docs filter their rows by sex, so each trace keeps only its own bills.
  const bySex = (sex: string, label: string, color: string) => {
    const mine = rows.filter((r) => r.sex === sex);
    return {
      type: 'violin' as const,
      x: unpack(mine, 'day'),
      y: unpackNum(mine, 'total_bill'),
      legendgroup: label,
      scalegroup: label,
      name: label,
      box: { visible: true },
      line: { color },
      meanline: { visible: true },
    };
  };

  await Plotly.newPlot(
    stage.div,
    [bySex('Male', 'M', '#60a5fa'), bySex('Female', 'F', '#f472b6')],
    { template: stage.template, title: { text: stage.preview ? '' : 'Grouped Violin Plot' }, yaxis: { zeroline: false }, violinmode: 'group', xaxis: { categoryarray: ['Thur', 'Fri', 'Sat', 'Sun'] } },
    stage.config,
  );

  const set = (m: 'group' | 'overlay'): void => void Plotly.relayout(stage.div, { violinmode: m });
  if (stage.bar) select(stage.bar, 'violinmode', ['group', 'overlay'] as const, 'group', set);
  else stage.every(1800, (i) => set(i % 2 ? 'overlay' : 'group'));

  return () => stage.dispose();
};

export default mount;
