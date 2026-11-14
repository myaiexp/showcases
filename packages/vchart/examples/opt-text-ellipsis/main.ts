// maxLineWidth with ellipsis strings and suffixPosition on custom text marks
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const TEXT = 'Quarterly revenue by sales region';
const VARIANTS: { label: string; ellipsis: boolean | string; pos: string }[] = [
  { label: "ellipsis '...', end", ellipsis: '...', pos: 'end' },
  { label: "ellipsis '…', end", ellipsis: '…', pos: 'end' },
  { label: "ellipsis ' etc.', end", ellipsis: ' etc.', pos: 'end' },
  { label: "ellipsis '...', middle", ellipsis: '...', pos: 'middle' },
  { label: "ellipsis '...', start", ellipsis: '...', pos: 'start' },
  { label: 'ellipsis false', ellipsis: false, pos: 'end' },
];

interface Row extends SwatchRow {
  ellipsis: boolean | string;
  pos: string;
  width: number;
}

const mount: Mount = (el, ctx) => {
  const state = { width: 150 };
  const rows = (): Row[] => VARIANTS.map((v, i) => ({ i, label: v.label, ellipsis: v.ellipsis, pos: v.pos, width: state.width }));
  const bar = ctx.preview ? null : controlBar(el);
  const initialRows = rows();
  const grid = swatchGrid<Row>(ctx, 1, initialRows.length);
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
          x: () => (preview ? 12 : 180),
          y: (d: Row) => cell(d).cy - 12,
          width: (d: Row) => d.width,
          height: 24,
          fill: false,
          stroke: '#4d7cff',
          lineDash: [3, 3],
          lineWidth: 1,
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          text: TEXT,
          x: () => (preview ? 12 : 180),
          y: (d: Row) => cell(d).cy,
          textAlign: 'left',
          textBaseline: 'middle',
          fontSize: 14,
          fill: '#ffd93d',
          maxLineWidth: (d: Row) => d.width,
          ellipsis: (d: Row) => d.ellipsis,
          suffixPosition: (d: Row) => d.pos,
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => d.label,
          x: () => 14,
          y: (d: Row) => cell(d).cy,
          textAlign: 'left',
          textBaseline: 'middle',
          fontSize: 12,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
      } as unknown as ISpec,
      { height: 320 },
    ),
    initialRows,
  );
  let t = 0;
  const set = (v: number): void => {
    state.width = v;
    chart.setRows(rows());
  };
  const stop = bar ? (): void => {} : every(900, () => set(60 + (++t % 6) * 28));
  if (bar) slider(bar, 'maxLineWidth', [30, 320, 5], state.width, set);
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
