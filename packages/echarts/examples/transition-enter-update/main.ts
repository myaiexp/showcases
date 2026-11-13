// Enter, update and leave transitions keyed by name, with easing and staggered delays
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const EASINGS = ['cubicOut', 'elasticOut', 'bounceOut', 'backOut', 'quinticInOut', 'linear'] as const;

/** A random subset of names, so each update adds some items and removes others. */
const pick = (): { name: string; value: number }[] =>
  NAMES.filter(() => Math.random() > 0.3).map((name) => ({ name, value: Math.round(10 + Math.random() * 90) }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let easing: (typeof EASINGS)[number] = 'elasticOut';

  const render = (): void => {
    const data = pick();
    chart.setOption({
      // Enter animation (first appearance) and update animation (changed items) are
      // configured separately; the *Update names are the update ones.
      animationDuration: 900,
      animationEasing: easing,
      animationDurationUpdate: 700,
      animationEasingUpdate: easing,
      // A function delay staggers the bars by index.
      animationDelay: (idx: number) => idx * 80,
      animationDelayUpdate: (idx: number) => idx * 40,
      grid: ctx.preview ? { top: 10, bottom: 22, left: 30, right: 10 } : undefined,
      xAxis: { type: 'category', data: data.map((d) => d.name) },
      yAxis: { type: 'value', max: 100 },
      series: [
        {
          type: 'bar',
          // Data is diffed by name: names kept are updated, new names enter, missing leave.
          data,
          label: { show: !ctx.preview, position: 'top' },
          colorBy: 'data',
        },
      ],
    });
  };
  render();
  const stop = every(ctx.preview ? 2200 : 2600, render);

  if (bar) {
    select(bar, 'easing', EASINGS, (v) => {
      easing = v as (typeof EASINGS)[number];
      render();
    }).value = easing;
    const done = document.createElement('span');
    bar.append(done);
    // 'finished' fires once a render's animations are all done.
    chart.on('finished', () => {
      done.textContent = `finished at ${new Date().toTimeString().slice(0, 8)}`;
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
