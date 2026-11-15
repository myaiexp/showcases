// Properties prefixed domain* and tick* style the baseline and the tick marks
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 380,
  height: 120,
  padding: 8,
  signals: [
    { name: 'dCol', value: 'steelblue' },
    { name: 'dW', value: 2 },
    { name: 'dDash', value: [] },
    { name: 'dCap', value: 'butt' },
    { name: 'tSize', value: 8 },
    { name: 'tW', value: 2 },
    { name: 'tDash', value: [] },
    { name: 'tCap', value: 'butt' },
    { name: 'op', value: 1 },
  ],
  scales: [{ name: 'x', type: 'linear', domain: [0, 100], range: 'width' }],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      title: 'domain and ticks styled',
      domainColor: { signal: 'dCol' },
      domainWidth: { signal: 'dW' },
      domainDash: { signal: 'dDash' },
      domainCap: { signal: 'dCap' },
      domainOpacity: { signal: 'op' },
      tickColor: { signal: 'dCol' },
      tickSize: { signal: 'tSize' },
      tickWidth: { signal: 'tW' },
      tickDash: { signal: 'tDash' },
      tickCap: { signal: 'tCap' },
      tickOpacity: { signal: 'op' },
      tickCount: 11,
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { dCol: 'steelblue', dW: 2, dDash: [], dCap: 'butt', tSize: 8, tW: 2, tDash: [], tCap: 'butt', op: 1 },
      { dCol: 'orange', dW: 4, dDash: [8, 6], dCap: 'round', tSize: 16, tW: 5, tDash: [], tCap: 'round', op: 1 },
      { dCol: '#7ac47a', dW: 1, dDash: [2, 4], dCap: 'square', tSize: 4, tW: 1, tDash: [2, 2], tCap: 'butt', op: 0.6 },
      { dCol: '#d06060', dW: 3, dDash: [], dCap: 'square', tSize: 24, tW: 3, tDash: [3, 3], tCap: 'butt', op: 1 },
    ],
    1400,
  );
});
