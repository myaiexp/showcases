// dodgeY with a variable radius channel: larger dots are placed first
import { scaleSqrt } from 'd3-scale';
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { dodgeY } from '@tanstack/charts/dodge';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(12);
const year = normal(random, 1990, 16);
const rows = Array.from({ length: 110 }, (_, id) => ({
  id,
  year: Math.round(year()),
  budget: Math.round(5 + random() ** 3 * 190),
}));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot: radius is the budget.' });

  const definition = defineChart({
    marks: [
      dot(rows, {
        x: 'year',
        key: 'id',
        r: 'budget',
        rScale: { scale: () => scaleSqrt().range([2, 20]) },
        fillOpacity: 0.55,
        stroke: 'currentColor',
        strokeOpacity: 0.4,
        layout: dodgeY({ anchor: 'middle', padding: 1 }),
      }),
    ],
    scales: { x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Release year' } }, y: null },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Films by year, dot size is budget' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
