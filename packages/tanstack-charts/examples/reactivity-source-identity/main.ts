// Source identity: an in-place edit is invisible, a new source array re-runs the transform
import { barY, defineChart, groupBy, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The first button edits a derived row and nothing redraws. The second hands the transform a new source.' });

  let source = quarters.map((r) => ({ ...r }));
  let totals = groupBy(source, { by: 'quarter', outputs: { total: { value: 'revenue', reduce: 'sum' } } });
  const options = () => ({
    definition: defineChart({
      marks: [barY(totals, { x: 'quarter', y: 'total', fill: '#60a5fa' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.25) }, y: { scale: scaleLinear().domain([0, 160]), grid: true } },
    }),
    height: stage.height,
    ariaLabel: 'Revenue per quarter',
  });
  const host = stage.own(mountChart(stage.box, options()));

  const rebuild = (rows: typeof source): void => {
    source = rows;
    totals = groupBy(source, { by: 'quarter', outputs: { total: { value: 'revenue', reduce: 'sum' } } });
    host.update(options());
  };
  const mutate = (): void => {
    // Edits the result of the transform and does not tell the chart: nothing redraws by itself.
    (totals[0] as { total: number }).total += 40;
    stage.say(`totals[0].total is now ${totals[0]!.total}, but the chart was not told: it still shows the old bar.`);
  };
  const replace = (): void => {
    rebuild(source.map((r) => (r.quarter === 'Q1' ? { ...r, revenue: r.revenue + 20 } : r)));
    stage.say(`new source array, transform re-run: Q1 total = ${totals[0]!.total}`);
  };
  const reset = (): void => {
    rebuild(quarters.map((r) => ({ ...r })));
    stage.say('back to the original rows');
  };
  if (stage.bar) {
    button(stage.bar, 'Mutate a derived row', mutate);
    button(stage.bar, 'Replace the source', replace);
    button(stage.bar, 'Reset', reset);
  } else {
    stage.cycle([reset, replace, replace, replace], 1500, (go) => go());
  }
  return () => stage.dispose();
};

export default mount;
