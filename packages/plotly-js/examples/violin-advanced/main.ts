// Advanced violins: horizontal, split by sex per day, scaled by count, with points
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const DAYS = ['Thur', 'Fri', 'Sat', 'Sun'];
// pointpos differs per trace in the docs so the points clear the neighbouring halves
const POS: Record<string, number[]> = { Female: [1, 0.4, 0.55, 0.45], Male: [-0.6, -0.3, -1.1, -0.9] };
const COLOR: Record<string, string> = { Female: '#bebada', Male: '#8dd3c7' };

const mount: Mount = async (el, ctx) => {
  const rows = await csv('violin_data.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 640 });

  // The docs inline the bills of each day and sex; here they are read from the same dataset.
  const traces = DAYS.flatMap((day, d) =>
    (['Female', 'Male'] as const).map((sex) => {
      const mine = rows.filter((r) => r.day === day && r.sex === sex);
      return {
        type: 'violin' as const,
        x: unpackNum(mine, 'total_bill'),
        y0: day,
        orientation: 'h' as const,
        name: sex === 'Female' ? 'F' : 'M',
        legendgroup: sex,
        scalegroup: sex,
        scalemode: 'count' as const,
        side: sex === 'Female' ? ('positive' as const) : ('negative' as const),
        text: `sample length: ${mine.length}`,
        hoveron: 'points+kde' as const,
        points: 'all' as const,
        pointpos: POS[sex]?.[d],
        jitter: 0,
        spanmode: 'manual' as const,
        span: [0, 60] as [number, number],
        box: { visible: true },
        meanline: { visible: true },
        marker: { line: { width: 2, color: COLOR[sex] }, symbol: 'line-ns' },
        line: { color: COLOR[sex] },
        showlegend: d === 2,
      };
    }),
  );

  await Plotly.newPlot(
    stage.div,
    traces,
    {
      template: stage.template,
      hovermode: 'closest',
      title: { text: stage.preview ? '' : 'Total bill distribution<br><i>scaled by number of bills per gender' },
      legend: { tracegroupgap: 0 },
      violingap: 0,
      violingroupgap: 0,
      violinmode: 'overlay',
      yaxis: { showgrid: true },
    },
    stage.config,
  );

  const set = (v: 'count' | 'width'): void => void Plotly.restyle(stage.div, { scalemode: v });
  if (stage.bar) select(stage.bar, 'scalemode', ['count', 'width'] as const, 'count', set);
  else stage.every(1500, (i) => set(i % 2 ? 'width' : 'count'));

  return () => stage.dispose();
};

export default mount;
