// dot with layout: dodgeX(): the measured value is on y, x is generated
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { dodgeX } from '@tanstack/charts/dodge';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = groupedObservations({ latency: [180, 45, 140] }, 13).map((r, i) => ({ ...r, id: i }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot for its latency.' });

  const definition = defineChart({
    marks: [dot(rows, { y: 'value', key: 'id', r: 4, fillOpacity: 0.75, layout: dodgeX({ anchor: 'middle' }) })],
    scales: {
      x: null,
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Latency (ms)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Latencies as a vertical swarm' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.05 * Math.sin(t * 6), 0.1 + 0.8 * t]);
  return () => stage.dispose();
};

export default mount;
