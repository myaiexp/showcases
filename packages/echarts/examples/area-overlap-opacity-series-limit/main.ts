// Area charts that overlap, stack or stack to 100%, with a series-count slider and an opacity slider
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const names = ['Email', 'Search', 'Video', 'Social', 'Direct', 'Referral', 'Ads'];
// Smooth, deterministic data, larger values first (the guideline puts larger on top when stacking).
const series = names.map((name, k) => ({
  name,
  data: months.map((_, i) => Math.round((7 - k) * 14 + 22 * Math.sin(i / 2 + k * 1.3) + 30)),
}));

type Mode = 'overlapping' | 'stacked' | 'stacked to 100%';

function build(mode: Mode, count: number, opacity: number): EChartsOption {
  const shown = series.slice(0, count);
  const pct = mode === 'stacked to 100%';
  // For the 100% mode every column is rescaled to its own total.
  const totals = months.map((_, i) => shown.reduce((s, x) => s + x.data[i]!, 0));
  return {
    tooltip: { trigger: 'axis' },
    legend: {},
    grid: { top: 24, left: 44, right: 16, bottom: 60 },
    xAxis: { type: 'category', boundaryGap: false, data: months },
    yAxis: { type: 'value', max: pct ? 100 : undefined },
    series: shown.map((s) => ({
      name: s.name,
      type: 'line',
      stack: mode === 'overlapping' ? undefined : 'total',
      symbol: 'none',
      lineStyle: { width: 1.5 },
      // Opacity keeps overlapping layers readable when they cannot be kept apart.
      areaStyle: { opacity },
      emphasis: { focus: 'series' },
      data: pct ? s.data.map((v, i) => Math.round((v / totals[i]!) * 1000) / 10) : s.data,
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let mode: Mode = 'overlapping';
  let count = 3;
  let opacity = 0.35;
  const show = (): void => {
    chart.setOption(build(mode, count, opacity), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const modes: Mode[] = ['overlapping', 'stacked', 'stacked to 100%'];
    let i = 0;
    stop = every(2000, () => {
      i += 1;
      mode = modes[i % 3]!;
      count = 2 + (i % 3);
      show();
    });
  } else {
    select(bar!, 'layers', ['overlapping', 'stacked', 'stacked to 100%'], (v) => { mode = v as Mode; show(); });
    slider(bar!, 'series', [1, 7, 1], count, (v) => { count = v; show(); });
    slider(bar!, 'areaStyle.opacity', [0.1, 1, 0.05], opacity, (v) => { opacity = v; show(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
