// A range bar registered once with registerCustomSeries, then used by name in options
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, slider } from '../../shared/chart.ts';

/**
 * The render logic: one rounded bar from api.value(1) (low) to api.value(2) (high) at
 * category api.value(0). Options that change per chart come in through
 * params.itemPayload, the series' `itemPayload` object.
 */
const renderRangeBar: CustomSeriesRenderItem = (params, api) => {
  const payload = params.itemPayload as { barWidth?: number; borderRadius?: number };
  const width = payload.barWidth ?? 10;
  const [x, yLow] = api.coord([api.value(0), api.value(1)]) as [number, number];
  const [, yHigh] = api.coord([api.value(0), api.value(2)]) as [number, number];
  return {
    type: 'rect',
    shape: { x: x - width / 2, y: yHigh, width, height: yLow - yHigh, r: payload.borderRadius ?? 0 },
    // api.visual('color') is the colour the palette or a visualMap assigned to this item.
    // (api.style() still exists but warns that it is deprecated in ECharts 6.)
    style: { fill: api.visual('color') as string },
  };
};

// Registered under a name, it works like a built-in: series.renderItem: 'rangeBar'.
// Registering the same name again replaces it, so remounting the example is harmless.
echarts.registerCustomSeries('rangeBar', renderRangeBar);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** [dayIndex, low, high] daily temperatures. */
function week(): [number, number, number][] {
  return days.map((_, i) => {
    const low = Math.round(8 + Math.random() * 8);
    return [i, low, low + Math.round(4 + Math.random() * 9)];
  });
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let barWidth = ctx.preview ? 12 : 22;
  let data = week();

  const render = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      grid: ctx.preview ? { top: 16, bottom: 24, left: 36, right: 12 } : undefined,
      xAxis: { type: 'category', data: days },
      yAxis: { type: 'value', name: ctx.preview ? undefined : '°C', min: 0 },
      series: [
        {
          type: 'custom',
          name: 'temperature',
          renderItem: 'rangeBar',
          itemPayload: { barWidth, borderRadius: barWidth / 2 },
          // encode maps dimension 0 to x and both 1 and 2 to y, so the y axis extent
          // covers lows and highs; tooltip shows both.
          encode: { x: 0, y: [1, 2], tooltip: [1, 2] },
          dimensions: ['day', 'low', 'high'],
          data,
        },
      ],
    });
  };
  render();

  const stop = every(ctx.preview ? 2200 : 3500, () => {
    data = week();
    render();
  });
  if (bar) {
    slider(bar, 'itemPayload.barWidth', [4, 40, 1], barWidth, (v) => {
      barWidth = v;
      render();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
