// A responsive definition: the builder reads the surface width and picks tick density and axis title
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { products } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const ranked = [...products].sort((a, b) => b.revenue - a.revenue);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the container width: the builder re-runs with the new surface width.' });

  const definition = defineChart({
    tooltip,
    chart: ({ width }) => ({
      marks: [barX(ranked, { x: 'revenue', y: 'product', fill: '#60a5fa' })],
      scales: {
        x: {
          scale: scaleLinear,
          nice: true,
          grid: true,
          axis: { label: width < 420 ? undefined : 'Revenue (thousand USD)', ticks: { count: width < 420 ? 3 : 7 } },
        },
        y: { scale: () => scaleBand<string>().padding(0.1) },
      },
    }),
  });

  const host = stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Products ranked by revenue',
      onRender: ({ scene }) => stage.say(`surface width ${Math.round(scene.width)}px: ${scene.width < 420 ? '3 ticks, no title' : '7 ticks, title'}`),
    }),
  );
  void host;
  const setWidth = (pct: number): void => {
    stage.box.style.width = `${pct}%`;
  };
  if (stage.bar) slider(stage.bar, 'container width', 30, 100, 5, 100, setWidth, (v) => `${v}%`);
  else stage.cycle([100, 45], 2200, setWidth);
  return () => stage.dispose();
};

export default mount;
