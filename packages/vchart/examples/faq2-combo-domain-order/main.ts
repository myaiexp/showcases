// FAQ: data.fields domain + sortIndex sets the x order of a combination chart
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const DAYS = ['03-20', '03-21', '03-22', '03-23', '03-24'];
// Rows arrive in a scrambled order, as they would from a query without ORDER BY.
const ARRIVAL = ['03-22', '03-20', '03-24', '03-21', '03-23'];
const values = ARRIVAL.flatMap((x, i) => [
  { x, type: 'Bugs', y: [14, 27, 6, 22, 9][i] },
  { x, type: 'Ideas', y: [9, 11, 20, 4, 16][i] },
]);

type Order = 'as arrived' | 'domain ascending' | 'domain descending';
interface S {
  order: Order;
}
const NEXT: Record<Order, Order> = {
  'as arrived': 'domain ascending',
  'domain ascending': 'domain descending',
  'domain descending': 'as arrived',
};

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { order: 'as arrived' },
    mode: 'rebuild',
    previewMs: 1800,
    step: (s) => ({ order: NEXT[s.order] }),
    controls: (bar, live) => {
      select(bar, 'x order', Object.keys(NEXT), (v) => live.set({ order: v as Order }));
    },
    build: (s): ISpec => {
      const domain = s.order === 'domain descending' ? [...DAYS].reverse() : DAYS;
      return {
        type: 'common',
        seriesField: 'type',
        data: [
          {
            id: 'rows',
            // The domain lists the x values in display order; sortIndex 0 says "sort by this domain".
            ...(s.order === 'as arrived' ? {} : { fields: { x: { domain, sortIndex: 0 } } }),
            values,
          },
        ],
        series: [
          { type: 'bar', dataId: 'rows', xField: 'x', yField: 'y', seriesField: 'type', stack: true },
          { type: 'line', dataId: 'rows', xField: 'x', yField: 'y', seriesField: 'type' },
        ],
        axes: [{ orient: 'left' }, { orient: 'bottom', type: 'band' }],
        legends: { visible: !ctx.preview },
      } as ISpec;
    },
  });

export default mount;
