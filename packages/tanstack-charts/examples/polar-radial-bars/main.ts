// radialBarAngle: concentric bars where each category is a ring and the value is an angle
import { defineChart, mountChart } from '@tanstack/charts';
import { polar, radialBarAngle } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleBand, scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const goals = [
  { name: 'Move', done: 84 },
  { name: 'Exercise', done: 61 },
  { name: 'Stand', done: 93 },
  { name: 'Sleep', done: 47 },
  { name: 'Read', done: 72 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each ring runs clockwise from the top; a full turn is 100%.' });

  const definition = defineChart({
    marks: [
      polar({
        marks: [radialBarAngle(goals, { radius: 'name', angle: 'done', color: 'name', cornerRadius: 'full' })],
        radiusRatio: 0.92,
        scales: {
          angle: { scale: scaleLinear().domain([0, 100]) },
          // Rings: a band scale on the radius channel. The inner range keeps the center open.
          radius: { scale: scaleBand<string>().paddingInner(0.25).domain(goals.map((g) => g.name).reverse()), range: [({ radius }) => radius * 0.25, ({ radius }) => radius] },
        },
      }),
    ],
    scales: { x: null, y: null },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.name}: ${point.datum.done}% of the goal`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Radial bars of five daily goals' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;
