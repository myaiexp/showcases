// frame decides what the anchor is measured against
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 280,
  height: 120,
  padding: 8,
  signals: [
    { name: 'frame', value: 'bounds', bind: { input: 'select', options: ['bounds', 'group'] } },
    { name: 'offset', value: 10 },
    { name: 'dx', value: 0 },
    { name: 'dy', value: 0 },
    { name: 'angle', value: 0 },
    { name: 'base', value: 'alphabetic' },
  ],
  title: {
    text: { signal: "'frame: ' + frame" },
    anchor: 'start',
    fontSize: 16,
    frame: { signal: 'frame' },
    offset: { signal: 'offset' },
    dx: { signal: 'dx' },
    dy: { signal: 'dy' },
    angle: { signal: 'angle' },
    baseline: { signal: 'base' },
    align: 'left',
  },
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 1000000], range: 'height' },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    { orient: 'left', scale: 'y', format: ',d', title: 'a wide axis pushes the bounds left' },
  ],
  marks: [
    {
      type: 'rect',
      encode: { enter: { x: { value: 0 }, y: { value: 0 }, width: { signal: 'width' }, height: { signal: 'height' }, fill: { value: '#ffffff' }, fillOpacity: { value: 0.06 } } },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { frame: 'bounds', offset: 10, dx: 0, dy: 0, angle: 0, base: 'alphabetic' },
      { frame: 'group', offset: 10, dx: 0, dy: 0, angle: 0, base: 'alphabetic' },
      { frame: 'group', offset: 24, dx: 20, dy: 0, angle: 0, base: 'alphabetic' },
      { frame: 'group', offset: 10, dx: 0, dy: 20, angle: -8, base: 'top' },
    ],
    1500,
  );
});
