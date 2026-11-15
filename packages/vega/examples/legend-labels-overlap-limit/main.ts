// labelOverlap applies to gradient legends; labelLimit to every legend's labels
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 340,
  height: 20,
  padding: 8,
  signals: [
    { name: 'overlap', value: false, bind: { input: 'select', options: [false, 'parity', 'greedy'] } },
    { name: 'sep', value: 0 },
    { name: 'limit', value: 170 },
  ],
  scales: [
    { name: 'heat', type: 'linear', domain: [0, 1000000], range: { scheme: 'magma' } },
    {
      name: 'c',
      type: 'ordinal',
      domain: ['Municipal waste incinerated', 'Waste sent to landfill', 'Recycled materials'],
      range: ['#d06060', '#e0a030', '#7ac47a'],
    },
  ],
  legends: [
    {
      fill: 'heat',
      orient: 'bottom',
      direction: 'horizontal',
      title: { signal: "'gradient, labelOverlap: ' + overlap" },
      gradientLength: 340,
      tickCount: 24,
      format: ',d',
      labelOverlap: { signal: 'overlap' },
      labelSeparation: { signal: 'sep' },
      labelFontSize: 10,
    },
    {
      fill: 'c',
      orient: 'bottom',
      direction: 'vertical',
      title: { signal: "'symbols, labelLimit: ' + limit" },
      labelLimit: { signal: 'limit' },
      labelOffset: 8,
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { overlap: false, sep: 0, limit: 170 },
      { overlap: 'parity', sep: 0, limit: 120 },
      { overlap: 'greedy', sep: 0, limit: 70 },
      { overlap: 'greedy', sep: 18, limit: 30 },
    ],
    1600,
  );
});
