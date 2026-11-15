// Same pointer, same key: callbacks stay quiet on moves and run again when the data under it changes
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { products } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold the pointer over a bar while the values change: the count goes up only on a rebuild.' });
  if (stage.preview) stage.height -= 36; // leaves room for the caption lines under the chart
  const show = reader(stage);
  let calls = 0;
  let step = 0;
  show('callbacks: 0');

  const rowsAt = (s: number) => products.map((p, i) => ({ ...p, revenue: Math.round(p.revenue * (0.75 + 0.5 * Math.abs(Math.sin(s * 1.3 + i)))) }));
  const options = () => ({
    definition: defineChart({
      marks: [barY(rowsAt(step), { x: 'product', y: 'revenue', key: 'id' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.25) }, y: { scale: scaleLinear().domain([0, 120]), grid: true } },
      tooltip,
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Revenue by product, changing',
    onFocusChange: (p: { datum: { product: string; revenue: number }; y: number } | null) => {
      calls++;
      show(`callbacks: ${calls}\nlast: ${p ? `${p.datum.product} = ${p.datum.revenue}, bar top at y ${p.y.toFixed(0)}px` : 'null'}`);
    },
  });
  const host = stage.own(mountChart(stage.box, options()));
  stage.every(1500, () => {
    step++;
    host.update(options());
  });
  if (stage.preview) stage.ghost(() => [0.5, 0.85]);
  return () => stage.dispose();
};

export default mount;
