// Gradient resources in the chart spec: an area filled with a linear gradient, a dot with a radial one
import { areaY, defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The marks reference gradients as url(#id); idPrefix keeps the ids unique per chart.' });

  const definition = defineChart({
    marks: [
      areaY(signups, { x: 'month', y: 'value', fill: 'url(#fade)' }),
      lineY(signups, { x: 'month', y: 'value', stroke: '#60a5fa', strokeWidth: 2 }),
      dot(signups, { x: 'month', y: 'value', r: 9, fill: 'url(#glow)' }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    gradients: [
      {
        id: 'fade',
        y1: 1,
        y2: 0,
        stops: [
          { offset: 0, color: '#60a5fa', opacity: 0.05 },
          { offset: 1, color: '#60a5fa', opacity: 0.75 },
        ],
      },
      {
        type: 'radial',
        id: 'glow',
        cx: 0.5,
        cy: 0.5,
        r: 0.5,
        stops: [
          { offset: 0, color: '#ffffff', opacity: 0.95 },
          { offset: 1, color: '#60a5fa', opacity: 0 },
        ],
      },
    ],
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, idPrefix: stage.id('grad'), ariaLabel: 'Signups with gradients' }));
  return () => stage.dispose();
};

export default mount;
