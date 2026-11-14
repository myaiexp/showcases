// lineY with z: one line per series, optional points on every row
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { threeSeries } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = threeSeries(24);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a line: the tooltip shows the original row.' });

  const chart = (points: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [lineY(rows, { x: 'date', y: 'value', z: 'series', points })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Value' } },
      },
      tooltip,
    });

  const options = { definition: chart(stage.preview), height: stage.height, initialWidth: 640, ariaLabel: 'Three series as lines' };
  const host = stage.own(mountChart(stage.box, options));

  if (stage.bar) checkbox(stage.bar, 'points', false, (points) => host.update({ ...options, definition: chart(points) }));
  else stage.cycle([true, false], 2500, (points) => host.update({ ...options, definition: chart(points) }));
  return () => stage.dispose();
};

export default mount;
