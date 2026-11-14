// The axis option: sides, grid and line on the implicit axes
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const xAxes = ['bottom', 'top', 'both', 'none'] as const;
const yAxes = ['left', 'right', 'both', 'none'] as const;
interface State {
  x: (typeof xAxes)[number];
  y: (typeof yAxes)[number];
  grid: boolean;
  line: boolean;
}

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot<State>(el, ctx, {
    initial: { x: 'bottom', y: 'left', grid: false, line: false },
    render: ({ x, y, grid, line }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { axis: x === 'none' ? null : x, grid, line },
        y: { axis: y === 'none' ? null : y, grid, line },
        marks: [Plot.lineY(gistemp, { x: 'Date', y: 'Anomaly' })],
      }),
    step: (_s, i) => ({ x: xAxes[i % 4], y: yAxes[i % 4], grid: i % 2 === 1, line: i % 4 >= 2 }),
    controls: (bar, live) => {
      select(bar, 'x axis ', xAxes, live.state.x, (x) => live.set({ x }));
      select(bar, 'y axis ', yAxes, live.state.y, (y) => live.set({ y }));
      toggle(bar, 'grid ', live.state.grid, (grid) => live.set({ grid }));
      toggle(bar, 'line ', live.state.line, (line) => live.set({ line }));
    },
  });
};

export default mount;
