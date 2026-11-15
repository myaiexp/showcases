// A complete bubble scatter: colour channel, fixed ordinal colours, sqrt radius scale and a legend
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { scaleSqrt } from 'd3-scale';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { clusters } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = clusters(12, 20);
const species = ['Adelie', 'Chinstrap', 'Gentoo'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bubble. Bubble area follows the third value.' });

  const definition = defineChart({
    marks: [
      dot(rows, {
        x: 'x',
        y: 'y',
        color: 'group',
        r: 'size',
        rScale: { scale: () => scaleSqrt().range([3, 11]) },
        fillOpacity: 0.78,
        stroke: 'currentColor',
        strokeOpacity: 0.28,
        strokeWidth: 0.75,
      }),
    ],
    scales: {
      x: { scale: scaleLinear, grid: true, axis: { label: 'Bill length (mm)' } },
      y: { scale: scaleLinear, grid: true, axis: { label: 'Bill depth (mm)' } },
    },
    color: {
      scale: scaleOrdinal(species, ['#60a5fa', '#fb923c', '#4ade80']),
      legend: colorLegend({ label: 'Species' }),
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Bill dimensions by species' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
