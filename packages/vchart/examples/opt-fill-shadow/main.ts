// Shadow attributes of the fill style on rect marks
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const COLORS = ['#4d7cff', '#ff8a3d', '#2fb86b', '#e5534b'];

interface Row extends SwatchRow {
  fill: string;
  ox: number;
  oy: number;
}

const mount: Mount = (el, ctx) => {
  const state = { blur: 14, angle: 0 };
  const rows = (): Row[] =>
    COLORS.map((fill, i) => {
      const a = state.angle + (i * Math.PI) / 2;
      return { i, label: fill, fill, ox: Math.round(Math.cos(a) * 10), oy: Math.round(Math.sin(a) * 10) };
    });
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
        customMark: ((cell) => [
      {
        type: 'rect',
        dataId: 'cells',
        style: {
          x: (d: Row) => cell(d).x0 + cell(d).w * 0.2,
          y: (d: Row) => cell(d).y0 + cell(d).h * 0.2,
          width: (d: Row) => cell(d).w * 0.6,
          height: (d: Row) => cell(d).h * 0.6,
          cornerRadius: 8,
          fill: (d: Row) => d.fill,
          shadowColor: 'rgba(255, 255, 255, 0.55)',
          shadowBlur: () => state.blur,
          shadowOffsetX: (d: Row) => d.ox,
          shadowOffsetY: (d: Row) => d.oy,
        },
      },
    ])(cell),
    ...{ animationUpdate: { duration: 500, easing: 'linear' } },
      } as unknown as ISpec,
      { height: 240 },
    ),
    initialRows,
  );
  const redraw = (): void => chart.setRows(rows());
  const stop = bar ? (): void => {} : every(600, () => {
    state.angle += 0.5;
    redraw();
  });
  if (bar) {
    slider(bar, 'shadowBlur', [0, 40, 1], state.blur, (v) => {
      state.blur = v;
      redraw();
    });
    slider(bar, 'offset angle', [0, 6, 0.1], 0, (v) => {
      state.angle = v;
      redraw();
    });
  }
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
