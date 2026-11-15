// grid tracks: { size } is fixed, { grow, min, max } shares what is left
import { barY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { composeViews, grid } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const totals = ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => ({ q, total: quarters.filter((r) => r.quarter === q).reduce((s, r) => s + r.revenue, 0) }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { rail: 120, max: 400 };

  const bars = (fillColor: string) =>
    defineChart({
      marks: [barY(totals, { x: 'q', y: 'total', fill: fillColor })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 110]), grid: true } },
      margin: 24,
    });
  const trend = defineChart({
    marks: [lineY(totals, { x: 'q', y: 'total', stroke: '#fbbf24', strokeWidth: 2.5, points: true })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 110]), grid: true } },
    margin: 24,
  });

  const build = () =>
    composeViews({
      views: { left: bars('#60a5fa'), main: trend, right: bars('#4ade80') },
      layout: grid({
        rows: [{ id: 'row', grow: 1 }],
        columns: [{ id: 'left', size: v.rail }, { id: 'main', grow: 1, max: v.max }, { id: 'right', size: v.rail }],
        gap: 8,
        cells: { left: { row: 'row', column: 'left' }, main: { row: 'row', column: 'main' }, right: { row: 'row', column: 'right' } },
      }),
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Three views in grid tracks' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`rails ${v.rail}px each, main track grow 1 with max ${v.max}px`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'rail size', 40, 260, 10, v.rail, (x) => { v.rail = x; refresh(); }, (x) => `${x}px`);
    slider(stage.bar, 'main max', 150, 700, 10, v.max, (x) => { v.max = x; refresh(); }, (x) => `${x}px`);
  } else {
    stage.cycle([[120, 400], [60, 250], [200, 500]] as const, 1800, ([r, m]) => { v.rail = r; v.max = m; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
