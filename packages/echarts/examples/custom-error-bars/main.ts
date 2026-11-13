// Bars plus a custom series whose renderItem draws error bars with api.value, api.coord and api.size
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const groups = ['Control', 'Dose A', 'Dose B', 'Dose C', 'Dose D', 'Dose E'];

/** Means with a spread (one standard deviation) per group. */
function sample(): { mean: number; sd: number }[] {
  return groups.map((_, i) => ({ mean: 20 + i * 6 + Math.random() * 10, sd: 2 + Math.random() * 5 }));
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let rows = sample();
  let spread = 1; // how many standard deviations the whisker spans
  let capRatio = 0.4; // cap width as a share of the category width

  /**
   * Called per data item: [category index, low, high]. api.value reads a dimension,
   * api.coord converts data to pixels, api.size converts a data span (1 category) to pixels.
   */
  const renderItem: CustomSeriesRenderItem = (_params, api) => {
    const x = api.value(0) as number;
    const [px, pyHigh] = api.coord([x, api.value(2)]) as [number, number];
    const [, pyLow] = api.coord([x, api.value(1)]) as [number, number];
    const half = ((api.size!([1, 0]) as number[])[0]! * capRatio) / 2;
    const style = { stroke: '#fff', lineWidth: 1.5, fill: 'none' };
    return {
      type: 'group',
      children: [
        { type: 'line', shape: { x1: px, y1: pyHigh, x2: px, y2: pyLow }, style },
        { type: 'line', shape: { x1: px - half, y1: pyHigh, x2: px + half, y2: pyHigh }, style },
        { type: 'line', shape: { x1: px - half, y1: pyLow, x2: px + half, y2: pyLow }, style },
      ],
    };
  };

  const show = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview, trigger: 'axis' },
      legend: { show: !ctx.preview },
      grid: { top: 24, left: 40, right: 16, bottom: ctx.preview ? 24 : 60 },
      xAxis: { type: 'category', data: groups },
      yAxis: { type: 'value', min: 0 },
      series: [
        { name: 'Mean', type: 'bar', barWidth: '45%', data: rows.map((r) => Math.round(r.mean * 10) / 10), itemStyle: { opacity: 0.8 } },
        {
          name: 'Spread',
          type: 'custom',
          renderItem,
          // x is dimension 0; y spans dimensions 1 and 2, so the axis range covers the whiskers.
          encode: { x: 0, y: [1, 2], tooltip: [1, 2] },
          dimensions: ['group', 'low', 'high'],
          data: rows.map((r, i) => [i, Math.round((r.mean - spread * r.sd) * 10) / 10, Math.round((r.mean + spread * r.sd) * 10) / 10]),
          z: 10,
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2000, () => {
      rows = sample();
      show();
    });
  } else {
    select(bar!, 'spread', ['1 SD', '2 SD', '0.5 SD'], (v) => {
      spread = parseFloat(v);
      show();
    });
    slider(bar!, 'cap width', [0.1, 1, 0.1], capRatio, (v) => {
      capRatio = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
