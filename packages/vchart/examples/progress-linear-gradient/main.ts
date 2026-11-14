// Linear progress with a linear gradient fill and visible axes
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'linearProgress',
    data: [{ id: 'job', values: [{ type: 'Goal A', value: 0.6 }] }],
    direction: 'horizontal',
    xField: 'value',
    yField: 'type',
    cornerRadius: 20,
    bandWidth: 30,
    axes: [
      { orient: 'left', type: 'band', label: { visible: true } },
      { orient: 'bottom', type: 'linear', label: { visible: true } },
    ],
    // A gradient in the bar's own coordinates: x0 and x1 run from the left to the right edge.
    progress: {
      style: {
        fill: {
          gradient: 'linear',
          x0: 0,
          y0: 0.5,
          x1: 1,
          y1: 0.5,
          stops: [
            { offset: 0, color: '#4FC6B4' },
            { offset: 1, color: '#b04ad8' },
          ],
        },
      },
    },
  });
  const r = rng(4);
  const stop = every(1800, () => {
    void vchart.updateData('job', [{ type: 'Goal A', value: Math.round((0.15 + r() * 0.85) * 100) / 100 }]);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
