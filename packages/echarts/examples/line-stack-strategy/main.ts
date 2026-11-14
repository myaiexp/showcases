// stackStrategy (samesign / all / positive / negative) and stackOrder on series with mixed signs
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

const cats = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const series = [
  { name: 'North', data: [12, -5, 9, -12, 6, 10, -4] },
  { name: 'South', data: [-6, 8, 5, 7, -9, 4, 8] },
  { name: 'East', data: [5, 6, -7, 5, 8, -3, -6] },
];

type Strategy = 'samesign' | 'all' | 'positive' | 'negative';
type Order = 'seriesAsc' | 'seriesDesc';

function build(strategy: Strategy, order: Order, preview: boolean): EChartsOption {
  return {
    title: { text: `stackStrategy: '${strategy}'  stackOrder: '${order}'`, left: 'center', top: 0, textStyle: { fontSize: 13 } },
    tooltip: { trigger: 'axis' },
    legend: preview ? { show: false } : {},
    // ECharts 6 puts the legend at the bottom by default; the grid leaves room for it.
    grid: { top: 36, left: 40, right: 16, bottom: preview ? 24 : 60 },
    xAxis: { type: 'category', data: cats, boundaryGap: false },
    yAxis: { type: 'value', min: -30, max: 30 },
    series: series.map((s) => ({
      name: s.name,
      type: 'line' as const,
      data: s.data,
      // Same stack name stacks the series. stackStrategy decides which values are added to the
      // running total; stackOrder (6.0.0) decides the order. Set stackOrder on every series
      // of the stack, so hiding one through the legend does not reshuffle the rest.
      stack: 'total',
      stackStrategy: strategy,
      stackOrder: order,
      areaStyle: { opacity: 0.45 },
      symbolSize: 6,
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let strategy: Strategy = 'samesign';
  let order: Order = 'seriesAsc';
  const show = (): void => {
    chart.setOption(build(strategy, order, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const all: Strategy[] = ['samesign', 'all', 'positive', 'negative'];
    let n = 0;
    stop = every(1800, () => {
      n += 1;
      strategy = all[n % 4]!;
      order = n % 8 >= 4 ? 'seriesDesc' : 'seriesAsc';
      show();
    });
  } else {
    select(bar!, 'stackStrategy', ['samesign', 'all', 'positive', 'negative'], (v) => {
      strategy = v as Strategy;
      show();
    });
    select(bar!, 'stackOrder', ['seriesAsc', 'seriesDesc'], (v) => {
      order = v as Order;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
