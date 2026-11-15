// binX with by: one set of bins per group, drawn as a line per group
import { binX, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { makeLatencies } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const latencies = makeLatencies(400);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point: x is the bin centre, value the count.' });

  const bins = binX(latencies, { value: 'latency', by: 'service', thresholds: 16 });
  const definition = defineChart({
    marks: [lineY(bins, { x: 'x', y: 'value', color: 'service', strokeWidth: 2, points: true })],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: { label: 'Latency (ms)' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests' } },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Latency distribution per service' }));
  readoutPanel(stage)(tableText(bins, ['service', 'x1', 'x2', 'value'], 6));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
