// layout.grid places subplots by rows, columns, pattern and roworder; the controls rebuild it
import Plotly from 'plotly.js';
import type { Data, Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const PATTERNS = ['independent', 'coupled'] as const;
const ORDERS = ['top to bottom', 'bottom to top'] as const;

interface Grid {
  rows: number;
  columns: number;
  pattern: (typeof PATTERNS)[number];
  roworder: (typeof ORDERS)[number];
  gap: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const state: Grid = { rows: 2, columns: 2, pattern: 'independent', roworder: 'top to bottom', gap: 0.1 };

  const figure = (g: Grid): { data: Data[]; layout: Partial<Layout> } => {
    const n = g.rows * g.columns;
    // independent: subplot i owns axes x{i+1}/y{i+1}. coupled: x per column, y per row.
    const data = Array.from({ length: n }, (_, i) => {
      const [col, row] = [i % g.columns, Math.floor(i / g.columns)];
      const [xa, ya] = g.pattern === 'independent' ? [i + 1, i + 1] : [col + 1, row + 1];
      return {
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: `trace ${i + 1}`,
        x: [1, 2, 3, 4],
        y: [1, 2, 3, 4].map((v) => v * (i + 1) * (1 + 0.3 * Math.sin(v + i))),
        xaxis: `x${xa}`,
        yaxis: `y${ya}`,
      };
    });
    return {
      data,
      layout: {
        template: stage.template,
        showlegend: !stage.preview,
        grid: { rows: g.rows, columns: g.columns, pattern: g.pattern, roworder: g.roworder, xgap: g.gap, ygap: g.gap },
      },
    };
  };
  const draw = (): Promise<unknown> => {
    const f = figure(state);
    return Plotly.newPlot(stage.div, f.data, f.layout, stage.config);
  };
  await draw();

  if (stage.bar) {
    const bar = stage.bar;
    slider(bar, 'grid.rows', [1, 4, 1], 2, (v) => { state.rows = v; void draw(); });
    slider(bar, 'grid.columns', [1, 4, 1], 2, (v) => { state.columns = v; void draw(); });
    select(bar, 'grid.pattern', PATTERNS, 'independent', (v) => { state.pattern = v; void draw(); });
    select(bar, 'grid.roworder', ORDERS, 'top to bottom', (v) => { state.roworder = v; void draw(); });
    slider(bar, 'grid.xgap / ygap', [0, 0.4, 0.02], 0.1, (v) => { state.gap = v; void draw(); });
  } else {
    const tour: Partial<Grid>[] = [{ rows: 1, columns: 2 }, { rows: 2, columns: 2 }, { rows: 3, columns: 1, roworder: 'bottom to top' }, { rows: 2, columns: 3, pattern: 'coupled', roworder: 'top to bottom' }];
    stage.every(1600, (i) => {
      Object.assign(state, tour[i % tour.length]);
      const f = figure(state);
      void Plotly.react(stage.div, f.data, f.layout, stage.config);
    });
  }
  return () => stage.dispose();
};

export default mount;
