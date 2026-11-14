// outerBorder and innerBorder on rect marks, with a distance slider
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

interface Row extends SwatchRow {
  kind: 'outer' | 'inner' | 'both';
}

const KINDS: Row['kind'][] = ['outer', 'inner', 'both'];
const rows = (): Row[] => KINDS.map((kind, i) => ({ i, label: kind, kind }));

const mount: Mount = (el, ctx) => {
  const state = { distance: 4 };
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
        type: 'rect',
        dataId: 'cells',
        style: {
          x: (d: Row) => cell(d).x0 + cell(d).w * 0.2,
          y: (d: Row) => cell(d).y0 + cell(d).h * 0.15,
          width: (d: Row) => cell(d).w * 0.6,
          height: (d: Row) => cell(d).h * 0.6,
          cornerRadius: 6,
          fill: '#2b3f77',
          stroke: '#4d7cff',
          lineWidth: 2,
          // Each border is a stroke of its own, drawn `distance` px away from the shape's edge.
          outerBorder: (d: Row) =>
            d.kind === 'inner' ? undefined : { stroke: '#ff8a3d', lineWidth: 2, distance: state.distance },
          innerBorder: (d: Row) =>
            d.kind === 'outer' ? undefined : { stroke: '#2fb86b', lineWidth: 2, distance: state.distance },
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => (d.kind === 'both' ? 'outerBorder + innerBorder' : `${d.kind}Border`),
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).y0 + cell(d).h * 0.9,
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
  let t = 0;
  const set = (v: number): void => {
    state.distance = v;
    chart.setRows(rows());
  };
  const stop = bar ? (): void => {} : every(700, () => set(2 + (++t % 6) * 2));
  if (bar) slider(bar, 'distance', [0, 14, 1], state.distance, set);
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
