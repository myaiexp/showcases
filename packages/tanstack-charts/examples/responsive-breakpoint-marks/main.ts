// A responsive builder picks marks from the surface width: bars below 480px, columns above
import { barX, barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { steps } from '../../shared/style-box.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the width across 480px: the builder switches between barX and barY.' });

  const definition = defineChart({
    chart: ({ width }) => {
      const compact = width < 480;
      return compact
        ? {
            marks: [barX(revenue, { x: 'revenue', y: 'month', fill: '#f472b6' })],
            scales: { x: { scale: scaleLinear, nice: true, grid: true, axis: { ticks: { count: 3 } } }, y: { scale: () => scaleBand<string>().padding(0.15) } },
          }
        : {
            marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
            scales: { x: { scale: () => scaleBand<string>().padding(0.15) }, y: { scale: scaleLinear, nice: true, grid: true, axis: { ticks: { count: 6 }, label: 'Revenue (USD)' } } },
          };
    },
  });
  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Monthly revenue',
      onRender: ({ scene }) => stage.say(`${Math.round(scene.width)}px wide: ${scene.width < 480 ? 'barX, 3 ticks' : 'barY, 6 ticks and a title'}`),
    }),
  );
  if (stage.bar) slider(stage.bar, 'container width', 30, 100, 1, 100, (v) => { stage.box.style.width = `${v}%`; }, (v) => `${v}%`);
  else steps(stage, [100, 38], 2200);
  return () => stage.dispose();
};

export default mount;
