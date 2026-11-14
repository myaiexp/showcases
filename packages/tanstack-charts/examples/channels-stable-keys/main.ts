// A stable key per row keeps each bar the same element while the ranking changes
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { products } from '../../shared/concepts-data.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Shuffle the values: each bar moves to its new rank because its key stays the same.' });
  const random = rng(21);
  let values = products.map((p) => p.revenue);

  const build = () => {
    const rows = products.map((p, i) => ({ productId: p.id, name: p.product, value: values[i]! })).sort((a, b) => b.value - a.value);
    return defineChart({
      svgAnimation: true,
      marks: [barX(rows, { id: 'ranking', x: 'value', y: 'name', key: 'productId', fill: '#60a5fa' })],
      scales: {
        x: { scale: scaleLinear().domain([0, 300]), grid: true },
        y: { scale: () => scaleBand<string>().padding(0.15) },
      },
      tooltip,
    });
  };

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Ranked products' });
  const host = stage.own(mountChart(stage.box, options()));
  const shuffle = (): void => {
    values = products.map(() => 40 + Math.round(random() * 240));
    host.update(options());
  };
  if (stage.bar) button(stage.bar, 'Shuffle values', shuffle);
  else stage.every(1800, shuffle);
  return () => stage.dispose();
};

export default mount;
