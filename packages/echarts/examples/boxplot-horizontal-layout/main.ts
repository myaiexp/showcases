// Boxplot layout: category axis on x (boxes stand) or on y (boxes lie), with layout set explicitly
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const groups = ['Berlin', 'Oslo', 'Lisbon', 'Cairo', 'Tokyo', 'Lima'];
// [min, Q1, median, Q3, max] of daily temperatures per city.
const base = [
  [-4, 3, 9, 16, 28],
  [-10, -2, 5, 13, 24],
  [8, 12, 17, 22, 33],
  [14, 19, 25, 31, 41],
  [0, 8, 15, 23, 34],
  [15, 17, 20, 23, 28],
];
const jitter = (): number[][] => base.map((r) => {
  const d = Math.round((Math.random() - 0.5) * 8);
  return r.map((v, i) => v + d + (i === 0 ? -1 : i === 4 ? 1 : 0) * Math.round(Math.random() * 3));
});

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let categoryOn = 'x';
  let data = base;
  let layoutChoice = 'follow axes';

  const show = (): void => {
    const onX = categoryOn === 'x';
    const category = { type: 'category' as const, data: groups, boundaryGap: true };
    const value = { type: 'value' as const, scale: true, name: ctx.preview ? '' : '°C' };
    chart.setOption({
      tooltip: { trigger: 'item' },
      grid: { left: onX ? 44 : 64, right: 24, top: 24, bottom: 28 },
      xAxis: onX ? category : value,
      yAxis: onX ? value : category,
      series: [
        {
          type: 'boxplot',
          data,
          // layout: 'horizontal' places the boxes one after another along a horizontal axis
          // (they stand up); 'vertical' stacks them down a vertical axis (they lie on their side).
          // Left unset, it follows the category axis.
          ...(layoutChoice === 'follow axes' ? {} : { layout: layoutChoice as 'horizontal' | 'vertical' }),
          boxWidth: [8, 40],
          itemStyle: { borderWidth: 2 },
        },
      ],
    });
  };
  show();

  // Preview: flip the category axis and resample the boxes.
  let n = 0;
  const stop = every(ctx.preview ? 2200 : 3500, () => {
    data = jitter();
    if (ctx.preview) categoryOn = ++n % 2 ? 'y' : 'x';
    show();
  });
  if (bar) {
    select(bar, 'category axis on', ['x', 'y'], (v) => {
      categoryOn = v;
      show();
    });
    select(bar, 'layout', ['follow axes', 'horizontal', 'vertical'], (v) => {
      layoutChoice = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
