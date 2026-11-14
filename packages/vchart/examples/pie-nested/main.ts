// Nested pies: two pie series in a common chart, an inner one for groups and an outer ring for members
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { jitterer } from '../../shared/polar-data.ts';

// Population by age, in millions: three groups, each split into its age bands.
const AGES = [
  { group: 'Under 25', type: '0-9', value: 40 },
  { group: 'Under 25', type: '10-19', value: 42 },
  { group: 'Under 25', type: '20-24', value: 22 },
  { group: '25 to 64', type: '25-34', value: 46 },
  { group: '25 to 64', type: '35-44', value: 42 },
  { group: '25 to 64', type: '45-54', value: 40 },
  { group: '25 to 64', type: '55-64', value: 42 },
  { group: '65 and over', type: '65-74', value: 33 },
  { group: '65 and over', type: '75+', value: 22 },
];

const groups = (rows: typeof AGES): { type: string; value: number }[] => {
  const totals = new Map<string, number>();
  for (const d of rows) totals.set(d.group, (totals.get(d.group) ?? 0) + d.value);
  return [...totals].map(([type, value]) => ({ type, value }));
};

const mount: Mount = (el, ctx) => {
  const spec: ISpec = {
    type: 'common',
    data: [
      { id: 'groups', values: groups(AGES) },
      { id: 'ages', values: AGES },
    ],
    series: [
      {
        type: 'pie',
        dataIndex: 0,
        categoryField: 'type',
        valueField: 'value',
        outerRadius: 0.45,
        innerRadius: 0,
        label: { visible: true, position: 'inside', style: { fill: '#fff', fontSize: ctx.preview ? 9 : 12 } },
      },
      {
        type: 'pie',
        dataIndex: 1,
        categoryField: 'type',
        valueField: 'value',
        outerRadius: 0.8,
        innerRadius: 0.5,
        padAngle: 0.5,
        label: { visible: !ctx.preview, position: 'outside' },
      },
    ],
    legends: { visible: false },
  };
  const { vchart, release } = createChart(el, ctx, spec);

  // Both rings are fed the same new values, so the inner sectors always match the sum of their bands.
  const next = jitterer(AGES, 4, 0.5);
  const stop = every(2200, () => {
    const rows = next();
    void vchart.updateData('groups', groups(rows));
    void vchart.updateData('ages', rows);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
