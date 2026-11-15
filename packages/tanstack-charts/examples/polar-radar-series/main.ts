// A radar with two series and focusGroupAngle: the pointer snaps to a spoke and shows both series
import { defineChart, mountChart } from '@tanstack/charts';
import { scalePoint } from '@tanstack/charts/scales/point';
import { angleGrid, focusGroupAngle, polar, radialArea, radialDot, radialGrid } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { curveLinearClosed } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const axes = ['Speed', 'Power', 'Skill', 'Defense', 'Stamina', 'Vision'];
const scores = {
  Striker: [90, 70, 85, 35, 70, 80],
  Keeper: [45, 60, 55, 92, 66, 74],
};
const rows = Object.entries(scores).flatMap(([player, values]) => values.map((score, i) => ({ player, skill: axes[i]!, score })));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover anywhere: the nearest spoke is chosen by angle, and the tooltip lists both players.' });

  const base = defineChart({
    marks: [
      polar({
        guides: [radialGrid({ shape: 'polygon', ticks: 4, stroke: 'currentColor', strokeOpacity: 0.2, labels: false }), angleGrid({ stroke: 'currentColor', strokeOpacity: 0.2 })],
        radiusRatio: 0.82,
        marks: [
          radialArea(rows, { angle: 'skill', radius: 'score', z: 'player', color: 'player', curve: curveLinearClosed, fillOpacity: 0.18, strokeWidth: 2 }),
          radialDot(rows, { angle: 'skill', radius: 'score', z: 'player', color: 'player', key: (r) => `${r.player}-${r.skill}`, r: 3.5 }),
        ],
        scales: {
          angle: { scale: () => scalePoint<string>() },
          radius: { scale: scaleLinear().domain([0, 100]) },
        },
      }),
    ],
    scales: { x: null, y: null },
  });
  // The second argument adds options to an existing definition: pointer focus by angle, plus the tooltip.
  const definition = defineChart(base, { focus: focusGroupAngle, tooltip });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Radar chart comparing two players' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;
