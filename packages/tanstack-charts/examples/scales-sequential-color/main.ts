// A D3 sequential colour scale maps a numeric colour channel to a gradient, with a gradient legend
import { colorGradientLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleSequential } from 'd3-scale';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { clusters } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = clusters(6, 30);
const warm = (t: number): string => `hsl(${Math.round(230 - 200 * t)} 80% ${Math.round(45 + 15 * t)}%)`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Colour follows the size field through scaleSequential.' });

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', color: 'size', r: 5, fillOpacity: 0.9 })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    color: {
      scale: () => scaleSequential(warm),
      legend: colorGradientLegend({ label: 'Body mass (g)' }),
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Scatter coloured by size' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
