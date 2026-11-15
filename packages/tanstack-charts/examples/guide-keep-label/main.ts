// thin.keep: a launch date that is not a tick candidate still gets its label, without a stub or grid line
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { days, rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const dates = days('2026-01-01', 120);
const values = walk(rng(14), 120, 60, 2);
const rows = dates.map((date, i) => ({ id: `d${i}`, date, value: values[i]! }));
const launch = new Date(Date.UTC(2026, 1, 17));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Turn keep off: the 17 Feb label disappears with it.' });
  const build = (keep: boolean) =>
    defineChart({
      marks: [lineY(rows, { x: 'date', y: 'value', stroke: '#facc15', strokeWidth: 2 })],
      scales: {
        x: {
          scale: scaleUtc,
          grid: true,
          axis: { ticks: { spacing: 80, size: 0 }, tickLabels: { rotate: -35, thin: { minGap: 8, priority: 'ends', keep: keep ? [launch] : [] } } },
        },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });
  const options = (keep: boolean) => ({ definition: build(keep), height: stage.height, ariaLabel: 'A value over 120 days' });
  const host = stage.own(mountChart(stage.box, options(true)));
  if (stage.bar) checkbox(stage.bar, 'keep the launch date', true, (v) => host.update(options(v)));
  else stage.cycle([true, false], 2000, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
