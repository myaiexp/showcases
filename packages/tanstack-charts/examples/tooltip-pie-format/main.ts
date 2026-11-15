// A donut under default nearest focus: format() replaces the raw angle and radius
import { defineChart, mountChart } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { products } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const slices = pie(products, { value: 'revenue' });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a slice, then the hole: nothing is focused inside it.' });

  const definition = defineChart({
    marks: [
      polar({
        marks: [radialArc(slices, { key: 'product', color: 'product', innerRadius: ({ radius }) => radius * 0.5, stroke: '#0b0b0f', strokeWidth: 1 })],
        scales: { angle: null, radius: null },
      }),
    ],
    scales: { x: null, y: null },
    tooltip: { use: tooltip, format: (point) => `${point.datum.product}: ${point.datum.value}k USD (${(point.datum.fraction * 100).toFixed(1)}%)` },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue share by product' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;
