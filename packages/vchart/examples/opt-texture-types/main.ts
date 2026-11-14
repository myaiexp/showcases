// All eight texture types, with sliders for textureSize and texturePadding
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const TEXTURES = ['circle', 'diamond', 'rect', 'vertical-line', 'horizontal-line', 'bias-lr', 'bias-rl', 'grid'];
const COLORS = ['#ffd93d', '#ff8a3d', '#8fe3b0', '#9bb7ff'];

interface Row extends SwatchRow {
  texture: string;
  tint: number;
}

const mount: Mount = (el, ctx) => {
  const state = { size: 8, padding: 2, shift: 0 };
  const rows = (): Row[] => TEXTURES.map((texture, i) => ({ i, label: texture, texture, tint: (i + state.shift) % COLORS.length }));
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
          x: (d: Row) => cell(d).x0 + cell(d).w * 0.12,
          y: (d: Row) => cell(d).y0 + cell(d).h * 0.1,
          width: (d: Row) => cell(d).w * 0.76,
          height: (d: Row) => cell(d).h * (preview ? 0.8 : 0.6),
          fill: '#1d2a52',
          stroke: '#4d7cff',
          lineWidth: 1,
          texture: (d: Row) => d.texture,
          textureColor: (d: Row) => COLORS[d.tint],
          textureSize: () => state.size,
          texturePadding: () => state.padding,
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => d.texture,
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).y0 + cell(d).h * 0.85,
          textAlign: 'center',
          fontSize: 12,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
      } as unknown as ISpec,
      { height: 300 },
    ),
    initialRows,
  );
  const redraw = (): void => chart.setRows(rows());
  const stop = bar ? (): void => {} : every(1200, () => {
    state.shift++;
    state.size = 5 + (state.shift % 4) * 2;
    redraw();
  });
  if (bar) {
    slider(bar, 'textureSize', [2, 20, 1], state.size, (v) => {
      state.size = v;
      redraw();
    });
    slider(bar, 'texturePadding', [0, 10, 1], state.padding, (v) => {
      state.padding = v;
      redraw();
    });
  }
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
