// A gradient used as a stroke: the colour ramp follows the line's own bounding box
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const rows = walk(rng(12), 80, 50, 4).map((value, i) => ({ id: `p${i}`, i, value }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The gradient stops are blue at the lowest point of the line and orange at the highest.' });
  const definition = defineChart({
    marks: [lineY(rows, { x: 'i', y: 'value', stroke: 'url(#heat)', strokeWidth: 3 })],
    scales: {
      x: { scale: scaleLinear, axis: { label: 'Step' } },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    gradients: [
      {
        id: 'heat',
        stops: [
          { offset: 0, color: '#38bdf8' },
          { offset: 0.5, color: '#facc15' },
          { offset: 1, color: '#f97316' },
        ],
      },
    ],
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, idPrefix: stage.id(), ariaLabel: 'Random walk drawn with a gradient stroke' }));
  return () => stage.dispose();
};

export default mount;
