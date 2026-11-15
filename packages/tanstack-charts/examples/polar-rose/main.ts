// radialBarRadius: a rose chart, one wedge per month whose length is the value
import { defineChart, mountChart } from '@tanstack/charts';
import { angleGrid, polar, radialBarRadius, radialGrid } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleBand, scaleSqrt } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { months } from '../../shared/marks2-months.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a wedge for the month. Radius uses a square-root scale so area tracks value.' });
  let padding = 0.08;

  const build = () =>
    defineChart({
      svgAnimation: true,
      marks: [
        polar({
          guides: [radialGrid({ ticks: 4, stroke: 'currentColor', strokeOpacity: 0.15, labels: true, labelFill: 'currentColor' }), angleGrid({ stroke: 'currentColor', strokeOpacity: 0.15 })],
          radiusRatio: 0.86,
          marks: [radialBarRadius(months, { angle: 'month', radius: 'rain', color: 'season', cornerRadius: 3 })],
          scales: {
            // The band scale's padding is the gap between wedges.
            angle: { scale: () => scaleBand<string>().paddingInner(padding) },
            radius: { scale: scaleSqrt().domain([0, 100]) },
          },
        }),
      ],
      scales: { x: null, y: null },
      tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.month}: ${point.datum.rain} mm`,
    },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Rose chart of monthly rainfall' });
  const host = stage.own(mountChart(stage.box, options()));
  if (stage.bar) slider(stage.bar, 'wedge gap', 0, 0.6, 0.02, padding, (x) => { padding = x; host.update(options()); }, (x) => x.toFixed(2));
  else {
    stage.cycle([0.08, 0.4, 0.02], 1800, (p) => { padding = p; host.update(options()); });
    stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  }
  return () => stage.dispose();
};

export default mount;
