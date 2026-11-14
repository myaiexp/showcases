// Bars on a time xAxis: [timestamp, value] pairs, with the bar width derived from the data spacing
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded, between } from '../../shared/bar-data.ts';

const HOUR = 3600_000;
const STEPS: Record<string, { ms: number; count: number }> = {
  'every 6 hours': { ms: 6 * HOUR, count: 60 },
  'daily': { ms: 24 * HOUR, count: 45 },
  'weekly': { ms: 7 * 24 * HOUR, count: 26 },
};
const start = Date.UTC(2026, 0, 1);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let step = 'daily';
  let barWidth: number | undefined;

  const apply = (): void => {
    const { ms, count } = STEPS[step]!;
    const rand = seeded(count);
    // Data items are [time, value]; the x axis of type 'time' places each bar at its timestamp.
    const data = Array.from({ length: count }, (_, i) => [start + i * ms, between(rand, 10, 80)]);
    chart.setOption(
      {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { top: 16, left: 40, right: 20, bottom: 28 },
        xAxis: { type: 'time' },
        yAxis: { type: 'value' },
        // barWidth undefined: ECharts sizes the bars from the smallest gap between timestamps.
        series: { type: 'bar', data, barWidth, itemStyle: { borderRadius: [2, 2, 0, 0] } },
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'data spacing', Object.keys(STEPS), (v) => {
      step = v;
      apply();
    }).value = step;
    select(bar, 'barWidth', ['auto', '3', '8', '16'], (v) => {
      barWidth = v === 'auto' ? undefined : Number(v);
      apply();
    });
  } else {
    const keys = Object.keys(STEPS);
    let i = 0;
    stop = every(1800, () => {
      step = keys[++i % keys.length]!;
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
