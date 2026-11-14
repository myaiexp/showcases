// imageMode on four image marks that share one 160x80 canvas picture
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { wideImage } from '../../shared/opt-images.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const MODES = ['cover', 'contain', 'fill', 'auto'];
const POSITIONS = ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left', 'right'];

interface Row extends SwatchRow {
  mode: string;
  position: string;
  scale: number;
}

const mount: Mount = (el, ctx) => {
  const picture = wideImage();
  const state = { position: 'center', scale: 1 };
  const rows = (): Row[] => MODES.map((mode, i) => ({ i, label: mode, mode, position: state.position, scale: state.scale }));
  const bar = ctx.preview ? null : controlBar(el);
  const box = (c: { cx: number; cy: number; w: number }) => {
    const w = Math.min(c.w * 0.8, 150);
    return { x: c.cx - w / 2, w, h: w * 0.8 };
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
        customMark: ((cell, { preview }) => [
      {
        type: 'rect',
        dataId: 'cells',
        style: {
          x: (d: Row) => box(cell(d)).x,
          y: (d: Row) => cell(d).cy - box(cell(d)).h / 2 - (preview ? 0 : 8),
          width: (d: Row) => box(cell(d)).w,
          height: (d: Row) => box(cell(d)).h,
          fill: '#1d2a52',
          stroke: '#8a8f9c',
          lineDash: [4, 4],
          lineWidth: 1,
        },
      },
      {
        type: 'image',
        dataId: 'cells',
        style: {
          image: picture,
          x: (d: Row) => box(cell(d)).x,
          y: (d: Row) => cell(d).cy - box(cell(d)).h / 2 - (preview ? 0 : 8),
          width: (d: Row) => box(cell(d)).w,
          height: (d: Row) => box(cell(d)).h,
          repeatX: 'no-repeat',
          repeatY: 'no-repeat',
          imageMode: (d: Row) => d.mode,
          imagePosition: (d: Row) => d.position,
          imageScale: (d: Row) => d.scale,
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => `imageMode '${d.mode}'`,
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).y0 + cell(d).h - 12,
          textAlign: 'center',
          fontSize: 12,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
      } as unknown as ISpec,
      { height: 250 },
    ),
    initialRows,
  );
  const redraw = (): void => chart.setRows(rows());
  let t = 0;
  const stop = bar ? (): void => {} : every(1000, () => {
    state.position = POSITIONS[++t % POSITIONS.length] ?? 'center';
    redraw();
  });
  if (bar) {
    select(bar, 'imagePosition', POSITIONS, (v) => {
      state.position = v;
      redraw();
    });
    slider(bar, 'imageScale', [0.4, 2, 0.05], state.scale, (v) => {
      state.scale = v;
      redraw();
    });
  }
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
