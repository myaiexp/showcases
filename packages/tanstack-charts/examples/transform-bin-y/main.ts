// binY: bins on the vertical axis, drawn as horizontal bars
import { binY, defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { makeDots } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const dots = makeDots(300);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar for the count.' });

  const options = (thresholds: number) => ({
    definition: defineChart({
      marks: [rect(binY(dots, { value: 'y', thresholds }), { y1: 'y1', y2: 'y2', x1: () => 0, x2: 'value', fill: '#c084fc', inset: 0.5 })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Points' } },
        y: { scale: scaleLinear, nice: true, axis: { label: 'y' } },
      },
      tooltip,
    }),
    height: stage.height,
    ariaLabel: 'Horizontal histogram of y',
  });
  const host = stage.own(mountChart(stage.box, options(12)));
  if (stage.bar) slider(stage.bar, 'thresholds', 4, 40, 1, 12, (n) => host.update(options(n)));
  else {
    stage.cycle([6, 12, 24], 1800, (n) => host.update(options(n)));
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
