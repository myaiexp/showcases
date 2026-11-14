// Crosshair defaultSelect and bindingAxesIndex on a chart with two value axes
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

const data = walk(7, 18).map((d) => ({ ...d, rate: Math.round(d.y * 1.8) }));
const LABELS = data.map((d) => d.x);

const build = (day: string, level: number): ISpec => ({
  type: 'line',
  data: [{ id: 'line', values: data }],
  xField: 'x',
  yField: 'y',
  // Axes 0 and 2 are the left and right value axes, axis 1 is the bottom category axis.
  axes: [
    { orient: 'left', max: 100 },
    { orient: 'bottom' },
    { orient: 'right', max: 200 },
  ],
  crosshair: {
    xField: {
      visible: true,
      line: { type: 'line', style: { stroke: '#38bdf8', lineWidth: 1, lineDash: [3, 3] } },
      bindingAxesIndex: [1],
      // Shown as soon as the chart renders, before any hover.
      defaultSelect: { axisIndex: 1, datum: day },
    },
    yField: {
      visible: true,
      line: { style: { stroke: '#f59e0b', lineWidth: 1, lineDash: [3, 3] } },
      bindingAxesIndex: [0, 2],
      defaultSelect: { axisIndex: 2, datum: level },
    },
  },
});

const mount: Mount = (el, ctx) => {
  let day = 'D04';
  let level = 120;
  const { vchart, release } = createChart(el, ctx, build(day, level));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(day, level));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1300, () => {
      i += 1;
      day = pick(LABELS, i);
      level = 40 + ((i * 37) % 140);
      apply();
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'xField.defaultSelect.datum', LABELS, (v) => ((day = v), apply())).value = day;
    select(bar, 'yField.defaultSelect.datum (right axis)', ['40', '80', '120', '160'], (v) => ((level = Number(v)), apply())).value = '120';
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
