// binX outputs: two reducers per bin, height from one and colour from the other
import { scaleLinear as d3Linear } from 'd3-scale';
import { binX, defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { makeDots } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const dots = makeDots(300);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: count and mean y of its bin.' });

  const bins = binX(dots, {
    value: 'x',
    thresholds: 14,
    outputs: { count: { reduce: 'count' }, meanY: { value: 'y', reduce: 'mean' } },
  });
  const definition = defineChart({
    marks: [rect(bins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'count', color: 'meanY', inset: 0.5 })],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: { label: 'x' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Points per bin' } },
    },
    color: { scale: d3Linear, range: ['#1e293b', '#38bdf8', '#fde047'] },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Histogram coloured by mean y' }));
  readoutPanel(stage)(tableText(bins, ['x1', 'x2', 'count', 'meanY'], 6));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
