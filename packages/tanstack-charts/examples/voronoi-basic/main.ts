// voronoi: the plot divided into the cell nearest to each point, with dots layered on top
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { voronoi } from '@tanstack/charts/spatial/voronoi';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(60, 8);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Cells are only paint: the dots above them carry the hover and tooltip.' });

  const definition = defineChart({
    marks: [
      voronoi(rows, { x: 'weight', y: 'economy', key: 'id', color: 'cylinders', fillOpacity: 0.14, stroke: '#fff', strokeOpacity: 0.5, strokeWidth: 1 }),
      dot(rows, { x: 'weight', y: 'economy', key: 'id', color: 'cylinders', r: 3 }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: { label: 'Weight (lb)' } },
      y: { scale: scaleLinear, nice: true, axis: { label: 'Economy (mpg)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Voronoi cells over a scatter' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
