// FAQ: a note on the left and the legend on the right of one bottom row, with layoutType absolute
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const build = (absolute: boolean): ISpec => ({
  type: 'bar',
  data: [{ id: 'd', values: groupedRows(QUARTERS.slice(0, 4), ['North', 'South', 'East'], 17) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  // Room under the plot for the shared row.
  padding: { bottom: 40, top: 10, left: 10, right: 10 },
  title: absolute
    ? { visible: true, text: 'Units sold per quarter', layoutType: 'absolute', left: 10, bottom: 8, textStyle: { fontSize: 13 } }
    : { visible: true, text: 'Units sold per quarter', orient: 'bottom', textStyle: { fontSize: 13 } },
  legends: absolute
    ? { visible: true, layoutType: 'absolute', right: 10, bottom: 8 }
    : { visible: true, orient: 'bottom' },
});

const mount: Mount = (el, ctx) => {
  let released = false;
  let chart = createChart(el, ctx, build(true));
  // Mode changes remove keys, so the chart is rebuilt rather than merged.
  const rebuild = (abs: boolean): void => {
    chart.release();
    chart = createChart(el, ctx, build(abs));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'layoutType', ['absolute', 'normal (stacked rows)'], (v) => rebuild(v === 'absolute'));
  }
  let i = 0;
  const stop = every(2200, () => {
    i += 1;
    if (ctx.preview && !released) rebuild(pick([true, false], i));
  });
  return () => {
    stop();
    released = true;
    chart.release();
  };
};

export default mount;
