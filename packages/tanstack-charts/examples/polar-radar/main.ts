// Radar chart: a point angle scale, a closed radialArea and radialLine, with polygon rings and spokes
import { defineChart, mountChart } from '@tanstack/charts';
import { scalePoint } from '@tanstack/charts/scales/point';
import { angleGrid, polar, radialArea, radialDot, radialGrid, radialLine } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { curveLinearClosed } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const skills = [
  { skill: 'Speed', score: 82 },
  { skill: 'Power', score: 64 },
  { skill: 'Skill', score: 91 },
  { skill: 'Defense', score: 48 },
  { skill: 'Stamina', score: 73 },
  { skill: 'Vision', score: 86 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a corner for its score.' });

  const definition = defineChart({
    marks: [
      polar({
        // Guides: rings first (background), then the spokes with labels around the edge.
        guides: [radialGrid({ shape: 'polygon', ticks: 4, stroke: 'currentColor', strokeOpacity: 0.2, labels: false }), angleGrid({ stroke: 'currentColor', strokeOpacity: 0.2 })],
        marks: [
          // A closed curve joins the last point back to the first.
          radialArea(skills, { angle: 'skill', radius: 'score', curve: curveLinearClosed, fill: '#60a5fa', fillOpacity: 0.3, stroke: '#60a5fa', strokeWidth: 2 }),
          radialLine(skills, { angle: 'skill', radius: 'score', curve: curveLinearClosed, stroke: '#60a5fa', strokeWidth: 0 }),
          radialDot(skills, { angle: 'skill', radius: 'score', r: 4, fill: '#60a5fa' }),
        ],
        radiusRatio: 0.82,
        scales: {
          angle: { scale: () => scalePoint<string>() },
          radius: { scale: scaleLinear().domain([0, 100]) },
        },
      }),
    ],
    scales: { x: null, y: null },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Radar chart of six skills' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;
