// Band scales: where in the band does the tick sit?
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 360,
  height: 90,
  padding: 8,
  signals: [
    { name: 'tickBand', value: 'center' },
    { name: 'pos', value: 0.5 },
    { name: 'extra', value: false },
    { name: 'off', value: 0 },
  ],
  data: [{ name: 'rows', values: ['A', 'B', 'C', 'D', 'E', 'F'].map((k, i) => ({ k, v: [3, 7, 4, 9, 5, 6][i] })) }],
  scales: [
    { name: 'x', type: 'band', domain: { data: 'rows', field: 'k' }, range: 'width', padding: 0 },
    { name: 'y', type: 'linear', domain: [0, 10], range: 'height' },
  ],
  axes: [
    { orient: 'top', scale: 'x', tickBand: { signal: 'tickBand' }, title: { signal: "'tickBand: ' + tickBand" }, tickSize: 10 },
    {
      orient: 'bottom',
      scale: 'x',
      bandPosition: { signal: 'pos' },
      tickExtra: { signal: 'extra' },
      tickOffset: { signal: 'off' },
      tickSize: 10,
      title: { signal: "'bandPosition ' + pos + ', tickExtra ' + extra + ', tickOffset ' + off" },
    },
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'rows' },
      encode: {
        enter: {
          x: { scale: 'x', field: 'k' },
          width: { scale: 'x', band: 1 },
          y: { scale: 'y', field: 'v' },
          y2: { scale: 'y', value: 0 },
          fill: { value: 'steelblue' },
          stroke: { value: '#223' },
        },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { tickBand: 'center', pos: 0.5, extra: false, off: 0 },
      { tickBand: 'extent', pos: 0, extra: false, off: 0 },
      { tickBand: 'center', pos: 1, extra: true, off: 0 },
      { tickBand: 'extent', pos: 0.5, extra: false, off: 12 },
    ],
    1500,
  );
});
