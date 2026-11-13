// One dataset feeding bars by column, bars by row, or a scatter through series.encode
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

// The first row holds the dimension names; ECharts detects that automatically.
const source = [
  ['product', '2015', '2016', '2017'],
  ['Matcha Latte', 43.3, 85.8, 93.7],
  ['Milk Tea', 83.1, 73.4, 55.1],
  ['Cheese Cocoa', 86.4, 65.2, 82.5],
  ['Walnut Brownie', 72.4, 53.9, 39.1],
];

const modes = ['seriesLayoutBy: column', 'seriesLayoutBy: row', 'encode: scatter'] as const;
type Mode = (typeof modes)[number];

function build(mode: Mode, preview: boolean): EChartsOption {
  const base: EChartsOption = {
    legend: preview ? { show: false } : {},
    tooltip: {},
    // ECharts 6 puts the legend at the bottom by default; the grid leaves room for it.
    grid: { top: preview ? 16 : 40, bottom: preview ? 24 : 60, left: 40, right: 16 },
    dataset: { source },
  };
  if (mode === 'encode: scatter') {
    // encode maps dimensions (by name or index) to channels: x, y, itemName, tooltip, ...
    return {
      ...base,
      xAxis: { type: 'value', name: '2015', min: 30 },
      yAxis: { type: 'value', name: '2017', min: 30 },
      series: [
        {
          type: 'scatter',
          symbolSize: 18,
          encode: { x: '2015', y: '2017', itemName: 'product', tooltip: ['product', '2015', '2017'] },
          label: { show: !preview, position: 'right', formatter: (p) => String((p.data as unknown[])[0]) },
        },
      ],
    };
  }
  // Default: each column (dimension) becomes a series and the first column is the category axis.
  // 'row': each row becomes a series, so the years become the categories instead.
  const layout = mode === 'seriesLayoutBy: row' ? 'row' : 'column';
  const count = layout === 'column' ? 3 : 4;
  return {
    ...base,
    xAxis: { type: 'category' },
    yAxis: {},
    series: Array.from({ length: count }, () => ({ type: 'bar' as const, seriesLayoutBy: layout })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  // notMerge: the series list changes shape between modes, so replace instead of merging.
  const show = (m: Mode): void => chart.setOption(build(m, ctx.preview), true);
  show('seriesLayoutBy: column');

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    stop = every(2200, () => {
      n = (n + 1) % modes.length;
      show(modes[n] ?? modes[0]);
    });
  } else {
    select(bar!, 'mapping', modes, (v) => show(v as Mode));
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
