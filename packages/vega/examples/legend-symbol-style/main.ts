// Legend-wide symbol settings, applied to every entry that no shape/size scale overrides
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon 2', 'Tue 2', 'Wed 2', 'Thu 2', 'Fri 2'];

const spec: Spec = {
  width: 120,
  height: 170,
  padding: 8,
  signals: [
    { name: 'shape', value: 'circle', bind: { input: 'select', options: ['circle', 'square', 'diamond', 'triangle-up', 'cross', 'stroke', 'arrow'] } },
    { name: 'size', value: 120, bind: { input: 'range', min: 30, max: 500, step: 10 } },
    { name: 'sw', value: 1 },
    { name: 'limit', value: 12, bind: { input: 'range', min: 2, max: 12, step: 1 } },
    { name: 'off', value: 0 },
    { name: 'op', value: 1 },
  ],
  scales: [{ name: 'c', type: 'ordinal', domain: names, range: { scheme: 'category20' } }],
  legends: [
    {
      fill: 'c',
      orient: 'left',
      title: 'days',
      symbolType: { signal: 'shape' },
      symbolSize: { signal: 'size' },
      symbolStrokeWidth: { signal: 'sw' },
      symbolStrokeColor: '#ddd',
      symbolOffset: { signal: 'off' },
      symbolOpacity: { signal: 'op' },
      symbolLimit: { signal: 'limit' },
      labelOffset: 8,
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { shape: 'circle', size: 120, sw: 1, limit: 12, off: 0, op: 1 },
      { shape: 'square', size: 260, sw: 3, limit: 8, off: 4, op: 1 },
      { shape: 'triangle-up', size: 80, sw: 1, limit: 5, off: 0, op: 0.6 },
      { shape: 'cross', size: 200, sw: 2, limit: 12, off: 8, op: 1 },
      { shape: 'diamond', size: 400, sw: 1, limit: 3, off: 0, op: 1 },
    ],
    1400,
  );
});
