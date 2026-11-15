// A new definition per state change: metric and accent feed a responsive builder passed to host.update
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { label: 'North', revenue: 420, margin: 31, growth: 12 },
  { label: 'South', revenue: 310, margin: 44, growth: 5 },
  { label: 'East', revenue: 505, margin: 22, growth: 18 },
  { label: 'West', revenue: 280, margin: 38, growth: 9 },
  { label: 'Central', revenue: 365, margin: 27, growth: 15 },
];
type Metric = 'revenue' | 'margin' | 'growth';
const accents = { revenue: '#60a5fa', margin: '#4ade80', growth: '#fb923c' } as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the metric: a new definition is created and the bars tween into the new ranking.' });
  const create = (metric: Metric, accent: string) => {
    const ranked = rows.map((row) => ({ label: row.label, value: row[metric] })).sort((l, r) => r.value - l.value);
    return defineChart({
      svgAnimation: { duration: 280, easing: 'ease-out' },
      chart: ({ width }) => ({
        marks: [barX(ranked, { x: 'value', y: 'label', fill: accent })],
        scales: {
          x: { scale: scaleLinear, nice: true, axis: { ticks: { count: width < 420 ? 4 : 7 }, label: metric }, grid: true },
          y: { scale: () => scaleBand<string>().padding(0.1) },
        },
      }),
    });
  };
  const options = (metric: Metric) => ({ definition: create(metric, accents[metric]), height: stage.height, ariaLabel: `Regions ranked by ${metric}` });
  const host = stage.own(mountChart(stage.box, options('revenue')));
  const show = (m: Metric): void => {
    host.update(options(m));
    stage.say(`metric: ${m}`);
  };
  const metrics: readonly Metric[] = ['revenue', 'margin', 'growth'];
  if (stage.bar) select(stage.bar, 'metric', metrics.map((m) => [m, m] as const), show);
  else stage.cycle(metrics, 1700, show);
  return () => stage.dispose();
};

export default mount;
