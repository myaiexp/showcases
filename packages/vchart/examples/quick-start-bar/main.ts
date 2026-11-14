// The Quick Start bar chart: a spec with data, type and fields, rendered with renderSync
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const values = (): { month: string; sales: number }[] =>
  days.map((month) => ({ month, sales: Math.round(10 + Math.random() * 30) }));

const mount: Mount = (el, ctx) => {
  // The spec from Getting_Started.md: one data entry, a chart type and the two fields.
  const spec: ISpec = {
    type: 'bar',
    data: [{ id: 'barData', values: [
      { month: 'Monday', sales: 22 },
      { month: 'Tuesday', sales: 13 },
      { month: 'Wednesday', sales: 25 },
      { month: 'Thursday', sales: 29 },
      { month: 'Friday', sales: 38 },
    ] }],
    xField: 'month',
    yField: 'sales',
  };
  const { vchart, release } = createChart(el, ctx, spec);

  // New random sales every two seconds, so the bars animate to their new heights.
  const stop = every(2000, () => {
    void vchart.updateData('barData', values());
  });

  return () => {
    stop();
    release();
  };
};

export default mount;
