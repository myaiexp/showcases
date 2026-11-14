// differenceY on a log scale: the crossing is exact because both scales must invert
import { scaleLog } from 'd3-scale';
import { defineChart, mountChart } from '@tanstack/charts';
import { differenceY } from '@tanstack/charts/difference';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = Array.from({ length: 12 }, (_, i) => ({
  year: 2012 + i,
  hardware: Math.round(900 * Math.exp(-0.28 * i)),
  software: Math.round(8 * Math.exp(0.38 * i)),
}));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (log: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [differenceY(rows, { x: 'year', y1: 'hardware', y2: 'software', fillOpacity: 0.3, points: true })],
      scales: {
        x: { scale: scaleLinear, axis: { label: 'Year' } },
        y: { scale: log ? scaleLog : scaleLinear, nice: true, grid: true, axis: { label: log ? 'Revenue (log)' : 'Revenue' } },
      },
    });

  const options = { definition: chart(true), height: stage.height, initialWidth: 640, ariaLabel: 'Hardware against software revenue' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (log: boolean): void => host.update({ ...options, definition: chart(log) });

  if (stage.bar) select(stage.bar, 'y scale', [[true, 'log'], [false, 'linear']] as const, show);
  else stage.cycle([true, false], 2500, show);
  return () => stage.dispose();
};

export default mount;
