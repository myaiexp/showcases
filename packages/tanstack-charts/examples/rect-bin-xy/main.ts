// rect over binXY rows: each cell has x1/x2/y1/y2 edges and a count for colour
import { scaleLinear as d3Linear } from 'd3-scale';
import { binXY, defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { readings } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const cells = binXY(readings(80), { x: 'length', y: 'depth', xThresholds: 14, yThresholds: 10 });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a cell for its count.' });

  const definition = defineChart({
    marks: [rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'value', inset: 0.5 })],
    scales: {
      x: { scale: scaleLinear, axis: { label: 'Bill length (mm)' } },
      y: { scale: scaleLinear, grid: false, axis: { label: 'Bill depth (mm)' } },
    },
    color: { scale: d3Linear, range: ['#1e293b', '#38bdf8', '#fde047'] },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Density of bill length and depth' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
