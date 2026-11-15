// radius1 sets the baseline of radial bars: implicit physical zero, or a semantic baseline for signed values
import { defineChart, mountChart } from '@tanstack/charts';
import { angleGrid, polar, radialBarRadius, radialGrid } from '@tanstack/charts/polar';
import { scaleBand, scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const change = [
  ['Q1', 12], ['Q2', -8], ['Q3', 20], ['Q4', -15], ['Q5', 6], ['Q6', -3], ['Q7', 17], ['Q8', -11],
].map(([quarter, delta]) => ({ quarter: quarter as string, delta: delta as number }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (baseline: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [
        polar({
          guides: [radialGrid({ values: [-20, -10, 0, 10, 20], stroke: 'currentColor', strokeOpacity: 0.2, labels: false }), angleGrid({ stroke: 'currentColor', strokeOpacity: 0.15, labels: true })],
          radiusRatio: 0.88,
          marks: [
            // Without radius1 a bar starts at the center; with radius1: 0 both ends go through the scale.
            radialBarRadius(change, { angle: 'quarter', radius: 'delta', ...(baseline ? { radius1: 0 } : {}), color: (d) => (d.delta >= 0 ? 'gain' : 'loss') }),
          ],
          scales: {
            angle: { scale: () => scaleBand<string>().paddingInner(0.15) },
            radius: { scale: scaleLinear().domain([-20, 20]), range: [({ radius }) => radius * 0.15, ({ radius }) => radius] },
          },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = (b: boolean) => ({ definition: build(b), height: stage.height, ariaLabel: 'Signed radial bars' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (b: boolean): void => {
    host.update(options(b));
    stage.say(b ? 'radius1: 0 - gains grow out of the zero ring, losses grow inward.' : 'No radius1 - every bar starts at the physical center.');
  };
  if (stage.bar) checkbox(stage.bar, 'radius1: 0', true, show);
  else stage.cycle([true, false], 2200, show);
  return () => stage.dispose();
};

export default mount;
