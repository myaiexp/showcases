// Two cartesian regions stacked in a grid, their heights set by layout.rowHeight and changed from a slider
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const DAYS = Array.from({ length: 14 }, (_, i) => `D${i + 1}`);
const r = rng(8);
let price = 100;
const rows = DAYS.map((day) => {
  price += (r() - 0.45) * 8;
  return { day, price: Math.round(price * 10) / 10, volume: Math.round(200 + r() * 800) };
});

const build = ({ top }: { top: number }): ISpec =>
  ({
    type: 'common',
    data: [{ id: 'market', values: rows }],
    layout: {
      type: 'grid',
      col: 2,
      row: 4,
      // Row 0 takes a share of the total height; row 2 gets what is left. Row 1 is a small gap
      // that holds the top region's x axis, which is drawn without ticks or labels.
      rowHeight: [{ index: 0, size: (total: number) => total * top }, { index: 1, size: 14 }, { index: 3, size: 30 }],
      colWidth: [{ index: 0, size: 48 }],
      elements: [
        { modelId: 'axis-price', col: 0, row: 0 },
        { modelId: 'region-price', col: 1, row: 0 },
        { modelId: 'axis-price-x', col: 1, row: 1 },
        { modelId: 'axis-volume', col: 0, row: 2 },
        { modelId: 'region-volume', col: 1, row: 2 },
        { modelId: 'axis-day', col: 1, row: 3 },
      ],
    },
    region: [{ id: 'region-price' }, { id: 'region-volume' }],
    series: [
      { type: 'line', regionId: 'region-price', dataId: 'market', xField: 'day', yField: 'price', point: { visible: false } },
      { type: 'bar', regionId: 'region-volume', dataId: 'market', xField: 'day', yField: 'volume' },
    ],
    axes: [
      { id: 'axis-price', regionId: 'region-price', orient: 'left', type: 'linear', zero: false },
      // The top region needs an x axis for its scale, so it gets a bare one.
      { id: 'axis-price-x', regionId: 'region-price', orient: 'bottom', type: 'band', label: { visible: false }, tick: { visible: false } },
      { id: 'axis-volume', regionId: 'region-volume', orient: 'left', type: 'linear' },
      { id: 'axis-day', regionId: 'region-volume', orient: 'bottom', type: 'band' },
    ],
    tooltip: { dimension: { visible: true } },
  }) as unknown as ISpec;

const SHARES = [0.7, 0.5, 0.3, 0.6];

const mount: Mount = (el, ctx) =>
  mountLive<{ top: number }>(el, ctx, {
    initial: { top: 0.65 },
    build,
    previewMs: 1800,
    chart: { height: 460 },
    step: (_s, i) => ({ top: SHARES[i % SHARES.length] ?? 0.6 }),
    controls: (bar, live) => {
      slider(bar, 'top region share (%)', [20, 80, 5], 65, (v) => live.set({ top: v / 100 }));
    },
  });

export default mount;
