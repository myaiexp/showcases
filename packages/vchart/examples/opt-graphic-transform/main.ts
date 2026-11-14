// angle, scaleX/scaleY, scaleCenter and dx/dy on rect marks next to dashed originals
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

interface Row extends SwatchRow {
  attrs: Record<string, unknown>;
}

const mount: Mount = (el, ctx) => {
  const state = { v: 0.85 };
  const rows = (): Row[] => {
    const v = state.v;
    return [
      { i: 0, label: 'angle', attrs: { angle: v * Math.PI } },
      { i: 1, label: 'scaleX, scaleY', attrs: { scaleX: 0.5 + v, scaleY: 1.5 - v } },
      { i: 2, label: "scaleX + scaleCenter ['50%', '50%']", attrs: { scaleX: 0.4 + v * 1.2, scaleY: 0.4 + v * 1.2, scaleCenter: ['50%', '50%'] } },
      { i: 3, label: 'dx, dy', attrs: { dx: (v - 0.5) * 60, dy: (0.5 - v) * 40 } },
    ];
  };
  const bar = ctx.preview ? null : controlBar(el);
  const box = (d: Row, cell: (d: Row) => { cx: number; cy: number; w: number; h: number }) => {
    const c = cell(d);
    const w = Math.min(c.w * 0.4, 90);
    const h = w * 0.55;
    return { x: c.cx - w / 2, y: c.cy - h / 2 - (ctx.preview ? 0 : 8), w, h };
  };
  const initialRows = rows();
  const grid = swatchGrid<Row>(ctx, 4, initialRows.length);
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
        customMark: ((cell, { preview }) => {
      const a = (name: string, fallback: unknown) => (d: Row) => d.attrs[name] ?? fallback;
      return [
        {
          type: 'rect',
          dataId: 'cells',
          style: {
            x: (d: Row) => box(d, cell).x,
            y: (d: Row) => box(d, cell).y,
            width: (d: Row) => box(d, cell).w,
            height: (d: Row) => box(d, cell).h,
            fill: false,
            stroke: '#8a8f9c',
            lineDash: [4, 4],
            lineWidth: 1,
          },
        },
        {
          type: 'rect',
          dataId: 'cells',
          style: {
            x: (d: Row) => box(d, cell).x,
            y: (d: Row) => box(d, cell).y,
            width: (d: Row) => box(d, cell).w,
            height: (d: Row) => box(d, cell).h,
            fill: '#ff8a3d',
            fillOpacity: 0.8,
            angle: a('angle', 0),
            scaleX: a('scaleX', 1),
            scaleY: a('scaleY', 1),
            scaleCenter: a('scaleCenter', [0, 0]),
            dx: a('dx', 0),
            dy: a('dy', 0),
          },
        },
        {
          type: 'text',
          dataId: 'cells',
          style: {
            visible: !preview,
            text: (d: Row) => d.label,
            x: (d: Row) => cell(d).cx,
            y: (d: Row) => cell(d).y0 + cell(d).h - 14,
            textAlign: 'center',
            fontSize: 11,
            fill: '#8a8f9c',
          },
        },
      ];
    })(cell, { preview: ctx.preview }),
      } as unknown as ISpec,
      { height: 260 },
    ),
    initialRows,
  );
  const set = (v: number): void => {
    state.v = v;
    chart.setRows(rows());
  };
  let t = 0;
  const stop = bar ? (): void => {} : every(600, () => set(0.5 + 0.5 * Math.sin(++t / 2)));
  if (bar) slider(bar, 'value', [0, 1, 0.01], state.v, set);
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
