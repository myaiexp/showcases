// tickCount is a target: Vega rounds to nice steps (multiples of 1, 2, 5, 10)
import type { Spec } from 'vega';
import { cycle } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 400,
  height: 120,
  padding: 8,
  signals: [{ name: 'count', value: 5, bind: { input: 'range', min: 1, max: 40, step: 1 } }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 137], range: 'width' },
    // gridScale below needs a scale that spans the height
    { name: 'y', type: 'linear', domain: [0, 1], range: 'height' },
  ],
  axes: [{ orient: 'bottom', scale: 'x', tickCount: { signal: 'count' }, grid: true, gridOpacity: 0.2, gridScale: 'y' }],
  marks: [
    {
      type: 'text',
      encode: {
        update: {
          x: { signal: 'width / 2' },
          y: { value: 40 },
          align: { value: 'center' },
          fontSize: { value: 20 },
          fill: { value: '#ddd' },
          text: { signal: "'tickCount: ' + count" },
        },
      },
    },
  ],
};
export default guideMount(spec, (stage, view) => {
  cycle(stage, view, 'count', [2, 5, 10, 20, 40, 3], 1100);
});
