// radialDot: a polar scatter where r reads a size field through rScale
import { defineChart, mountChart } from '@tanstack/charts';
import { angleGrid, polar, radialDot, radialGrid } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(61);
const spread = normal(random, 0, 0.35);
const rows = Array.from({ length: 70 }, (_, id) => {
  const group = id % 3;
  const bearing = ((group * 120 + 20 + spread() * 40 + 360) % 360);
  return { id, bearing, distance: Math.max(0.1, 0.55 + group * 0.12 + spread() * 0.3), mass: 1 + random() * 9, group: `Group ${group + 1}` };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Angle is a bearing in degrees, radius a distance, circle area a mass.' });

  const definition = defineChart({
    marks: [
      polar({
        guides: [radialGrid({ ticks: 4, stroke: 'currentColor', strokeOpacity: 0.15, labels: false }), angleGrid({ values: [0, 90, 180, 270], stroke: 'currentColor', strokeOpacity: 0.2, format: (v) => `${v} deg` })],
        radiusRatio: 0.85,
        marks: [radialDot(rows, { angle: 'bearing', radius: 'distance', key: 'id', color: 'group', r: 'mass', rScale: scaleSqrt().domain([0, 10]).range([2, 11]), fillOpacity: 0.65 })],
        scales: {
          angle: { scale: scaleLinear().domain([0, 360]) },
          radius: { scale: scaleLinear().domain([0, 1]) },
        },
      }),
    ],
    scales: { x: null, y: null },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Polar scatter plot of bearing and distance' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;
