// dot: x/y scatter coloured by a categorical channel, fixed pixel radius
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { readings } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = readings(40);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot for its row; the slider sets r.' });

  const chart = (r: number) =>
    defineChart({
      marks: [dot(rows, { x: 'length', y: 'depth', color: 'species', r, fillOpacity: 0.7 })],
      scales: {
        x: { scale: scaleLinear, nice: true, axis: { label: 'Bill length (mm)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Bill depth (mm)' } },
      },
      color: { legend: colorLegend() },
      tooltip,
    });

  const options = { definition: chart(3.5), height: stage.height, initialWidth: 640, ariaLabel: 'Bill length against depth by species' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (r: number): void => host.update({ ...options, definition: chart(r) });

  if (stage.bar) slider(stage.bar, 'r', 1, 10, 0.5, 3.5, show, (v) => `${v}px`);
  else stage.ghost((t) => [0.2 + 0.6 * t, 0.2 + 0.6 * Math.sin(t * Math.PI)]);
  return () => stage.dispose();
};

export default mount;
