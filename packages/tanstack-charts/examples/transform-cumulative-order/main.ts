// cumulative order: totals so far (ascending) against totals still to come (descending)
import { barY, cumulative, defineChart } from '@tanstack/charts';
import type { TransformOrder } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { changes } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const jobs = changes.map((c, i) => ({ step: c.step, order: i, hours: Math.abs(c.change) / 10 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (order: TransformOrder) => {
    const rows = cumulative(jobs, { orderBy: 'order', order, outputs: { hoursSoFar: { value: 'hours', reduce: 'sum' } } });
    return defineChart({
      marks: [barY(rows, { x: 'step', y: 'hoursSoFar', fill: order === 'ascending' ? '#60a5fa' : '#f87171' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: { scale: scaleLinear().domain([0, 36]), grid: true, axis: { label: 'Hours' } },
      },
    });
  };
  const states = [['ascending', 'ascending: hours done so far'], ['descending', 'descending: hours still to come, counted from the end']] as const;
  lab(stage, { label: 'order', ariaLabel: 'Cumulative hours per step', states, build, ms: 2400, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
