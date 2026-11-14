// Extension chart: candlestick, one candle per day from open, high, low and close fields
import type { Mount } from '@/types.ts';
import { registerCandlestickChart } from '@visactor/vchart-extension';
import { createChart, every, type ISpec } from '../../shared/chart.ts';
import { candles, priceRange } from '../../shared/ext-data.ts';

registerCandlestickChart();

const mount: Mount = (el, ctx) => {
  let seed = 5;
  const first = candles(ctx.preview ? 14 : 24, seed);
  const spec = {
    type: 'candlestick',
    data: [{ id: 'k', values: first }],
    xField: 'date',
    openField: 'open',
    highField: 'high',
    lowField: 'low',
    closeField: 'close',
    // The guide recommends red for rising and green for falling.
    // The fill is boxFill, not fill: the series reads boxFill for the candle body.
    rising: { style: { boxFill: '#e5484d', stroke: '#e5484d' } },
    falling: { style: { boxFill: '#30a46c', stroke: '#30a46c' } },
    axes: [{ id: 'axis-left', orient: 'left', type: 'linear', ...priceRange(first), nice: false }, { orient: 'bottom', type: 'band' }],
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);

  const stop = every(2600, () => {
    seed += 1;
    const next = candles(ctx.preview ? 14 : 24, seed);
    // The axis range does not follow the new highs and lows by itself.
    void vchart.updateData('k', next);
    void vchart.updateModelSpec('axis-left', priceRange(next));
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
