// Bar downsampling: the sampling strategies compared on a series with far more points than pixels
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded } from '../../shared/bar-data.ts';

const COUNT = 3000;
const rand = seeded(5);
// Slow drift plus a few sharp spikes, so the strategies disagree visibly.
const data = Array.from({ length: COUNT }, (_, i) => {
  const spike = rand() > 0.995 ? 60 + rand() * 40 : 0;
  return Math.round(40 + 25 * Math.sin(i / 160) + rand() * 20 + spike);
});
const STRATEGIES = ['none', 'lttb', 'average', 'min', 'max', 'minmax', 'sum'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let strategy: (typeof STRATEGIES)[number] = 'average';

  const apply = (): void => {
    chart.setOption({
      animation: false,
      title: { text: `sampling: ${strategy === 'none' ? 'off' : `'${strategy}'`}`, left: 'center', top: 0, textStyle: { fontSize: 12, fontWeight: 'normal' } },
      grid: { top: 30, left: 44, right: 12, bottom: 24 },
      xAxis: { type: 'category', data: data.map((_, i) => i), axisLabel: { interval: 399 } },
      yAxis: { type: 'value' },
      series: {
        type: 'bar',
        data,
        // sampling: when there are far more points than pixels, reduce each bucket to one value
        // (lttb keeps the trend and extremes; average / min / max / minmax / sum as named).
        sampling: strategy === 'none' ? undefined : strategy,
        itemStyle: { color: '#ee9b5e' },
      },
    }, true);
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'sampling', STRATEGIES, (v) => {
      strategy = v as typeof strategy;
      apply();
    }).value = strategy;
  } else {
    let i = 0;
    stop = every(1800, () => {
      strategy = STRATEGIES[++i % STRATEGIES.length] ?? 'none';
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
