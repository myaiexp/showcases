// Color palette, explicit itemStyle and the emphasis, blur and select states of a bar chart
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

const palettes: Record<string, string[]> = {
  warm: ['#ff7a45', '#ffc53d', '#f759ab'],
  cool: ['#36cfc9', '#597ef7', '#9254de'],
};
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const build = (palette: string, focus: 'none' | 'self' | 'series'): EChartsOption => ({
    // Global color palette: series and data pick colors from it in order.
    color: palettes[palette],
    legend: ctx.preview ? { show: false } : {},
    tooltip: {},
    // ECharts 6 puts the legend at the bottom by default; the grid leaves room for it.
    grid: { top: ctx.preview ? 16 : 40, bottom: ctx.preview ? 24 : 60, left: 36, right: 12 },
    xAxis: { type: 'category', data: days },
    yAxis: {},
    series: [12, 8, 5].map((base, i) => ({
      name: ['North', 'Central', 'South'][i],
      type: 'bar' as const,
      data: days.map((_, d) => base + ((d * 7 + i * 3) % 9)),
      // Normal state style, set explicitly.
      itemStyle: { borderRadius: [4, 4, 0, 0], shadowBlur: 6, shadowColor: 'rgba(0,0,0,0.4)' },
      // Emphasis state (hover/highlight): overrides on top of the auto-generated style.
      emphasis: { focus, itemStyle: { borderColor: '#fff', borderWidth: 2, shadowBlur: 16 } },
      // Blur state: what the other elements look like while one is focused.
      blur: { itemStyle: { opacity: 0.25 } },
      // Select state, entered by clicking when selectedMode is on.
      selectedMode: 'multiple' as const,
      select: { itemStyle: { color: '#fff', borderColor: '#ff4d4f', borderWidth: 2 } },
    })),
  });

  let palette = 'warm';
  let focus: 'none' | 'self' | 'series' = 'series';
  chart.setOption(build(palette, focus));

  let stop: () => void;
  if (ctx.preview) {
    // Walk a highlight across series 0..2; highlight and downplay are the actions that
    // put elements into (and out of) the emphasis and blur states without a mouse.
    let n = 0;
    stop = every(900, () => {
      chart.dispatchAction({ type: 'downplay' });
      chart.dispatchAction({ type: 'highlight', seriesIndex: n % 3 });
      n += 1;
    });
  } else {
    stop = () => {};
    select(bar!, 'palette', Object.keys(palettes), (v) => {
      palette = v;
      chart.setOption(build(palette, focus));
    });
    select(bar!, 'emphasis.focus', ['series', 'self', 'none'], (v) => {
      focus = v as typeof focus;
      chart.setOption(build(palette, focus));
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
