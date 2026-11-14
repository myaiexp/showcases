// FAQ: bar.style.fill callbacks: colour by value thresholds, or recolour one datum and keep the series colour
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const sales = MONTHS.map((month, i) => ({ month, sales: [22, 13, 35, 29, 48, 18, 41, 30][i] }));
const years = ['1990', '2000', '2010'].flatMap((year) =>
  ['A', 'B'].map((type, i) => ({ year, type, value: 30 + (Number(year) % 7) * 5 + i * 20 })),
);

interface S {
  rule: 'value thresholds' | 'one year, seriesColor';
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { rule: 'value thresholds' },
    mode: 'rebuild',
    previewMs: 2000,
    step: (s) => ({ rule: s.rule === 'value thresholds' ? 'one year, seriesColor' : 'value thresholds' }),
    controls: (bar, live) => select(bar, 'rule', ['value thresholds', 'one year, seriesColor'], (v) => live.set({ rule: v as S['rule'] })),
    build: (s): ISpec =>
      (s.rule === 'value thresholds'
        ? {
            type: 'bar',
            data: [{ id: 'sales', values: sales }],
            xField: 'month',
            yField: 'sales',
            bar: {
              style: {
                // The datum is the row; return any colour.
                fill: (d: { sales: number }) => (d.sales >= 40 ? '#52c41a' : d.sales >= 25 ? '#faad14' : '#ff4d4f'),
              },
            },
          }
        : {
            type: 'bar',
            data: [{ id: 'years', values: years }],
            xField: ['year', 'type'],
            yField: 'value',
            seriesField: 'type',
            bar: {
              style: {
                // The second argument is the chart context: seriesColor gives the colour the series would get.
                fill: (d: { year: string; type: string }, ctx2: { seriesColor: (k: string) => string }) =>
                  d.year === '2000' ? '#ff4d4f' : ctx2.seriesColor(d.type),
              },
            },
            legends: { visible: !ctx.preview, orient: 'top' },
          }) as unknown as ISpec,
  });

export default mount;
