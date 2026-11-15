// colorLegendItems indicator: dot, square, line and line-dot, chosen per series
import { barY, colorLegend, colorLegendItems, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const revenue = months.map((month, i) => ({ id: `r${i}`, month, series: 'Revenue', value: [42, 58, 51, 73, 66][i]! }));
const orders = months.map((month, i) => ({ id: `o${i}`, month, series: 'Orders', value: [30, 36, 48, 41, 57][i]! }));
type Shape = 'mixed' | 'dot' | 'square' | 'line' | 'line-dot';
const shapes: readonly Shape[] = ['mixed', 'dot', 'square', 'line', 'line-dot'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an indicator: mixed uses a function of the series.' });
  const build = (shape: Shape) =>
    defineChart({
      marks: [
        barY(orders, { x: 'month', y: 'value', color: 'series', fillOpacity: 0.6 }),
        lineY(revenue, { x: 'month', y: 'value', color: 'series', strokeWidth: 2.5, points: true }),
      ],
      scales: { x: { scale: () => scaleBand<string>().padding(0.3) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: {
        domain: ['Revenue', 'Orders'],
        legend: colorLegend({
          placement: 'bottom',
          items: colorLegendItems<string>({
            justify: 'center',
            gap: 24,
            indicator: { width: 22, height: 14, gap: 6, shape: shape === 'mixed' ? (s) => (s === 'Revenue' ? 'line-dot' : 'square') : shape },
          }),
        }),
      },
    });
  const options = (shape: Shape) => ({ definition: build(shape), height: stage.height, ariaLabel: 'Revenue line over order bars' });
  const host = stage.own(mountChart(stage.box, options('mixed')));
  const show = (s: Shape): void => {
    host.update(options(s));
    stage.say(`indicator.shape: ${s}`);
  };
  if (stage.bar) select(stage.bar, 'shape', shapes.map((s) => [s, s] as const), show);
  else stage.cycle(shapes, 1500, show);
  return () => stage.dispose();
};

export default mount;
