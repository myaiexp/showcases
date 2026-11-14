// customMark { type: 'group', children }: a card per cell, children positioned inside the group
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';
import { rng } from '../../shared/components-data.ts';

const NAMES = ['CPU', 'Memory', 'Disk', 'Network', 'GPU', 'Cache'];

interface Row extends SwatchRow {
  value: number;
}

const mount: Mount = (el, ctx) => {
  const r = rng(5);
  const rows = (): Row[] => NAMES.map((label, i) => ({ i, label, value: Math.round(10 + r() * 90) }));
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
      ...[{ id: 'frame', values: [{ dx: 0, dy: 0 }] }],
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
        customMark: ((cell) => {
      const w = (d: Row) => cell(d).w - 16;
      const h = (d: Row) => cell(d).h - 16;
      // Children bind their own data (dataId); the group is one container, bound to the 'frame' dataset.
      const child = (type: string, style: Record<string, unknown>): unknown => ({ type, dataId: 'cells', style });
      return [
        {
          type: 'group',
          dataId: 'frame',
          style: { x: (f: { dx: number }) => f.dx, y: (f: { dy: number }) => f.dy },
          children: [
            child('rect', { x: (d: Row) => cell(d).x0 + 8, y: (d: Row) => cell(d).y0 + 8, width: w, height: h, cornerRadius: 8, fill: '#1d2a52', stroke: '#4d7cff', lineWidth: 1 }),
            child('rect', { x: (d: Row) => cell(d).x0 + 16, y: (d: Row) => cell(d).y0 + 8 + h(d) - 14, width: (d: Row) => ((w(d) - 16) * d.value) / 100, height: 6, cornerRadius: 3, fill: (d: Row) => (d.value > 70 ? '#e5534b' : '#2fb86b') }),
            child('symbol', { x: (d: Row) => cell(d).x0 + 26, y: (d: Row) => cell(d).y0 + 26, size: 12, symbolType: 'circle', fill: (d: Row) => (d.value > 70 ? '#e5534b' : '#2fb86b') }),
            child('text', { text: (d: Row) => d.label, x: (d: Row) => cell(d).x0 + 40, y: (d: Row) => cell(d).y0 + 26, textAlign: 'left', textBaseline: 'middle', fontSize: 12, fill: '#c9cdd6' }),
            child('text', { text: (d: Row) => `${d.value}%`, x: (d: Row) => cell(d).cx, y: (d: Row) => cell(d).cy, textAlign: 'center', textBaseline: 'middle', fontSize: 22, fontWeight: 'bold', fill: '#ffffff' }),
          ],
        },
      ];
    })(cell),
    ...{ animationUpdate: { duration: 600, easing: 'cubicOut' } },
      } as unknown as ISpec,
      { height: 280 },
    ),
    initialRows,
  );
  let t = 0;
  // Moving the one group moves every child; the values change at the same time.
  const stop = every(1000, () => {
    t++;
    chart.setData('frame', [{ dx: Math.round(Math.sin(t / 2) * 14), dy: Math.round(Math.cos(t / 2) * 8) }]);
    if (t % 2 === 0) chart.setRows(rows());
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
