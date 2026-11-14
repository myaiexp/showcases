// Grid geometry and data updates for cell-by-cell custom mark examples
import type { MountContext } from '@/types.ts';
import type { Chart } from './chart.ts';

export interface Cell {
  /** Cell centre and size, in canvas pixels. */
  cx: number;
  cy: number;
  w: number;
  h: number;
  x0: number;
  y0: number;
}

export interface SwatchRow {
  /** Cell index, 0-based, row by row. */
  i: number;
  label: string;
}

export interface Swatch<D extends SwatchRow> extends Chart {
  /** Replace the `cells` dataset (the datum shape the marks read). */
  setRows(rows: D[]): void;
  /** Replace another dataset by id. */
  setData(id: string, values: unknown[]): void;
}

export interface SwatchGrid<D extends SwatchRow> {
  /** The pixel box of a datum's cell; custom mark style callbacks draw in canvas pixels. */
  cell(d: D): Cell;
  /** Connects the grid to the chart built from the example's own spec and returns the data helpers. */
  attach(chart: Chart, rows: D[]): Swatch<D>;
}

/**
 * Lays `count` cells out in `cols` columns over the chart's canvas. The spec itself (the hidden
 * bar chart, the `cells` dataset and the custom marks) is written in each example's main.ts.
 */
export function swatchGrid<D extends SwatchRow>(ctx: MountContext, cols: number, count: number): SwatchGrid<D> {
  let ref: { getChart(): { getCanvasRect(): { width: number; height: number } } | null } | null = null;
  const rowsCount = Math.ceil(count / cols);
  return {
    cell(d) {
      const rect = ref?.getChart()?.getCanvasRect() ?? { width: 400, height: 300 };
      const m = ctx.preview ? 6 : 14;
      const w = (rect.width - 2 * m) / cols;
      const h = (rect.height - 2 * m) / rowsCount;
      const x0 = m + (d.i % cols) * w;
      const y0 = m + Math.floor(d.i / cols) * h;
      return { x0, y0, w, h, cx: x0 + w / 2, cy: y0 + h / 2 };
    },
    attach(chart, rows) {
      ref = chart.vchart as never;
      let alive = true;
      // The first render ran before the canvas size was readable: draw the cells again.
      void chart.vchart.updateData('cells', rows as never);
      return {
        ...chart,
        release() {
          alive = false;
          chart.release();
        },
        setRows(next) {
          if (alive) void chart.vchart.updateData('cells', next as never);
        },
        setData(id, values) {
          if (alive) void chart.vchart.updateData(id, values as never);
        },
      };
    },
  };
}
