// Several boxplot series on one category axis, with quartiles computed from generated samples
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, slider } from '../../shared/chart.ts';

const groups = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const servers = ['eu-west', 'us-east', 'ap-south'];

/** The five numbers a boxplot wants: [min, Q1, median, Q3, max]. ECharts does not compute them. */
function summarise(samples: number[]): number[] {
  const s = [...samples].sort((a, b) => a - b);
  const at = (p: number): number => {
    const k = (s.length - 1) * p;
    const lo = Math.floor(k);
    return s[lo]! + (s[Math.min(lo + 1, s.length - 1)]! - s[lo]!) * (k - lo);
  };
  return [s[0]!, at(0.25), at(0.5), at(0.75), s[s.length - 1]!].map((v) => Math.round(v));
}

function sample(): number[][][] {
  return servers.map((_, si) =>
    groups.map(() => {
      const centre = 80 + si * 30 + Math.random() * 30;
      const spread = 10 + Math.random() * 25;
      return summarise(Array.from({ length: 40 }, () => centre + (Math.random() + Math.random() + Math.random() - 1.5) * spread));
    }),
  );
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let boxData = sample();
  let width = 100;

  const show = (): void => {
    chart.setOption({
      legend: { show: !ctx.preview, data: servers },
      tooltip: { trigger: 'item' },
      grid: { left: 48, right: 20, top: ctx.preview ? 16 : 40, bottom: ctx.preview ? 28 : 64 },
      xAxis: { type: 'category', data: groups, boundaryGap: true },
      yAxis: { type: 'value', name: ctx.preview ? '' : 'latency (ms)', scale: true },
      // One boxplot series per server: series on the same category axis sit side by side,
      // and the legend toggles each one.
      series: servers.map((name, i) => ({
        type: 'boxplot' as const,
        name,
        data: boxData[i]!,
        boxWidth: [4, Math.round((width / 100) * 24)],
        itemStyle: { borderWidth: 2, color: 'transparent' },
        emphasis: { focus: 'series' as const },
      })),
    });
  };
  show();

  const resample = (): void => {
    boxData = sample();
    show();
  };
  const stop = every(ctx.preview ? 2000 : 3500, resample);
  if (bar) {
    slider(bar, 'max boxWidth (% of 24px)', [20, 200, 10], width, (v) => {
      width = v;
      show();
    });
    button(bar, 'Resample', resample);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
