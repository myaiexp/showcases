// whiteSpace: 'normal' plus wordBreak modes on a Latin and a CJK sample
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const SAMPLES = ['Internationalization of the supercalifragilistic strings', '图表库支持多种文本换行方式，长中文句子也可以自动换行'];
const MODES: { label: string; whiteSpace: string; wordBreak: string }[] = [
  { label: 'no-wrap', whiteSpace: 'no-wrap', wordBreak: 'break-word' },
  { label: 'normal + break-word', whiteSpace: 'normal', wordBreak: 'break-word' },
  { label: 'normal + break-all', whiteSpace: 'normal', wordBreak: 'break-all' },
  { label: 'normal + keep-all', whiteSpace: 'normal', wordBreak: 'keep-all' },
];

interface Row extends SwatchRow {
  text: string;
  whiteSpace: string;
  wordBreak: string;
  width: number;
}

const mount: Mount = (el, ctx) => {
  const state = { width: 150 };
  const rows = (): Row[] =>
    SAMPLES.flatMap((text, s) =>
      MODES.map((m, k) => ({ i: s * MODES.length + k, label: m.label, text, whiteSpace: m.whiteSpace, wordBreak: m.wordBreak, width: state.width })),
    );
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
        type: 'rect',
        dataId: 'cells',
        style: {
          x: (d: Row) => cell(d).x0 + 6,
          y: (d: Row) => cell(d).y0 + (preview ? 6 : 24),
          width: (d: Row) => d.width,
          height: (d: Row) => cell(d).h - (preview ? 12 : 40),
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
          text: (d: Row) => d.text,
          x: (d: Row) => cell(d).x0 + 6,
          y: (d: Row) => cell(d).y0 + (preview ? 8 : 26),
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: preview ? 11 : 13,
          lineHeight: preview ? 14 : 18,
          fill: '#ffd93d',
          maxLineWidth: (d: Row) => d.width,
          whiteSpace: (d: Row) => d.whiteSpace,
          wordBreak: (d: Row) => d.wordBreak,
          ellipsis: false,
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => d.label,
          x: (d: Row) => cell(d).x0 + 6,
          y: (d: Row) => cell(d).y0 + 4,
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 11,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
      } as unknown as ISpec,
      { height: 340 },
    ),
    initialRows,
  );
  let t = 0;
  const set = (v: number): void => {
    state.width = v;
    chart.setRows(rows());
  };
  const stop = bar ? (): void => {} : every(1000, () => set(80 + (++t % 5) * 25));
  if (bar) slider(bar, 'maxLineWidth', [40, 220, 5], state.width, set);
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
