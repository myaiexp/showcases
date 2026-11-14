// A candlestick series and a moving-average line series side by side in one common chart
import type { Mount } from '@/types.ts';
import { registerCandlestickChart } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';
import { candles, movingAverage, priceRange } from '../../shared/ext-data.ts';

registerCandlestickChart();

const values = candles(26, 12);

function build(period: number, preview: boolean): ISpec {
  const n = preview ? 16 : 26;
  const slice = values.slice(0, n);
  return {
    type: 'common',
    animation: false,
    data: [
      { id: 'k', values: slice },
      { id: 'ma', values: movingAverage(slice, period) },
    ],
    series: [
      {
        type: 'candlestick',
        dataId: 'k',
        xField: 'date',
        openField: 'open',
        highField: 'high',
        lowField: 'low',
        closeField: 'close',
        rising: { style: { boxFill: '#e5484d', stroke: '#e5484d' } },
        falling: { style: { boxFill: '#30a46c', stroke: '#30a46c' } },
      },
      {
        type: 'line',
        dataId: 'ma',
        xField: 'date',
        yField: 'ma',
        point: { visible: false },
        line: { style: { stroke: '#f6bd16', lineWidth: 2 } },
      },
    ],
    axes: [
      { orient: 'left', type: 'linear', ...priceRange(slice), nice: false },
      { orient: 'bottom', type: 'band' },
    ],
  } as unknown as ISpec;
}

const mount: Mount = (el, ctx) =>
  mountLive<{ period: number }>(el, ctx, {
    initial: { period: 5 },
    build: (s, p) => build(s.period, p),
    controls(bar, live) {
      const sel = select(bar, 'Moving average over', ['3 days', '5 days', '10 days'], (v) => live.set({ period: parseInt(v, 10) }));
      sel.value = '5 days';
    },
    step: (_, i) => ({ period: [3, 5, 10][i % 3] as number }),
    previewMs: 1800,
  });

export default mount;
