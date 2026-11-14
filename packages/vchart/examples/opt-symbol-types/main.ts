// The built-in symbolType names drawn as custom symbol marks, one per grid cell
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const TYPES = [
  'circle', 'cross', 'diamond', 'square', 'arrow', 'arrow2Left', 'arrow2Right', 'wedge', 'thinTriangle', 'triangle',
  'triangleUp', 'triangleDown', 'triangleRight', 'triangleLeft', 'stroke', 'star', 'wye', 'rect', 'arrowLeft', 'arrowRight',
  'rectRound', 'roundLine',
];
const COLORS = ['#4d7cff', '#ff8a3d', '#2fb86b', '#e5534b', '#b07cff'];

interface Row extends SwatchRow {
  type: string;
  tint: number;
}

const rows = (tint: number): Row[] => TYPES.map((type, i) => ({ i, label: type, type, tint: (tint + i) % COLORS.length }));

const mount: Mount = (el, ctx) => {
  const state = { size: 30 };
  const bar = ctx.preview ? null : controlBar(el);
  const initialRows = rows(0);
  const grid = swatchGrid<Row>(ctx, ctx.preview ? 8 : 6, initialRows.length);
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
          // symbolType takes the built-in names above; size is the symbol's pixel size.
          symbolType: (d: Row) => d.type,
          size: () => (preview ? 16 : state.size),
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).cy - (preview ? 0 : 8),
          fill: (d: Row) => COLORS[d.tint],
          stroke: '#ffffff',
          lineWidth: 1,
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => d.type,
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).cy + 26,
          textAlign: 'center',
          textBaseline: 'middle',
          fontSize: 11,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
      } as unknown as ISpec,
      { height: 380, previewHeight: 200 },
    ),
    initialRows,
  );
  let t = 0;
  const stop = every(1400, () => chart.setRows(rows(++t)));
  if (bar) {
    slider(bar, 'size', [10, 44, 1], state.size, (v) => {
      state.size = v;
      chart.setRows(rows(t));
    });
  }
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
