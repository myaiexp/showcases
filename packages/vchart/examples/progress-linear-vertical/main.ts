// Vertical linear progress: direction 'vertical' with the category on x and the value on y
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { jitterer } from '../../shared/polar-data.ts';

const TANKS = [
  { type: 'Tank 1', value: 0.8 },
  { type: 'Tank 2', value: 0.45 },
  { type: 'Tank 3', value: 0.65 },
  { type: 'Tank 4', value: 0.25 },
];

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'linearProgress',
    data: [{ id: 'tanks', values: TANKS }],
    direction: 'vertical',
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    cornerRadius: 8,
    bandWidth: 36,
    progress: { leftPadding: 4, rightPadding: 4 },
    axes: [
      { orient: 'bottom', type: 'band', label: { visible: true } },
      { orient: 'left', type: 'linear', min: 0, max: 1, label: { visible: !ctx.preview } },
    ],
  });
  const next = jitterer(TANKS, 6, 0.9);
  const stop = every(1800, () => {
    void vchart.updateData('tanks', next().map((d) => ({ ...d, value: Math.min(1, d.value) })));
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
