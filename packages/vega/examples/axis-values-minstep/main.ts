// values: explicit tick positions; tickMinStep: never closer than this many domain units
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 400,
  height: 120,
  padding: 8,
  signals: [
    { name: 'vals', value: [0, 1, 2, 3, 5, 8, 13] },
    { name: 'minStep', value: 1 },
  ],
  scales: [{ name: 'x', type: 'linear', domain: [0, 13], range: 'width' }],
  axes: [
    // Fibonacci tick values picked by hand
    { orient: 'top', scale: 'x', values: { signal: 'vals' }, title: 'values: hand-picked ticks' },
    // 20 ticks over 0..13 would land on half units; tickMinStep forces whole ones
    { orient: 'bottom', scale: 'x', tickCount: 20, tickMinStep: { signal: 'minStep' }, title: 'tickCount 20, tickMinStep above' },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { vals: [0, 1, 2, 3, 5, 8, 13], minStep: 0.25 },
      { vals: [0, 4, 8, 12], minStep: 1 },
      { vals: [1, 2, 4, 8], minStep: 2 },
      { vals: [0, 6.5, 13], minStep: 5 },
    ],
    1500,
  );
});
