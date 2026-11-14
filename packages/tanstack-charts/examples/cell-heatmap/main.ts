// cell: a band-by-band grid shaded by a continuous colour channel
import { scaleLinear as d3Linear } from 'd3-scale';
import { cell, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(5);
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hours = ['9', '10', '11', '12', '13', '14', '15', '16'];
const rows = weekdays.flatMap((weekday, d) =>
  hours.map((hour, h) => ({ weekday, hour, calls: Math.round(10 + 30 * Math.exp(-(((h - 2.5 - d * 0.4) / 2.2) ** 2)) + random() * 8) })),
);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a cell for its call count.' });

  const chart = (gap: number) =>
    defineChart({
      svgAnimation: true,
      marks: [cell(rows, { x: 'hour', y: 'weekday', color: 'calls', inset: gap, radius: 3 })],
      scales: {
        x: { scale: () => scaleBand<string>(), axis: { label: 'Hour' } },
        y: { scale: () => scaleBand<string>() },
      },
      color: { scale: d3Linear, range: ['#1e293b', '#38bdf8', '#fde047'] },
      tooltip,
    });

  const options = { definition: chart(2), height: stage.height, initialWidth: 640, ariaLabel: 'Calls by weekday and hour' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (gap: number): void => host.update({ ...options, definition: chart(gap) });

  if (stage.bar) checkbox(stage.bar, 'no gap between cells', false, (on) => show(on ? 0 : 2));
  else {
    stage.cycle([2, 0], 2400, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
