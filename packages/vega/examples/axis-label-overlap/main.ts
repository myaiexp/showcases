// labelOverlap false / "parity" / "greedy", and labelSeparation
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const names = Array.from({ length: 45 }, (_, i) => `node-${'*'.repeat(i % 4)}${i}`);

const spec: Spec = {
  width: 420,
  height: 60,
  padding: 8,
  signals: [
    { name: 'overlap', value: false, bind: { input: 'select', options: [false, true, 'parity', 'greedy'] } },
    { name: 'sep', value: 0, bind: { input: 'range', min: 0, max: 30, step: 1 } },
  ],
  scales: [{ name: 'x', type: 'point', domain: names, range: 'width', padding: 0.3 }],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      labelOverlap: { signal: 'overlap' },
      labelSeparation: { signal: 'sep' },
      labelFontSize: 9,
      title: { signal: "'labelOverlap: ' + overlap + ', labelSeparation: ' + sep" },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { overlap: false, sep: 0 },
      { overlap: 'parity', sep: 0 },
      { overlap: 'greedy', sep: 0 },
      { overlap: 'greedy', sep: 14 },
    ],
    1600,
  );
});
