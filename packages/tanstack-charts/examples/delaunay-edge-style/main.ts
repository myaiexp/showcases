// delaunayLink presentation callbacks read both endpoints of each edge
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { delaunayLink } from '@tanstack/charts/spatial/delaunay';
import type { Mount } from '@/types.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(60, 8);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = defineChart({
    marks: [
      delaunayLink(rows, {
        x: 'weight',
        y: 'economy',
        key: 'id',
        // source and target are the original rows, so an edge can compare its two ends.
        stroke: ({ source, target }) => (source.cylinders === target.cylinders ? '#60a5fa' : '#fb923c'),
        strokeWidth: ({ source, target }) => (source.cylinders === target.cylinders ? 1 : 2),
        strokeOpacity: ({ source, target }) => (source.cylinders === target.cylinders ? 0.55 : 0.9),
      }),
      dot(rows, { x: 'weight', y: 'economy', key: 'id', r: 2.5, fill: '#e5e7eb' }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true },
      y: { scale: scaleLinear, nice: true },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Delaunay links styled by endpoint' }));
  stage.say('Blue edges join cars with the same cylinder count; thicker orange edges cross between engine sizes.');
  return () => stage.dispose();
};

export default mount;
