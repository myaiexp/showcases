// grid gap, rowGap and columnGap on a 2 x 2 composition
import { barY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { composeViews, grid } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const totals = ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => ({ q, total: quarters.filter((r) => r.quarter === q).reduce((s, r) => s + r.revenue, 0) }));
const scales = { x: { scale: () => scaleBand<string>().padding(0.25), axis: false }, y: { scale: scaleLinear().domain([0, 110]), axis: false } } as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const gaps = { gap: 8, rowGap: 8, columnGap: 8 };

  const tile = (color: string, line = false) =>
    defineChart({ marks: [line ? lineY(totals, { x: 'q', y: 'total', stroke: color, strokeWidth: 3 }) : barY(totals, { x: 'q', y: 'total', fill: color })], scales, margin: 4 });
  const build = () =>
    composeViews({
      views: { a: tile('#60a5fa'), b: tile('#fbbf24', true), c: tile('#4ade80', true), d: tile('#c084fc') },
      layout: grid({
        rows: [{ id: 'top', grow: 1 }, { id: 'bottom', grow: 1 }],
        columns: [{ id: 'left', grow: 1 }, { id: 'right', grow: 1 }],
        ...gaps,
        cells: { a: { row: 'top', column: 'left' }, b: { row: 'top', column: 'right' }, c: { row: 'bottom', column: 'left' }, d: { row: 'bottom', column: 'right' } },
      }),
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Four tiles in a grid' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`rowGap ${gaps.rowGap}px, columnGap ${gaps.columnGap}px`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'rowGap', 0, 60, 2, 8, (v) => { gaps.rowGap = v; refresh(); }, (v) => `${v}px`);
    slider(stage.bar, 'columnGap', 0, 60, 2, 8, (v) => { gaps.columnGap = v; refresh(); }, (v) => `${v}px`);
  } else {
    stage.cycle([[8, 8], [30, 4], [4, 40], [0, 0]] as const, 1600, ([r, c]) => { gaps.rowGap = r; gaps.columnGap = c; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
