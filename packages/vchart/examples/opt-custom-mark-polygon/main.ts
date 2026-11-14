// customMark { type: 'polygon' }: regular polygons and a star from point lists
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const SHAPES = [
  { label: 'triangle', n: 3, star: false },
  { label: 'square', n: 4, star: false },
  { label: 'pentagon', n: 5, star: false },
  { label: 'hexagon', n: 6, star: false },
  { label: 'star', n: 5, star: true },
  { label: 'octagon star', n: 8, star: true },
];
const COLORS = ['#4d7cff', '#2fb86b', '#ffd93d', '#ff8a3d', '#e5534b', '#b07cff'];

interface Row extends SwatchRow {
  n: number;
  star: boolean;
  turn: number;
}

const mount: Mount = (el, ctx) => {
  const rows = (turn: number): Row[] => SHAPES.map((s, i) => ({ i, label: s.label, n: s.n, star: s.star, turn }));
  const initialRows = rows(0);
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
        type: 'polygon',
        dataId: 'cells',
        style: {
          // points is an array of { x, y } in canvas pixels, around the cell centre.
          points: (d: Row) => {
            const c = cell(d);
            const R = Math.min(c.w, c.h) * 0.36;
            const count = d.star ? d.n * 2 : d.n;
            return Array.from({ length: count }, (_, k) => {
              const a = -Math.PI / 2 + d.turn + (k / count) * Math.PI * 2;
              const rad = d.star && k % 2 === 1 ? R * 0.45 : R;
              return { x: c.cx + Math.cos(a) * rad, y: c.cy - (preview ? 0 : 8) + Math.sin(a) * rad };
            });
          },
          fill: (d: Row) => COLORS[d.i % COLORS.length],
          fillOpacity: 0.85,
          stroke: '#ffffff',
          lineWidth: 1.5,
          lineJoin: 'round',
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => d.label,
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).y0 + cell(d).h - 10,
          textAlign: 'center',
          fontSize: 12,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
    ...{ animationUpdate: { duration: 400, easing: 'linear' } },
      } as unknown as ISpec,
      { height: 300 },
    ),
    initialRows,
  );
  let t = 0;
  const stop = every(400, () => chart.setRows(rows((t += 0.15))));
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
