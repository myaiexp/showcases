// customMark animation: animation, animationAppear/Enter/Update/Exit, with a dataKey so rows keep their rect
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const POOL = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const COLORS = ['#4d7cff', '#2fb86b', '#ffd93d', '#ff8a3d', '#e5534b', '#b07cff', '#9bb7ff', '#8fe3b0'];

interface Row extends SwatchRow {
  value: number;
  color: string;
}

const mount: Mount = (el, ctx) => {
  const r = rng(61);
  // A random subset of the pool, in pool order: some rows stay, some enter, some leave.
  const frame = (): Row[] => {
    const keep = POOL.filter(() => r() > 0.35);
    const ids = keep.length >= 3 ? keep : POOL.slice(0, 4);
    return ids.map((label, i) => ({ i, label, value: Math.round(30 + r() * 70), color: COLORS[POOL.indexOf(label)] ?? '#fff' }));
  };
  const initialRows = frame();
  const grid = swatchGrid<Row>(ctx, POOL.length, initialRows.length);
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
        dataKey: 'label',
        animation: true,
        animationAppear: { duration: 900, easing: 'cubicOut' },
        animationEnter: { duration: 600, delay: 250, easing: 'backOut' },
        animationUpdate: { duration: 900, easing: 'cubicInOut' },
        animationExit: { duration: 400, easing: 'cubicIn' },
        style: {
          x: (d: Row) => cell(d).x0 + 6,
          y: (d: Row) => cell(d).y0 + cell(d).h * (1 - d.value / 100),
          width: (d: Row) => cell(d).w - 12,
          height: (d: Row) => cell(d).h * (d.value / 100),
          cornerRadius: 6,
          fill: (d: Row) => d.color,
        },
      },
    ])(cell),
      } as unknown as ISpec,
      { height: 300 },
    ),
    initialRows,
  );
  const stop = every(2400, () => chart.setRows(frame()));
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
