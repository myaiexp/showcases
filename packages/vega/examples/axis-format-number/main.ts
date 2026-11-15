// format takes a d3-format specifier for numbers
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 380,
  height: 150,
  padding: 8,
  signals: [
    { name: 'fx', value: ',d', bind: { input: 'select', options: [',d', '.2s', '$,.0f', '+.1e', '.0f'] } },
    { name: 'fy', value: '.0%', bind: { input: 'select', options: ['.0%', '.1%', '.2f', '+.1f', '~%'] } },
  ],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 25000], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 1], range: 'height' },
  ],
  axes: [
    { orient: 'bottom', scale: 'x', format: { signal: 'fx' }, title: { signal: "'format: ' + fx" }, grid: true, gridOpacity: 0.12, labelOverlap: true },
    { orient: 'left', scale: 'y', format: { signal: 'fy' }, title: { signal: "'format: ' + fy" }, grid: true, gridOpacity: 0.12 },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { fx: ',d', fy: '.0%' },
      { fx: '.2s', fy: '.1%' },
      { fx: '$,.0f', fy: '.2f' },
      { fx: '+.1e', fy: '+.1f' },
    ],
    1400,
  );
});
