// dot with layout: dodgeY(): a beeswarm along x, no y scale
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { dodgeY } from '@tanstack/charts/dodge';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { readings } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = readings(45).map((r, i) => ({ ...r, id: i }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot for its row.' });

  const definition = defineChart({
    marks: [dot(rows, { x: 'mass', key: 'id', color: 'species', r: 3.5, fillOpacity: 0.8, layout: dodgeY({ anchor: 'middle', padding: 1 }) })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Body mass (g)' } },
      y: null,
    },
    color: { legend: colorLegend() },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Body mass of each bird as a beeswarm' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
