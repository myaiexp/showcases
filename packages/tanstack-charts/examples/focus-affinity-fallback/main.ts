// Fallback affinity after containment: barY uses x, dot uses xy, with the same data and pointer position
import { barY, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { products } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover high above the low marks in each chart: only the bars still answer.' });
  const y = { scale: scaleLinear().domain([0, 100]), grid: true };

  const bars = defineChart({
    marks: [barY(products, { x: 'product', y: 'revenue', key: 'id' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.25) }, y },
    maxFocusDistance: 400,
    tooltip,
  });
  const dots = defineChart({
    marks: [dot(products, { x: 'product', y: 'revenue', key: 'id', r: 5 })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.5) }, y },
    maxFocusDistance: 40,
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition: bars, height: stage.height, initialWidth: 420, ariaLabel: 'Bars: x affinity' }));
  stage.own(mountChart(stage.addBox(), { definition: dots, height: stage.height, initialWidth: 420, ariaLabel: 'Dots: xy affinity' }));
  if (stage.preview) {
    const path = (t: number) => [0.1 + 0.8 * (t < 0.5 ? t * 2 : 2 - t * 2), 0.08] as const;
    stage.ghost(path);
    // The second chart has its own container, so it needs its own pretend pointer.
    stage.ghost(path, 6000, stage.root.querySelectorAll<HTMLElement>('.tc-box')[1]);
  }
  return () => stage.dispose();
};

export default mount;
