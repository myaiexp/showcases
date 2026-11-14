// stroke as [outer arc, end edge, inner arc, start edge] on custom arc marks
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const O = '#ff8a3d';
const G = '#2fb86b';
const B = '#9bb7ff';
const P = '#e5534b';
// Order of the array: outer arc, end edge, inner arc, start edge. false leaves a side unstroked.
const VARIANTS: { label: string; stroke: (string | false)[] }[] = [
  { label: '[outer]', stroke: [O, false, false, false] },
  { label: '[inner]', stroke: [false, false, G, false] },
  { label: '[start, end]', stroke: [false, B, false, B] },
  { label: '[outer, end, inner]', stroke: [O, P, G, false] },
];

interface Row extends SwatchRow {
  stroke: (string | false)[];
  sweep: number;
}

const mount: Mount = (el, ctx) => {
  const state = { sweep: 4.2 };
  const rows = (): Row[] => VARIANTS.map((v, i) => ({ i, label: v.label, stroke: v.stroke, sweep: state.sweep }));
  const bar = ctx.preview ? null : controlBar(el);
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
        customMark: ((cell, { preview }) => [
      {
        type: 'arc',
        dataId: 'cells',
        style: {
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).cy - (preview ? 0 : 10),
          innerRadius: (d: Row) => Math.min(cell(d).w, cell(d).h) * 0.2,
          outerRadius: (d: Row) => Math.min(cell(d).w, cell(d).h) * 0.42,
          startAngle: -Math.PI / 2,
          endAngle: (d: Row) => -Math.PI / 2 + d.sweep,
          fill: '#1d2a52',
          stroke: (d: Row) => d.stroke,
          lineWidth: 4,
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
    ...{ animationUpdate: { duration: 800, easing: 'linear' } },
      } as unknown as ISpec,
      { height: 260 },
    ),
    initialRows,
  );
  let t = 0;
  const set = (v: number): void => {
    state.sweep = v;
    chart.setRows(rows());
  };
  const stop = bar ? (): void => {} : every(900, () => set(2 + (++t % 4) * 1.2));
  if (bar) slider(bar, 'sweep (rad)', [0.8, 6.2, 0.1], state.sweep, set);
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
