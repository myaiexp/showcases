// Vanilla updates: build a new definition for the chosen metric and pass it to host.update
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { products, type ProductRow } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

type Metric = 'revenue' | 'orders' | 'returns';

function rankProducts(rows: readonly ProductRow[], metric: Metric) {
  return rows
    .map((source) => ({ id: source.id, product: source.product, value: source[metric], source }))
    .sort((a, b) => b.value - a.value);
}

const createProductRanking = (metric: Metric) => {
  const ranked = rankProducts(products, metric);
  return defineChart({
    svgAnimation: true,
    tooltip,
    chart: () => ({
      marks: [barX(ranked, { x: 'value', y: 'product', fill: '#60a5fa' })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: metric } },
        y: { scale: () => scaleBand<string>().padding(0.1) },
      },
    }),
  });
};

const metrics: readonly (readonly [Metric, string])[] = [['revenue', 'Revenue'], ['orders', 'Orders'], ['returns', 'Returns']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a metric: the bars re-rank and animate to their new places.' });
  const options = (metric: Metric) => ({ definition: createProductRanking(metric), height: stage.height, ariaLabel: `Products ranked by ${metric}` });
  const host = stage.own(mountChart(stage.box, options('revenue')));
  if (stage.bar) select(stage.bar, 'metric', metrics, (metric) => host.update(options(metric)));
  else stage.cycle(metrics, 1800, ([metric]) => host.update(options(metric)));
  return () => stage.dispose();
};

export default mount;
