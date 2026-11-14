// Two value axes bound to series with seriesId or seriesIndex
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const sales = MONTHS.map((month, i) => ({ month, sales: [320, 410, 380, 520, 470, 610][i] }));
const rate = MONTHS.map((month, i) => ({ month, rate: [2.1, 2.8, 2.4, 3.6, 3.1, 4.2][i] }));
const MODES = ['seriesId', 'seriesIndex', 'none (one shared axis)'] as const;
interface State { mode: (typeof MODES)[number] }

const build = ({ mode }: State): ISpec => {
  const bottom = { orient: 'bottom', type: 'band' };
  const axes =
    mode === 'seriesId'
      ? [bottom, { orient: 'left', seriesId: ['bars'] }, { orient: 'right', seriesId: ['rate'], grid: { visible: false } }]
      : mode === 'seriesIndex'
        ? [bottom, { orient: 'left', seriesIndex: [0] }, { orient: 'right', seriesIndex: [1], grid: { visible: false } }]
        : [bottom, { orient: 'left' }];
  return {
    type: 'common',
    data: [{ id: 'sales', values: sales }, { id: 'rate', values: rate }],
    series: [
      { type: 'bar', id: 'bars', dataId: 'sales', xField: 'month', yField: 'sales' },
      { type: 'line', id: 'rate', dataId: 'rate', xField: 'month', yField: 'rate' },
    ],
    axes,
  } as unknown as ISpec;
};

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { mode: 'seriesId' },
    build,
    mode: 'rebuild',
    previewMs: 2000,
    step: (s) => ({ mode: MODES[(MODES.indexOf(s.mode) + 1) % MODES.length] ?? 'seriesId' }),
    controls: (bar, live) => {
      select(bar, 'axis binding', MODES, (v) => live.set({ mode: v as State['mode'] }));
    },
  });

export default mount;
