// lineY: rows with a null value end the segment and the next valid row starts a new one
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface Reading {
  hour: number;
  load: number | null;
}

const complete: Reading[] = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  load: Math.round(40 + 25 * Math.sin((hour - 6) / 3.8) + (hour % 5)),
}));
const holes = new Set([5, 6, 7, 14, 15, 20]);
const withGaps: Reading[] = complete.map((r) => (holes.has(r.hour) ? { ...r, load: null } : r));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box to replace the missing readings with values.' });

  const chart = (rows: Reading[]) =>
    defineChart({
      svgAnimation: true,
      marks: [lineY(rows, { x: 'hour', y: 'load', points: true })],
      scales: {
        x: { scale: scaleLinear, axis: { label: 'Hour of day' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Load' } },
      },
      tooltip,
    });

  const options = { definition: chart(withGaps), height: stage.height, initialWidth: 640, ariaLabel: 'Hourly load with missing readings' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (filled: boolean): void => host.update({ ...options, definition: chart(filled ? complete : withGaps) });

  if (stage.bar) checkbox(stage.bar, 'fill the gaps', false, show);
  else stage.cycle([false, true], 2500, show);
  return () => stage.dispose();
};

export default mount;
