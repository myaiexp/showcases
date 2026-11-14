// Gauge quick start: valueField drives the pointer angle across the dial set by start and end angle
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'gauge',
    data: [{ id: 'gauge', values: [{ type: 'Target A', value: 0.6 }] }],
    categoryField: 'type',
    valueField: 'value',
    outerRadius: 0.8,
    innerRadius: 0.5,
    startAngle: -180,
    endAngle: 0,
  });
  // The pointer swings to a new reading every two seconds.
  const r = rng(5);
  const stop = every(2000, () => {
    void vchart.updateData('gauge', [{ type: 'Target A', value: Math.round((0.1 + r() * 0.85) * 100) / 100 }]);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
