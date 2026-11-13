// A matrix used as a page layout: grids, a pie and a funnel placed in its cells
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const rand = (lo: number, hi: number): number => Math.round(lo + Math.random() * (hi - lo));
const sample = (): number[] => months.map(() => rand(20, 90));

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx, { height: 520 });

  // matrix.x.length / y.length (6.1) give a headless 3×2 table: no header cells, just a
  // grid of body cells to lay things out in, like CSS grid.
  const matrix = {
    x: { length: 3, show: false },
    y: { length: 2, show: false },
    // Merged body cells span several columns or rows, addressed by locator ranges.
    body: {
      data: [
        { coord: [[0, 1], 0], mergeCells: true },
        { coord: [[0, 1], 1], mergeCells: true },
      ],
    },
    left: 8,
    right: 8,
    top: 8,
    bottom: 8,
  };

  const render = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      matrix,
      // A grid (cartesian2d) cannot take matrix data, but its box can sit in a cell:
      // coordinateSystem 'matrix' with coord naming the cell range.
      grid: [
        { coordinateSystem: 'matrix', coord: [[0, 1], 0], left: 36, right: 16, top: 20, bottom: 24 },
        { coordinateSystem: 'matrix', coord: [[0, 1], 1], left: 36, right: 16, top: 20, bottom: 24 },
      ],
      xAxis: [
        { type: 'category', data: months, gridIndex: 0 },
        { type: 'category', data: months, gridIndex: 1, boundaryGap: false },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, splitNumber: 3 },
        { type: 'value', gridIndex: 1, splitNumber: 3 },
      ],
      series: [
        { type: 'bar', xAxisIndex: 0, yAxisIndex: 0, data: sample() },
        { type: 'line', xAxisIndex: 1, yAxisIndex: 1, smooth: true, areaStyle: {}, data: sample() },
        // Pie and funnel lay out with coordinateSystemUsage 'box': the whole series goes
        // into the cell at `coord`, and their percentages are relative to that cell.
        {
          type: 'pie',
          coordinateSystem: 'matrix',
          coord: [2, 0],
          radius: ['35%', '70%'],
          label: { show: false },
          data: ['North', 'South', 'East', 'West'].map((name) => ({ name, value: rand(10, 50) })),
        },
        {
          type: 'funnel',
          coordinateSystem: 'matrix',
          coord: [2, 1],
          left: '12%',
          right: '12%',
          top: '10%',
          bottom: '10%',
          label: { show: !ctx.preview, position: 'inside' },
          data: ['Visit', 'Cart', 'Checkout', 'Paid'].map((name, i) => ({ name, value: 100 - i * 22 + rand(0, 8) })),
        },
      ],
    });
  };

  render();
  const stop = every(ctx.preview ? 2200 : 3000, render);

  return () => {
    stop();
    dispose();
  };
};

export default mount;
