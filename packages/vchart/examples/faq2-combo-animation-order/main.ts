// FAQ: per-series animationAppear in a common chart: bars one by one, then the delayed line
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every, slider, type Chart } from '../../shared/chart.ts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const bars = DAYS.map((x, i) => ({ x, y: [15, 25, 12, 30, 22, 18, 27][i] }));
const line = DAYS.map((x, i) => ({ x, y: [4, 9, 5, 11, 8, 6, 10][i] }));
const BAR_MS = 400;

const mount: Mount = (el, ctx) => {
  let lineDelay = BAR_MS * DAYS.length;
  const make = (): Chart => {
    const spec = {
      type: 'common',
      data: [
        { id: 'bars', values: bars },
        { id: 'line', values: line },
      ],
      series: [
        {
          type: 'bar',
          id: 'bar',
          dataId: 'bars',
          xField: 'x',
          yField: 'y',
          // Each bar enters after the previous one.
          animationAppear: { duration: BAR_MS, oneByOne: true },
        },
        {
          type: 'line',
          id: 'line',
          dataId: 'line',
          xField: 'x',
          yField: 'y',
          // Held back until the bars have finished.
          animationAppear: { delay: lineDelay, duration: 800 },
        },
      ],
      axes: [
        { orient: 'left', seriesId: ['bar'] },
        { orient: 'right', seriesId: ['line'], grid: { visible: false } },
        { orient: 'bottom', type: 'band' },
      ],
    } as unknown as ISpec;
    return createChart(el, ctx, spec);
  };
  let chart = make();
  const replay = (): void => {
    chart.release();
    chart = make();
  };
  let stop = (): void => {};
  // animationAppear plays once per chart, so replaying means building a new one.
  stop = every(ctx.preview ? 5200 : 7000, replay);
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    slider(bar, 'line delay ms', [0, 6000, 200], lineDelay, (v) => (lineDelay = v));
    button(bar, 'replay', replay);
  }
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
