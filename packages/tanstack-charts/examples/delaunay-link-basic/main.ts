// delaunayLink: edges between neighbouring points in a Delaunay triangulation of their screen positions
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { delaunayLink } from '@tanstack/charts/spatial/delaunay';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(50, 8);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot: each link joins neighbouring cars, hover its midpoint for the edge.' });

  const definition = defineChart({
    marks: [
      delaunayLink(rows, { x: 'weight', y: 'economy', key: 'id', stroke: '#94a3b8', strokeOpacity: 0.75, strokeWidth: 1 }),
      dot(rows, { x: 'weight', y: 'economy', key: 'id', r: 3, fillOpacity: 0.9 }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: { label: 'Weight (lb)' } },
      y: { scale: scaleLinear, nice: true, axis: { label: 'Economy (mpg)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Delaunay links between cars' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
