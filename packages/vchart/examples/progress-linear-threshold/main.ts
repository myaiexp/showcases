// Linear progress threshold fill: a mapped fill picks red, amber or green from the value
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'linearProgress',
    data: [
      {
        id: 'jobs',
        values: [
          { type: 'Backend', value: 0.35 },
          { type: 'Frontend', value: 0.7 },
          { type: 'Docs', value: 0.9 },
        ],
      },
    ],
    direction: 'horizontal',
    xField: 'value',
    yField: 'type',
    cornerRadius: 12,
    bandWidth: 28,
    axes: [{ orient: 'left', type: 'band', label: { visible: true } }],
    // Below 0.6 the first colour, from 0.6 to 0.8 the second, above 0.8 the third.
    progress: {
      style: {
        fill: { type: 'threshold', field: 'value', domain: [0.6, 0.8], range: ['#D04D5B', '#ED9747', '#579E78'] },
      },
    },
  });
  // Each bar climbs in steps and wraps, so its colour crosses both thresholds.
  const values = [0.35, 0.7, 0.9];
  const stop = every(900, () => {
    for (let i = 0; i < values.length; i++) values[i] = ((values[i] as number) + 0.07 + i * 0.02) % 1.01;
    void vchart.updateData('jobs', [
      { type: 'Backend', value: values[0] },
      { type: 'Frontend', value: values[1] },
      { type: 'Docs', value: values[2] },
    ]);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
