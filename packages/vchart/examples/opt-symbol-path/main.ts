// symbolType as an SVG path string, scaled to the symbol's size
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

// Paths are drawn in a 0..100 box; symbolType takes the string as it is.
const SHAPES = [
  { label: 'heart', path: 'M50 90 C10 60 0 35 15 18 C30 2 46 10 50 25 C54 10 70 2 85 18 C100 35 90 60 50 90 Z', fill: '#e5534b' },
  { label: 'bolt', path: 'M60 0 L15 55 L45 55 L35 100 L85 40 L55 40 Z', fill: '#ffd93d' },
  { label: 'house', path: 'M50 5 L95 45 L82 45 L82 95 L58 95 L58 65 L42 65 L42 95 L18 95 L18 45 L5 45 Z', fill: '#4d7cff' },
  { label: 'drop', path: 'M50 0 C50 0 90 45 90 65 A40 35 0 0 1 10 65 C10 45 50 0 50 0 Z', fill: '#2fb86b' },
  { label: 'flag', path: 'M15 0 L25 0 L25 8 L90 8 L72 32 L90 56 L25 56 L25 100 L15 100 Z', fill: '#b07cff' },
];

interface Row extends SwatchRow {
  path: string;
  fill: string;
  scale: number;
}

const rows = (t: number): Row[] =>
  SHAPES.map((s, i) => ({ i, label: s.label, path: s.path, fill: s.fill, scale: 0.8 + 0.2 * Math.sin(t / 2 + i) }));

const mount: Mount = (el, ctx) => {
  const initialRows = rows(0);
  const grid = swatchGrid<Row>(ctx, 5, initialRows.length);
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
        type: 'symbol',
        dataId: 'cells',
        style: {
          symbolType: (d: Row) => d.path,
          size: (d: Row) => Math.min(cell(d).w, cell(d).h) * 0.42 * d.scale,
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).cy - (preview ? 0 : 14),
          fill: (d: Row) => d.fill,
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => d.label,
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).y0 + cell(d).h - 12,
          textAlign: 'center',
          fontSize: 12,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
    ...{ animationUpdate: { duration: 700, easing: 'linear' } },
      } as unknown as ISpec,
      { height: 220 },
    ),
    initialRows,
  );
  let t = 0;
  const stop = every(700, () => chart.setRows(rows((t += 1))));
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
