// Rotating labels needs matching align/baseline, or they float away from the tick
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const names = ['Aluminium', 'Beryllium', 'Chromium', 'Dysprosium', 'Erbium', 'Francium', 'Gallium', 'Hafnium'];

const spec: Spec = {
  width: 400,
  height: 110,
  padding: 8,
  signals: [
    { name: 'angle', value: 0, bind: { input: 'range', min: -90, max: 90, step: 5 } },
    { name: 'align', value: 'center', bind: { input: 'select', options: ['left', 'center', 'right'] } },
    { name: 'base', value: 'top', bind: { input: 'select', options: ['alphabetic', 'top', 'middle', 'bottom'] } },
  ],
  scales: [{ name: 'x', type: 'band', domain: names, range: 'width', padding: 0.1 }],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      labelAngle: { signal: 'angle' },
      labelAlign: { signal: 'align' },
      labelBaseline: { signal: 'base' },
      labelPadding: 4,
      title: { signal: "'angle ' + angle + ', ' + align + ', ' + base" },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { angle: 0, align: 'center', base: 'top' },
      { angle: -45, align: 'right', base: 'middle' },
      { angle: -90, align: 'right', base: 'middle' },
      { angle: 45, align: 'left', base: 'middle' },
      { angle: -30, align: 'center', base: 'top' },
    ],
    1400,
  );
});
