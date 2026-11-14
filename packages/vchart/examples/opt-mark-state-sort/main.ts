// stateSort: the order of states decides which style is applied last
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rows = groupedRows(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], ['North'], 33).map(({ x, y }) => ({ x, y }));
const ORDERS = ['warm last', 'cool last'];

const mount: Mount = (el, ctx) =>
  mountLive<{ order: string }>(el, ctx, {
    initial: { order: ORDERS[0] ?? '' },
    mode: 'rebuild',
    previewMs: 1500,
    step: (s) => ({ order: s.order === 'warm last' ? 'cool last' : 'warm last' }),
    build: ({ order }, preview) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: rows }],
        xField: 'x',
        yField: 'y',
        legends: { visible: false },
        title: preview ? undefined : { visible: true, text: `stateSort: ${order}`, textStyle: { fontSize: 13 } },
        bar: {
          style: { fill: '#4a4f5c' },
          // Bars above 40 match warm, bars above 60 match cool: the tallest bars have both states.
          state: {
            warm: { filter: (d: { y: number }) => d.y > 40, style: { fill: '#ff8a3d' } },
            cool: { filter: (d: { y: number }) => d.y > 60, style: { fill: '#4d7cff' } },
          },
          // States are applied in the order this comparator gives; the last one wins on conflicting keys.
          stateSort: (a: string, b: string) => {
            const rank = (s: string): number => (order === 'warm last' ? (s === 'warm' ? 1 : 0) : s === 'cool' ? 1 : 0);
            return rank(a) - rank(b);
          },
        },
        tooltip: { visible: false },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'order', ORDERS, (v) => live.set({ order: v }));
    },
  });

export default mount;
