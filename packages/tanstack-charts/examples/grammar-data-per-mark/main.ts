// Each mark takes its own data: a forecast band, actual values and one target, all different arrays
import { areaY, defineChart, lineY, mountChart, ruleY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const forecastRows = months.map((month, i) => ({ month, low: 40 + i * 5, high: 60 + i * 8 }));
const actualRows = [
  { month: 'Jan', value: 48 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 63 },
  { month: 'Apr', value: 61 },
  { month: 'May', value: 79 },
];
const target = { goal: 70 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three arrays of different length and shape feed three marks.' });

  const definition = defineChart({
    marks: [
      areaY(forecastRows, { x: 'month', y1: 'low', y2: 'high', fillOpacity: 0.25 }),
      lineY(actualRows, { x: 'month', y: 'value', stroke: '#60a5fa', strokeWidth: 2, points: true }),
      ruleY([target], { y: 'goal', stroke: '#f87171', strokeDasharray: '4 3' }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.1) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Sales' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Forecast range, actual sales and target' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
