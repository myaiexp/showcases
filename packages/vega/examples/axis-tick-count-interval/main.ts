// tickCount on time scales: "month", {interval, step}, ...
import type { Spec } from 'vega';
import { cycle } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 420,
  height: 90,
  padding: 8,
  signals: [{ name: 'tc', value: 'month' }],
  scales: [
    { name: 'x', type: 'time', domain: [{ signal: 'datetime(2024, 0, 1)' }, { signal: 'datetime(2024, 11, 31)' }], range: 'width' },
    // gridScale below needs a scale that spans the height
    { name: 'y', type: 'linear', domain: [0, 1], range: 'height' },
  ],
  axes: [{ orient: 'bottom', scale: 'x', tickCount: { signal: 'tc' }, format: '%b %d', labelOverlap: true, grid: true, gridOpacity: 0.2, gridScale: 'y' }],
  marks: [
    {
      type: 'text',
      encode: {
        update: {
          x: { signal: 'width / 2' },
          y: { value: 24 },
          align: { value: 'center' },
          fontSize: { value: 15 },
          fill: { value: '#ddd' },
          text: { signal: 'toString(tc)' },
        },
      },
    },
  ],
};
export default guideMount(spec, (stage, view) => {
  cycle(
    stage,
    view,
    'tc',
    ['month', { interval: 'month', step: 3 }, { interval: 'week', step: 2 }, 'year', { interval: 'day', step: 20 }, 'week'],
    1400,
  );
});
