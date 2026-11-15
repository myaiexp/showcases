// boxY: quartile boxes, whiskers and outliers from raw observations
import { boxY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = groupedObservations({ Adelie: [3700, 450, 60], Chinstrap: [3730, 380, 40], Gentoo: [5075, 500, 55], Mixed: [4300, 1100, 50] });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a box for its quartiles, or a dot for one outlier.' });

  const definition = defineChart({
    marks: [boxY(rows, { x: 'group', y: 'value', fill: '#60a5fa', fillOpacity: 0.35, stroke: '#60a5fa' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.4) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Body mass (g)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Body mass by species as boxplots' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
