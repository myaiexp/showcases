// Gauge with a conical gradient dial, a custom path pointer and a pin
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/polar-data.ts';

// Paths are drawn in a unit box around the pivot: the pointer's tip is at y = -1.
const POINTER = 'M0 -1 L0.07 -0.05 L0.07 0.1 L-0.07 0.1 L-0.07 -0.05 Z';
const CIRCLE = 'M1 0 C1 0.55228 0.55228 1 0 1 C-0.55228 1 -1 0.55228 -1 0 C-1 -0.55228 -0.55228 -1 0 -1 C0.55228 -1 1 -0.55228 1 0Z';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'gauge',
    data: [{ id: 'gauge', values: [{ type: 'Target A', value: 0.6 }] }],
    radiusField: 'type',
    angleField: 'value',
    seriesField: 'type',
    outerRadius: 0.8,
    innerRadius: 0.5,
    startAngle: -225,
    endAngle: 45,
    // The dial is a circularProgress series; its progress mark takes a conical gradient fill.
    gauge: {
      type: 'circularProgress',
      progress: {
        style: {
          fill: {
            gradient: 'conical',
            stops: [
              { offset: 0, color: '#4FC6B4' },
              { offset: 1, color: '#c43c8e' },
            ],
          },
        },
      },
      track: { style: { fill: 'rgba(255,255,255,0.15)' } },
    },
    pointer: { width: 0.6, height: 0.6, style: { path: POINTER, fill: '#e8e8ee' } },
    pin: { style: { path: CIRCLE, fill: '#888' } },
    pinBackground: { width: 0.08, height: 0.08, style: { path: CIRCLE, fill: '#ddd' } },
  });
  const r = rng(9);
  const stop = every(2000, () => {
    void vchart.updateData('gauge', [{ type: 'Target A', value: Math.round((0.05 + r() * 0.9) * 100) / 100 }]);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
