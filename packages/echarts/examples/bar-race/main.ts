// Bar race: realtimeSort reorders the bars as the data grows, one setOption per step
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, every } from '../../shared/chart.ts';

const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// Seeded random so the race is the same each time.
function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const rand = rng(3);
  const STEP = 2000; // animationDurationUpdate and the setOption interval agree, as the page advises.
  const values = labels.map(() => Math.round(rand() * 200));

  chart.setOption({
    // Longest data at x max, ordered from the top: yAxis.inverse puts bar 0 at the top.
    xAxis: { max: 'dataMax' },
    yAxis: {
      type: 'category',
      data: labels,
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      // Show only the top n bars: max is n - 1.
      max: ctx.preview ? 3 : 4,
    },
    grid: { top: 10, left: 40, right: 50, bottom: 24 },
    series: [
      {
        type: 'bar',
        // realtimeSort turns on the bar race reordering.
        realtimeSort: true,
        data: values,
        // valueAnimation makes the label numbers roll between values.
        label: { show: true, position: 'right', valueAnimation: true },
      },
    ],
    // 0: the first frame does not grow from zero. Updates last one step and ease linearly.
    animationDuration: 0,
    animationDurationUpdate: STEP,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  });

  const advance = (): void => {
    for (let i = 0; i < values.length; i += 1) {
      values[i] = (values[i] ?? 0) + (rand() > 0.9 ? Math.round(rand() * 2000) : Math.round(rand() * 200));
    }
    chart.setOption({ series: [{ type: 'bar', data: values }] });
  };
  const stop = every(STEP, advance);
  const first = window.setTimeout(advance, 0);

  if (bar) button(bar, 'restart race', () => {
    values.forEach((_, i) => {
      values[i] = Math.round(rand() * 200);
    });
    chart.setOption({ series: [{ type: 'bar', data: values }] });
  });

  return () => {
    window.clearTimeout(first);
    stop();
    dispose();
  };
};

export default mount;
