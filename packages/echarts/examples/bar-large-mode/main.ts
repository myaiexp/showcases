// Large mode: one bar series with thousands of bars, switching large and largeThreshold and timing the redraw
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/bar-data.ts';

/** A noisy wave, deterministic for a given count. */
function wave(count: number): number[] {
  const rand = seeded(count);
  return Array.from({ length: count }, (_, i) => Math.round(50 + 30 * Math.sin(i / 40) + 20 * Math.sin(i / 7) + rand() * 15));
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const info = document.createElement('span');
  bar?.append(info);
  const { chart, dispose } = createChart(el, ctx);
  let count = 8000;
  let large = true;
  let threshold = 2000;

  const apply = (): void => {
    const t0 = performance.now();
    chart.setOption({
      animation: false,
      grid: { top: 16, left: 40, right: 12, bottom: 24 },
      xAxis: { type: 'category', data: Array.from({ length: count }, (_, i) => i), axisLabel: { interval: Math.ceil(count / 8) } },
      yAxis: { type: 'value' },
      series: {
        type: 'bar',
        data: wave(count),
        // large: draw the whole series as one optimised shape. Once on, single bars lose their own styling.
        large,
        // largeThreshold: the least number of bars at which large mode switches on.
        largeThreshold: threshold,
        itemStyle: { color: '#5fb6a8' },
      },
    });
    info.textContent = `${count} bars, large mode ${large && count >= threshold ? 'active' : 'inactive'}, setOption ${(performance.now() - t0).toFixed(0)} ms`;
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'count', ['500', '2000', '8000', '30000', '100000'], (v) => {
      count = Number(v);
      apply();
    }).value = String(count);
    const toggle = button(bar, 'large: on', () => {
      large = !large;
      toggle.textContent = `large: ${large ? 'on' : 'off'}`;
      apply();
    });
    slider(bar, 'largeThreshold', [100, 20000, 100], threshold, (v) => {
      threshold = v;
      apply();
    });
  } else {
    const counts = [3000, 6000, 12000];
    let i = 0;
    stop = every(1600, () => {
      count = counts[++i % counts.length]!;
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
