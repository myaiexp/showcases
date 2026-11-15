// focus: 'group-y': the dots on one product row are reported together
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const first = [48, 71, 39, 86, 57, 64];
const names = ['Atlas', 'Beacon', 'Comet', 'Delta', 'Ember', 'Flint'];
const rows = names.flatMap((product, i) => [
  { id: `${product}-q1`, product, quarter: 'Q1', revenue: first[i]! },
  { id: `${product}-q2`, product, quarter: 'Q2', revenue: Math.round(first[i]! * (0.8 + ((i * 7) % 5) / 10)) },
]);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a row: both quarters for that product appear.' });

  const definition = defineChart({
    marks: [dot(rows, { x: 'revenue', y: 'product', color: 'quarter', key: 'id', r: 6 })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } },
      y: { scale: () => scalePoint<string>().padding(0.4), axis: { label: 'Product' } },
    },
    focus: 'group-y',
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Revenue by product and quarter' }));
  if (stage.preview) stage.ghost((t) => [0.5, 0.1 + 0.8 * (t < 0.5 ? t * 2 : 2 - t * 2)]);
  return () => stage.dispose();
};

export default mount;
