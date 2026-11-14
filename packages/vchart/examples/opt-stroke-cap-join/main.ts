// lineCap and lineJoin on a zig-zag path mark
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const CAPS = ['butt', 'round', 'square'] as const;
const JOINS = ['miter', 'round', 'bevel'] as const;

interface Row extends SwatchRow {
  cap: string;
  join: string;
}

const rows = (): Row[] => CAPS.map((cap, i) => ({ i, label: `${cap} / ${JOINS[i]}`, cap, join: JOINS[i] as string }));

const mount: Mount = (el, ctx) => {
  const state = { width: 16, miter: 10 };
  const bar = ctx.preview ? null : controlBar(el);
  const initialRows = rows();
  const grid = swatchGrid<Row>(ctx, 3, initialRows.length);
  const cell = grid.cell;
  const chart = grid.attach(
    createChart(
      el,
      ctx,
      {
        // A bar chart with invisible bars and hidden axes is only the canvas; the custom marks bind to `cells`.
        type: 'bar',
        data: [
          { id: 'cells', values: initialRows },
          { id: 'blank', values: [{ k: 'a', v: 1 }] },
        ],
        dataId: 'blank',
        xField: 'k',
        yField: 'v',
        legends: { visible: false },
        tooltip: { visible: false },
        hover: false,
        select: false,
        axes: [
          { orient: 'left', visible: false },
          { orient: 'bottom', visible: false },
        ],
        bar: { style: { fillOpacity: 0, stroke: false } },
        customMark: ((cell, { preview }) => [
      {
        type: 'path',
        dataId: 'cells',
        style: {
          // A path mark is positioned by x/y; the path string is relative to that point.
          x: (d: Row) => cell(d).x0 + cell(d).w * 0.18,
          y: (d: Row) => cell(d).y0 + cell(d).h * 0.25,
          path: (d: Row) => {
            const w = cell(d).w * 0.64;
            const h = cell(d).h * 0.4;
            return `M0 ${h} L${w * 0.33} 0 L${w * 0.5} ${h * 0.9} L${w} 0`;
          },
          fill: false,
          stroke: '#ff8a3d',
          lineWidth: () => state.width,
          lineCap: (d: Row) => d.cap,
          lineJoin: (d: Row) => d.join,
          miterLimit: () => state.miter,
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => `lineCap ${d.cap}, lineJoin ${d.join}`,
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).y0 + cell(d).h * 0.85,
          textAlign: 'center',
          fontSize: 12,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
      } as unknown as ISpec,
      { height: 240 },
    ),
    initialRows,
  );
  const redraw = (): void => chart.setRows(rows());
  let t = 0;
  const stop = bar ? (): void => {} : every(700, () => {
    state.width = 6 + (++t % 5) * 5;
    redraw();
  });
  if (bar) {
    slider(bar, 'lineWidth', [2, 30, 1], state.width, (v) => {
      state.width = v;
      redraw();
    });
    slider(bar, 'miterLimit', [1, 10, 0.5], state.miter, (v) => {
      state.miter = v;
      redraw();
    });
  }
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
