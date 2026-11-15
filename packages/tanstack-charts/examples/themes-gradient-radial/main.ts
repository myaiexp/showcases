// A radial gradient fill on dots: type radial, with the focus moved off-centre
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { scatter } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(8, 24);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the focus: fx and fy shift the bright spot inside every bubble.' });
  const build = (focus: number) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', r: 14, fill: 'url(#orb)' })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      gradients: [
        {
          id: 'orb',
          type: 'radial',
          cx: 0.5,
          cy: 0.5,
          r: 0.5,
          fx: focus,
          fy: focus,
          stops: [
            { offset: 0, color: '#fef9c3', opacity: 1 },
            { offset: 0.6, color: '#f97316', opacity: 0.9 },
            { offset: 1, color: '#b91c1c', opacity: 0.3 },
          ],
        },
      ],
    });
  const options = (focus: number) => ({ definition: build(focus), height: stage.height, idPrefix: stage.id(), ariaLabel: 'Bubbles with a radial gradient' });
  const host = stage.own(mountChart(stage.box, options(0.35)));
  if (stage.bar) slider(stage.bar, 'focus', 0.1, 0.9, 0.05, 0.35, (v) => host.update(options(v)), (v) => v.toFixed(2));
  else stage.cycle([0.3, 0.7], 1800, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
