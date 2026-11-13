// One dataset table read by column or by row through series.seriesLayoutBy, or both on two grids
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

type Mode = 'column' | 'row' | 'both (two grids)';

const table = [
  ['product', '2012', '2013', '2014', '2015'],
  ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
  ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
  ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4],
];

const jitter = (): (string | number)[][] => table.map((r, i) => (i === 0 ? r : r.map((v, j) => (j === 0 ? v : Math.round((v as number) * (0.7 + Math.random() * 0.6) * 10) / 10))));

function build(mode: Mode, source: (string | number)[][], preview: boolean): EChartsOption {
  const common = { tooltip: {}, legend: preview ? { show: false } : {}, dataset: { source } };
  if (mode === 'both (two grids)') {
    return {
      ...common,
      xAxis: [
        { type: 'category', gridIndex: 0 },
        { type: 'category', gridIndex: 1 },
      ],
      yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
      // legend sits at the bottom in 6; keep it clear of the lower grid.
      grid: [
        { top: 20, bottom: '58%', left: 40, right: 16 },
        { top: '50%', bottom: preview ? 24 : 56, left: 40, right: 16 },
      ],
      series: [
        // Upper grid: seriesLayoutBy 'row', one series per product row, categories are the years.
        ...[0, 1, 2].map(() => ({ type: 'bar' as const, seriesLayoutBy: 'row' as const, xAxisIndex: 0, yAxisIndex: 0 })),
        // Lower grid: 'column', one series per year column, categories are the products.
        ...[0, 1, 2, 3].map(() => ({ type: 'bar' as const, seriesLayoutBy: 'column' as const, xAxisIndex: 1, yAxisIndex: 1 })),
      ],
    };
  }
  const by = mode === 'row' ? 'row' : 'column';
  return {
    ...common,
    grid: { top: 24, left: 40, right: 16, bottom: preview ? 24 : 60 },
    xAxis: { type: 'category' },
    yAxis: {},
    // 'column' (default): 4 series, one per year column. 'row': 3 series, one per product row.
    series: Array.from({ length: by === 'row' ? 3 : 4 }, () => ({ type: 'bar' as const, seriesLayoutBy: by })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let mode: Mode = 'column';
  let source = table;
  const show = (): void => {
    // Series count differs between modes, so replace rather than merge.
    chart.setOption(build(mode, source, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const modes: Mode[] = ['column', 'row', 'both (two grids)'];
    let i = 0;
    stop = every(2200, () => {
      i++;
      mode = modes[i % modes.length]!;
      show();
    });
  } else {
    select(bar!, 'seriesLayoutBy', ['column', 'row', 'both (two grids)'], (v) => {
      mode = v as Mode;
      show();
    });
    const again = document.createElement('button');
    again.textContent = 'new numbers';
    again.addEventListener('click', () => {
      source = jitter();
      show();
    });
    bar!.append(again);
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
