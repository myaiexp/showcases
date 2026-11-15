// Inferred keys: barX uses its unique y value as identity, so a re-sorted ranking moves bars, not rewrites them
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { label: 'Atlas', revenue: 128, orders: 340 },
  { label: 'Beacon', revenue: 214, orders: 190 },
  { label: 'Compass', revenue: 96, orders: 410 },
  { label: 'Dynamo', revenue: 175, orders: 260 },
  { label: 'Engine', revenue: 242, orders: 150 },
];
type Metric = 'revenue' | 'orders';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the metric: the rows are re-sorted and each bar moves to its new place.' });
  const build = (metric: Metric) => {
    const ranked = rows.map((r) => ({ label: r.label, value: r[metric] })).sort((a, b) => b.value - a.value);
    return defineChart({
      svgAnimation: { duration: 700, easing: 'ease-in-out' },
      marks: [barX(ranked, { x: 'value', y: 'label', fill: metric === 'revenue' ? '#60a5fa' : '#4ade80' })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: () => scaleBand<string>().padding(0.15) } },
    });
  };
  const options = (metric: Metric) => ({ definition: build(metric), height: stage.height, ariaLabel: `Products ranked by ${metric}` });
  const host = stage.own(mountChart(stage.box, options('revenue')));
  const show = (m: Metric): void => {
    host.update(options(m));
    stage.say(`ranked by ${m}`);
  };
  if (stage.bar) select(stage.bar, 'metric', [['revenue', 'revenue'], ['orders', 'orders']] as const, show);
  else stage.cycle<Metric>(['revenue', 'orders'], 2000, show);
  return () => stage.dispose();
};

export default mount;
