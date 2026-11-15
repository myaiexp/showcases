// barY with a repeated x and a color channel: implicit diverging stack
import { barY, colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { sales } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = sales.map((r) => (r.region === 'East' && r.quarter === 'Q4' ? { ...r, revenue: -18 } : r));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a segment: the East loss in Q4 stacks downward.' });

  const definition = defineChart({
    marks: [barY(rows, { x: 'quarter', y: 'revenue', color: 'region' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.25) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue' } },
    },
    color: { legend: colorLegend() },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Revenue by quarter, stacked by region' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
