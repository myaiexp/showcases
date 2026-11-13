// Timeline: baseOption plus one option per frame, with autoPlay stepping through years
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart } from '../../shared/chart.ts';

const years = ['2019', '2020', '2021', '2022', '2023', '2024'];
const regions = ['North', 'South', 'East', 'West'];
const sales: number[][] = [
  [120, 90, 70, 60],
  [100, 95, 85, 55],
  [130, 110, 95, 80],
  [160, 120, 100, 105],
  [170, 150, 120, 110],
  [200, 160, 150, 130],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });

  const option = {
    // baseOption: everything shared by all frames.
    baseOption: {
      timeline: {
        axisType: 'category',
        autoPlay: true, // starts playing on its own
        playInterval: ctx.preview ? 1000 : 1500,
        loop: true,
        data: years, // one label per entry in `options`
        left: 20,
        right: 20,
        bottom: 6,
        // In the 200px card the timeline gets a fixed thin strip under the grid.
        height: ctx.preview ? 24 : 50,
        label: { show: !ctx.preview },
        controlStyle: { showPlayBtn: !ctx.preview, showPrevBtn: !ctx.preview, showNextBtn: !ctx.preview },
      },
      tooltip: {},
      grid: { left: 50, right: 30, top: ctx.preview ? 30 : 50, bottom: ctx.preview ? 52 : 90 },
      xAxis: { type: 'category', data: regions },
      yAxis: { type: 'value', max: 220 },
      series: [{ type: 'bar', name: 'Sales' }],
    },
    // One switchable option per timeline entry: only what changes between frames.
    options: years.map((y, i) => ({
      title: { text: `Sales in ${y}`, left: 'center', textStyle: { fontSize: ctx.preview ? 13 : 16 } },
      series: [{ data: sales[i] }],
    })),
  };
  chart.setOption(option as EChartsOption);

  if (bar) {
    button(bar, 'Stop', () => chart.dispatchAction({ type: 'timelinePlayChange', playState: false }));
    button(bar, 'Play', () => chart.dispatchAction({ type: 'timelinePlayChange', playState: true }));
    button(bar, 'Jump to 2022', () => chart.dispatchAction({ type: 'timelineChange', currentIndex: 3 }));
  }

  return () => dispose();
};

export default mount;
