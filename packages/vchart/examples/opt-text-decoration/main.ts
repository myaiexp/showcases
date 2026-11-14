// Text decoration and layout attributes, one per cell
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const COLORS = ['#ffd93d', '#8fe3b0', '#9bb7ff', '#ff8a3d', '#e5a5ff'];
const CELLS: { label: string; text: string | string[]; style: Record<string, unknown> }[] = [
  { label: 'underline', text: 'Underlined', style: { underline: true } },
  { label: 'lineThrough', text: 'Struck out', style: { lineThrough: true } },
  { label: "fontStyle 'italic'", text: 'Slanted', style: { fontStyle: 'italic' } },
  { label: "fontWeight 'bold'", text: 'Heavy', style: { fontWeight: 'bold' } },
  { label: "direction 'vertical'", text: 'Vertical', style: { direction: 'vertical' } },
  { label: 'text array + lineHeight 22', text: ['first line', 'second line', 'third'], style: { lineHeight: 22 } },
];

interface Row extends SwatchRow {
  text: string | string[];
  style: Record<string, unknown>;
  tint: number;
}

const rows = (t: number): Row[] => CELLS.map((c, i) => ({ i, label: c.label, text: c.text, style: c.style, tint: (i + t) % COLORS.length }));

const mount: Mount = (el, ctx) => {
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
        customMark: ((cell, { preview }) => {
      const prop = (name: string) => (d: Row) => d.style[name];
      return [
        {
          type: 'text',
          dataId: 'cells',
          style: {
            text: (d: Row) => d.text,
            x: (d: Row) => cell(d).cx,
            y: (d: Row) => cell(d).cy - (preview ? 0 : 8),
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: preview ? 16 : 24,
            fill: (d: Row) => COLORS[d.tint],
            underline: prop('underline'),
            lineThrough: prop('lineThrough'),
            fontStyle: prop('fontStyle'),
            fontWeight: prop('fontWeight'),
            direction: prop('direction'),
            lineHeight: prop('lineHeight'),
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
            fontSize: 11,
            fill: '#8a8f9c',
          },
        },
      ];
    })(cell, { preview: ctx.preview }),
      } as unknown as ISpec,
      { height: 280 },
    ),
    initialRows,
  );
  let t = 0;
  const stop = every(1100, () => chart.setRows(rows(++t)));
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
