// FAQ: a scrollBar on a combination chart, bound to its band axis, with axis sampling off
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, select } from '../../shared/chart.ts';
import { rng, slideWindow } from '../../shared/components-data.ts';

const r = rng(63);
const names = Array.from({ length: 36 }, (_, i) => `Item ${String(i + 1).padStart(2, '0')}`);
const bars = names.map((x) => ({ x, y: Math.round(20 + r() * 60) }));
const line = names.map((x) => ({ x, y: Math.round(1000 + r() * 800) }));

const build = (sampling: boolean): ISpec =>
  ({
    type: 'common',
    data: [
      { id: 'bars', values: bars },
      { id: 'line', values: line },
    ],
    series: [
      { type: 'bar', id: 'bar', dataIndex: 0, xField: 'x', yField: 'y' },
      { type: 'line', id: 'line', dataIndex: 1, xField: 'x', yField: 'y' },
    ],
    axes: [
      { orient: 'left', seriesId: ['bar'] },
      { orient: 'right', seriesId: ['line'], grid: { visible: false } },
      // With sampling off every label is drawn, so a window of the data is the way to keep them readable.
      { orient: 'bottom', id: 'x', type: 'band', sampling, label: { autoHide: false, autoRotate: false } },
    ],
    // axisId ties the scrollbar to the bottom axis; start and end are the visible share of the data.
    scrollBar: [{ orient: 'bottom', axisId: 'x', start: 0, end: 0.3 }],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  let chart = createChart(el, ctx, build(false));
  let stop = ctx.preview ? slideWindow(chart.vchart, 'scrollBar', 0.3, 80) : (): void => {};
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'axis sampling', ['off', 'on'], (v) => {
      chart.release();
      chart = createChart(el, ctx, build(v === 'on'));
    });
  }
  return () => {
    stop();
    stop = () => {};
    chart.release();
  };
};

export default mount;
