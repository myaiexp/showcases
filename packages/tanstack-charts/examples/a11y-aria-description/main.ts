// ariaDescription: extra context goes into an SVG desc element
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { downloads } from '../../shared/style-data.ts';
import { describeSurface } from '../../shared/style-surface.ts';
import { createStage } from '../../shared/stage.ts';

const description = 'Values are seven-day totals. Missing weeks are rendered as gaps.';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the description and read the surface attributes below the chart.' });
  const readout = stage.bar ? stage.readout() : null;
  const definition = defineChart({
    marks: [lineY(downloads, { x: 'week', y: 'downloads', z: 'package', strokeWidth: 2.5 })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
  });
  const options = (described: boolean) => ({
    definition,
    height: stage.height,
    ariaLabel: 'Weekly downloads for three packages',
    ...(described ? { ariaDescription: description } : {}),
  });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (on: boolean): void => {
    host.update(options(on));
    if (readout) readout.textContent = describeSurface(stage.box);
    else stage.say(on ? `ariaDescription: ${description}` : 'no description');
  };
  show(true);
  if (stage.bar) checkbox(stage.bar, 'ariaDescription', true, show);
  else stage.cycle([true, false], 2200, show);
  return () => stage.dispose();
};

export default mount;
