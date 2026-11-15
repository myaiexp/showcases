// fold leaves null and NaN in the rows; removing them is a separate, visible step
import { defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { fold } from '@tanstack/charts/transform/fold';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

interface Wide {
  hour: number;
  north: number | null;
  south: number | null;
}
const wide: Wide[] = Array.from({ length: 16 }, (_, hour) => ({
  hour,
  north: hour === 5 || hour === 6 ? null : Math.round(40 + 20 * Math.sin(hour / 3)),
  south: hour === 10 ? Number.NaN : Math.round(30 + 15 * Math.cos(hour / 4)),
}));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both settings come from the same fold call; only the filter differs.' });
  const show = readoutPanel(stage);
  const folded = fold(wide, { fields: ['north', 'south'] as const, as: { key: 'site', value: 'load' } });

  const build = (drop: boolean) => {
    const rows = drop ? folded.filter((r) => Number.isFinite(r.load)) : folded;
    show(tableText(folded.filter((r) => !Number.isFinite(r.load)), ['hour', 'site', 'load'], 6) + `\n(rows with a missing load; ${rows.length} of ${folded.length} rows are drawn)`);
    return defineChart({
      marks: [lineY(rows, { x: 'hour', y: 'load', color: 'site', strokeWidth: 2, points: true })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear().domain([0, 70]), grid: true } },
    });
  };
  const states = [[false, 'keep missing rows (lines break)'], [true, 'filter them out (lines join)']] as const;
  lab(stage, { label: 'missing values', ariaLabel: 'Loads with missing readings', states, build, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
