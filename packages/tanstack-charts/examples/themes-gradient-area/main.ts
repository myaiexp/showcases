// A linear gradient resource referenced from an area fill, with clip and idPrefix
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the top stop opacity: the gradient is rebuilt from the definition.' });
  const build = (top: number) =>
    defineChart({
      marks: [
        areaY(revenue, { x: 'month', y: 'revenue', fill: 'url(#revenue-fill)' }),
        lineY(revenue, { x: 'month', y: 'revenue', stroke: '#2563eb', strokeWidth: 2 }),
      ],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2) },
        y: { scale: scaleLinear, grid: true, axis: { label: 'Revenue (USD)' } },
      },
      gradients: [
        {
          id: 'revenue-fill',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0,
          stops: [
            { offset: 0, color: '#2563eb', opacity: 0.05 },
            { offset: 1, color: '#2563eb', opacity: top },
          ],
        },
      ],
      clip: true,
    });
  const options = (top: number) => ({ definition: build(top), height: stage.height, idPrefix: stage.id(), ariaLabel: 'Monthly revenue' });
  const host = stage.own(mountChart(stage.box, options(0.7)));
  if (stage.bar) slider(stage.bar, 'top opacity', 0.1, 1, 0.05, 0.7, (v) => host.update(options(v)), (v) => v.toFixed(2));
  else stage.cycle([0.8, 0.25], 1800, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
