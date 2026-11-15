// Named polar scales: a second radius scale bound to one mark through radiusScale
import { defineChart, mountChart } from '@tanstack/charts';
import { scalePoint } from '@tanstack/charts/scales/point';
import { angleGrid, polar, radialDot, radialGrid, radialLine } from '@tanstack/charts/polar';
import { curveLinearClosed } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Satisfaction is out of 100, tickets are counts up to 40: two units on one radar.
const metrics = [
  { metric: 'Speed', satisfaction: 78, tickets: 12 },
  { metric: 'Quality', satisfaction: 86, tickets: 8 },
  { metric: 'Price', satisfaction: 54, tickets: 31 },
  { metric: 'Support', satisfaction: 69, tickets: 22 },
  { metric: 'Docs', satisfaction: 61, tickets: 27 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Blue reads the default radius scale (0 to 100); amber reads the named tickets scale (0 to 40).' });

  const definition = defineChart({
    marks: [
      polar({
        guides: [radialGrid({ shape: 'polygon', ticks: 4, stroke: 'currentColor', strokeOpacity: 0.2, labels: false }), angleGrid({ stroke: 'currentColor', strokeOpacity: 0.2 })],
        radiusRatio: 0.82,
        marks: [
          radialLine(metrics, { angle: 'metric', radius: 'satisfaction', curve: curveLinearClosed, stroke: '#60a5fa', strokeWidth: 2 }),
          radialLine(metrics, { angle: 'metric', radius: 'tickets', radiusScale: 'tickets', curve: curveLinearClosed, stroke: '#fbbf24', strokeWidth: 2, strokeDasharray: '5 3' }),
          radialDot(metrics, { angle: 'metric', radius: 'tickets', radiusScale: 'tickets', r: 3.5, fill: '#fbbf24' }),
        ],
        scales: {
          angle: { scale: () => scalePoint<string>() },
          radius: { scale: scaleLinear().domain([0, 100]) },
          // An extra entry declares its channel, then marks opt in by id.
          tickets: { channel: 'radius', scale: scaleLinear().domain([0, 40]) },
        },
      }),
    ],
    scales: { x: null, y: null },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Radar chart with two radius scales' }));
  return () => stage.dispose();
};

export default mount;
