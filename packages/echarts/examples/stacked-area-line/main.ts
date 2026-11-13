// Stacked and plain area lines: stack adds series up, areaStyle fills under the line
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, every } from '../../shared/chart.ts';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const names = ['Email', 'Ads', 'Video', 'Direct', 'Search'];
const base = [
  [120, 132, 101, 134, 90, 230, 210],
  [220, 182, 191, 234, 290, 330, 310],
  [150, 232, 201, 154, 190, 330, 410],
  [320, 332, 301, 334, 390, 330, 320],
  [820, 932, 901, 934, 1290, 1330, 1320],
];

function build(stacked: boolean, area: boolean, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#555' } } },
    legend: preview ? { show: false } : {},
    // ECharts 6 puts the legend at the bottom by default; the grid leaves room for it.
    grid: { top: preview ? 16 : 44, left: 44, right: 16, bottom: preview ? 24 : 60, containLabel: false },
    xAxis: { type: 'category', boundaryGap: false, data: days },
    yAxis: { type: 'value' },
    series: names.map((name, i) => ({
      name,
      type: 'line' as const,
      // Same stack name: each line is drawn on top of the ones before it.
      stack: stacked ? 'Total' : '',
      // areaStyle: {} fills with the series color at default opacity; opacity tunes it.
      areaStyle: area ? { opacity: stacked ? 0.7 : 0.25 } : undefined,
      emphasis: { focus: 'series' as const },
      showSymbol: false,
      data: base[i],
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  const state = { stacked: true, area: true };
  const show = (): void => {
    // areaStyle: undefined does not clear an old fill on merge, so replace the whole option.
    chart.setOption(build(state.stacked, state.area, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    stop = every(1800, () => {
      n += 1;
      state.stacked = n % 2 === 0;
      state.area = n % 4 !== 3;
      show();
    });
  } else {
    const st = button(bar!, 'stack: on', () => {
      state.stacked = !state.stacked;
      st.textContent = `stack: ${state.stacked ? 'on' : 'off'}`;
      show();
    });
    const ar = button(bar!, 'areaStyle: on', () => {
      state.area = !state.area;
      ar.textContent = `areaStyle: ${state.area ? 'on' : 'off'}`;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
