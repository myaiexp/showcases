// gridScale: grid lines run the length of another scale's range
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount, points } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 360,
  height: 200,
  padding: 5,
  signals: [
    { name: 'dash', value: [] },
    { name: 'gridCol', value: '#6c8ebf' },
    { name: 'gw', value: 1 },
  ],
  data: [{ name: 'pts', values: points(26, 11) }],
  scales: [
    // Both ranges are inset, so the data rectangle's edge is not where the grid should end.
    { name: 'x', type: 'linear', domain: [0, 100], range: [30, { signal: 'width - 30' }] },
    { name: 'y', type: 'linear', domain: [0, 100], range: [{ signal: 'height - 30' }, 30] },
  ],
  axes: [
    { orient: 'bottom', scale: 'x', grid: true, gridScale: 'y', gridDash: { signal: 'dash' }, gridColor: { signal: 'gridCol' }, gridWidth: { signal: 'gw' }, gridOpacity: 0.8 },
    { orient: 'left', scale: 'y', grid: true, gridScale: 'x', gridDash: { signal: 'dash' }, gridColor: { signal: 'gridCol' }, gridWidth: { signal: 'gw' }, gridOpacity: 0.8 },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: {
        enter: { fill: { value: 'steelblue' }, size: { value: 50 } },
        update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { dash: [], gridCol: '#6c8ebf', gw: 1 },
      { dash: [4, 4], gridCol: '#e0a030', gw: 1 },
      { dash: [1, 3], gridCol: '#7ac47a', gw: 2 },
      { dash: [10, 3, 2, 3], gridCol: '#d06060', gw: 1.5 },
    ],
    1400,
  );
});
