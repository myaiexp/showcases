// Stacked bars with positive and negative values: stackStrategy decides which values add up, stackOrder the order
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { MONTHS } from '../../shared/bar-data.ts';

const months = MONTHS.slice(0, 8);
// Income is positive, the other series are costs and refunds that dip below zero.
const series = [
  { name: 'Income', data: [120, 132, 101, 134, 90, 230, 210, 180] },
  { name: 'Costs', data: [-60, -82, -91, -74, -50, -110, -95, -70] },
  { name: 'Refunds', data: [-20, -10, 30, -25, 15, -35, 20, -15] },
  { name: 'Bonus', data: [30, 25, -10, 40, 35, -20, 45, 30] },
];
const STRATEGIES = ['samesign', 'all', 'positive', 'negative'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let strategy: (typeof STRATEGIES)[number] = 'samesign';
  let order: 'seriesAsc' | 'seriesDesc' = 'seriesAsc';

  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { show: !ctx.preview },
      grid: { top: 16, left: 44, right: 16, bottom: ctx.preview ? 28 : 60 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value' },
      title: ctx.preview
        ? { text: `stackStrategy: '${strategy}'`, left: 'center', top: 0, textStyle: { fontSize: 12, fontWeight: 'normal' } }
        : undefined,
      series: series.map((s) => ({
        name: s.name,
        type: 'bar',
        data: s.data,
        // Series sharing a stack name pile up on the same category.
        stack: 'total',
        // 'samesign' (default) only stacks values whose sign matches the running total;
        // 'all' adds everything; 'positive' / 'negative' stack only that sign.
        stackStrategy: strategy,
        // seriesDesc stacks in reverse series order. Set it on every series of the stack.
        stackOrder: order,
        emphasis: { focus: 'series' },
      })),
    });
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'stackStrategy', STRATEGIES, (v) => {
      strategy = v as typeof strategy;
      apply();
    });
    select(bar, 'stackOrder', ['seriesAsc', 'seriesDesc'], (v) => {
      order = v as typeof order;
      apply();
    });
  } else {
    let i = 0;
    stop = every(2000, () => {
      strategy = STRATEGIES[++i % STRATEGIES.length] ?? 'samesign';
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
