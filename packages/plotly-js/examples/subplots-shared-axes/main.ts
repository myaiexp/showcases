// layout.grid.subplots names which x and y axes each cell uses, so cells can share them
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const ORDERS = ['bottom to top', 'top to bottom'] as const;

type Cell = 'xy' | 'x2y' | 'xy3' | 'x4y4';
const CELLS: Cell[][] = [['xy', 'x2y'], ['xy3', 'x4y4']];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [2, 3, 4], type: 'scatter', name: 'xy' },
      { x: [20, 30, 40], y: [5, 5, 5], xaxis: 'x2', yaxis: 'y', type: 'scatter', name: 'x2y' },
      { x: [2, 3, 4], y: [600, 700, 800], xaxis: 'x', yaxis: 'y3', type: 'scatter', name: 'xy3' },
      { x: [4000, 5000, 6000], y: [7000, 8000, 9000], xaxis: 'x4', yaxis: 'y4', type: 'scatter', name: 'x4y4' },
    ],
    {
      template: stage.template,
      showlegend: !stage.preview,
      // Cell (0,0) and (0,1) share y; cells (0,0) and (1,0) share x.
      // The typings flatten grid.subplots; the docs pass rows of cells.
      grid: { rows: 2, columns: 2, subplots: CELLS as never, roworder: 'bottom to top' },
    },
    stage.config,
  );

  const order = (o: string): void => void relayout(stage.div, { 'grid.roworder': o });
  if (stage.bar) select(stage.bar, 'grid.roworder', ORDERS, 'bottom to top', order);
  else stage.every(1800, (i) => order(ORDERS[i % 2]!));
  return () => stage.dispose();
};

export default mount;
