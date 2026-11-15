// Label text and which entries show: format, formatType, values, tickCount
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const month = (m: number): number => Date.UTC(2025, m, 1);

const spec: Spec = {
  width: 260,
  height: 20,
  padding: 8,
  signals: [
    { name: 'fmt', value: '.2s' },
    { name: 'vals', value: null },
    { name: 'tc', value: 5 },
    { name: 'dfmt', value: '%b %Y' },
  ],
  scales: [
    { name: 'money', type: 'linear', domain: [0, 5000000], range: { scheme: 'viridis' } },
    { name: 'when', type: 'ordinal', domain: [month(0), month(3), month(6), month(9)], range: ['#4c9be8', '#7ac47a', '#e0a030', '#d06060'] },
  ],
  legends: [
    {
      fill: 'money',
      orient: 'bottom',
      direction: 'horizontal',
      title: { signal: "'format ' + fmt + ', tickCount ' + tc" },
      gradientLength: 260,
      format: { signal: 'fmt' },
      values: { signal: 'vals' },
      tickCount: { signal: 'tc' },
    },
    {
      fill: 'when',
      orient: 'bottom',
      direction: 'horizontal',
      title: { signal: "'formatType utc, format ' + dfmt" },
      formatType: 'utc',
      format: { signal: 'dfmt' },
      columns: 4,
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { fmt: '.2s', vals: null, tc: 5, dfmt: '%b %Y' },
      { fmt: '$,.0f', vals: [0, 1000000, 2500000, 5000000], tc: 5, dfmt: '%B' },
      { fmt: '.1e', vals: null, tc: 3, dfmt: '%y-%m' },
      { fmt: '+,.0f', vals: [0, 500000, 5000000], tc: 5, dfmt: 'Q%q' },
    ],
    1600,
  );
});
