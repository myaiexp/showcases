// A bi-directional bar in vertical and horizontal layouts, plus the guideline's counter-example
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const income = [120, 132, 101, 134, 190, 230, 210];
const outcome = [-80, -120, -50, -99, -140, -160, -75];
const answers = ['Price', 'Support', 'Speed', 'Design', 'Docs'];
const positive = [62, 71, 48, 80, 55];
const negative = [-21, -9, -34, -6, -28];

type Layout = 'vertical (income and outcome)' | 'horizontal (positive negative)' | 'counter-example: male and female';

function build(layout: Layout): EChartsOption {
  if (layout === 'counter-example: male and female') {
    // No opposition between the two series: the guideline prefers a plain grouped bar.
    return {
      tooltip: {}, legend: {},
      grid: { top: 24, left: 40, right: 16, bottom: 60 },
      xAxis: { type: 'category', data: ['2022', '2023', '2024'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Male', type: 'bar', data: [42, 47, 51] },
        { name: 'Female', type: 'bar', data: [39, 45, 53] },
      ],
    };
  }
  const horizontal = layout === 'horizontal (positive negative)';
  const cats = horizontal ? answers : days;
  const pos = horizontal ? positive : income;
  const neg = horizontal ? negative : outcome;
  const catAxis = {
    type: 'category' as const,
    data: cats,
    // Labels sit at the low end of the axis, so they never collide with the negative bars.
    axisLabel: { show: true },
    axisTick: { show: false },
  };
  const valAxis = { type: 'value' as const };
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {},
    grid: { top: 24, left: 56, right: 24, bottom: 60 },
    xAxis: horizontal ? valAxis : catAxis,
    yAxis: horizontal ? catAxis : valAxis,
    series: [
      // Same stack name: positive values grow one way, negative values the opposite way.
      { name: horizontal ? 'Positive' : 'Income', type: 'bar', stack: 'total', data: pos, itemStyle: { color: horizontal ? '#5470c6' : '#3ba272' } },
      { name: horizontal ? 'Negative' : 'Outcome', type: 'bar', stack: 'total', data: neg, itemStyle: { color: '#ee6666' } },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const layouts: Layout[] = ['vertical (income and outcome)', 'horizontal (positive negative)', 'counter-example: male and female'];
  const show = (layout: Layout): void => {
    chart.setOption(build(layout), true);
  };
  show(layouts[0]!);

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2200, () => {
      i += 1;
      show(layouts[i % 2]!);
    });
  } else {
    select(bar!, 'layout', layouts, (v) => show(v as Layout));
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
