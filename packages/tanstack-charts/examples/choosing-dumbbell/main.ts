// Two values per category: a link between two dots shows each change, with the category on the y axis
import { defineChart, dot, link, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { products } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = products.map((p) => ({ product: p.product, before: p.revenue * 0.7, after: p.revenue }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey dots are last year, blue dots this year. The link carries the difference.' });

  const definition = defineChart({
    marks: [
      link(rows, { x1: 'before', x2: 'after', y1: 'product', y2: 'product', stroke: '#94a3b8', strokeWidth: 2 }),
      dot(rows, { x: 'before', y: 'product', r: 5, fill: '#94a3b8' }),
      dot(rows, { x: 'after', y: 'product', r: 5, fill: '#60a5fa' }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue (thousand USD)' } },
      y: { scale: () => scaleBand<string>().padding(0.4) },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue change per product' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
