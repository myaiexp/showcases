// lineY curve option: d3Curve wraps d3-shape curve factories
import { curveBasis, curveLinear, curveMonotoneX, curveNatural, curveStep } from 'd3-shape';
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { week: 1, signups: 12 },
  { week: 2, signups: 31 },
  { week: 3, signups: 18 },
  { week: 4, signups: 44 },
  { week: 5, signups: 29 },
  { week: 6, signups: 52 },
];

const curves = [
  [d3Curve(curveLinear), 'curveLinear'],
  [d3Curve(curveMonotoneX), 'curveMonotoneX'],
  [d3Curve(curveNatural), 'curveNatural'],
  [d3Curve(curveStep), 'curveStep'],
  [d3Curve(curveBasis), 'curveBasis'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (curve: (typeof curves)[number][0]) =>
    defineChart({
      svgAnimation: true,
      marks: [lineY(rows, { x: 'week', y: 'signups', curve, points: true })],
      scales: {
        x: { scale: scaleLinear, axis: { label: 'Week' } },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(curves[0][0]), height: stage.height, initialWidth: 640, ariaLabel: 'One line drawn with different curves' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (i: number): void => {
    host.update({ ...options, definition: chart(curves[i]![0]) });
    stage.say(curves[i]![1]);
  };

  if (stage.bar) {
    select(stage.bar, 'curve', curves.map((c, i) => [i, c[1]] as const), show);
    stage.say('curveLinear');
  } else stage.cycle(curves.map((_, i) => i), 1800, show);
  return () => stage.dispose();
};

export default mount;
