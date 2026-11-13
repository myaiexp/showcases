// dataZoom on the y axis of a long horizontal bar chart: minSpan, maxSpan, zoomLock and a value window
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/interaction-data.ts';

const rand = seeded(21);
const N = 40;
const names = Array.from({ length: N }, (_, i) => 'Item ' + String(i + 1).padStart(2, '0'));
const values = names.map(() => Math.round(20 + rand() * 80));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  let minSpan = 10;
  let maxSpan = 60;
  let lock = false;

  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { top: 10, left: 70, right: ctx.preview ? 20 : 60, bottom: 20 },
      xAxis: { type: 'value' },
      yAxis: { type: 'category', data: names },
      dataZoom: [
        {
          type: 'slider',
          // yAxisIndex: this component windows the y axis, so it is vertical by default.
          yAxisIndex: 0,
          show: !ctx.preview,
          right: 8,
          width: 24,
          // startValue/endValue: the window in axis values; on a category axis, category indexes.
          startValue: 8,
          endValue: 18,
          // minSpan/maxSpan: the window may be no smaller/larger than this percent of the data.
          minSpan,
          maxSpan,
          // zoomLock: the window size is fixed; it can only be moved.
          zoomLock: lock,
          showDetail: true,
        },
        // inside: wheel and drag act on the same window; it shares the limits.
        { type: 'inside', yAxisIndex: 0, minSpan, maxSpan, zoomLock: lock },
      ],
      series: [{ type: 'bar', data: values, barWidth: '70%' }],
    });
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    slider(bar, 'minSpan %', [2, 40, 1], minSpan, (v) => {
      minSpan = v;
      apply();
    });
    slider(bar, 'maxSpan %', [20, 100, 5], maxSpan, (v) => {
      maxSpan = v;
      apply();
    });
    const l = button(bar, 'zoomLock: off', () => {
      lock = !lock;
      l.textContent = 'zoomLock: ' + (lock ? 'on' : 'off');
      apply();
    });
    // The action takes the same startValue/endValue fields.
    button(bar, 'Jump to Item 30-40', () => chart.dispatchAction({ type: 'dataZoom', dataZoomIndex: 0, startValue: 29, endValue: 39 }));
    button(bar, 'Jump to Item 01-10', () => chart.dispatchAction({ type: 'dataZoom', dataZoomIndex: 0, startValue: 0, endValue: 9 }));
  } else {
    // Slide a 25% window up and down the categories.
    let start = 0;
    let dir = 1;
    stop = every(1000, () => {
      start += dir * 8;
      if (start > 75 || start < 0) dir = -dir;
      chart.dispatchAction({ type: 'dataZoom', dataZoomIndex: 1, start, end: start + 25 });
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
