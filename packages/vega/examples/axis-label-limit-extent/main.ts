// labelLimit truncates with an ellipsis; extents bound the space ticks and labels claim
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 300,
  height: 150,
  padding: 8,
  signals: [
    { name: 'limit', value: 200 },
    { name: 'minE', value: 0 },
    { name: 'maxE', value: 300 },
  ],
  data: [
    {
      name: 'rows',
      values: [
        { k: 'Kilometres travelled by regional rail', v: 44 },
        { k: 'Passengers carried per working day', v: 71 },
        { k: 'Average delay in minutes after noon', v: 23 },
        { k: 'Carriages in service on weekends', v: 58 },
        { k: 'Stations with step-free access', v: 36 },
      ],
    },
  ],
  scales: [
    { name: 'y', type: 'band', domain: { data: 'rows', field: 'k' }, range: 'height', padding: 0.2 },
    { name: 'x', type: 'linear', domain: [0, 80], range: 'width' },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    {
      orient: 'left',
      scale: 'y',
      title: 'metric',
      labelLimit: { signal: 'limit' },
      minExtent: { signal: 'minE' },
      maxExtent: { signal: 'maxE' },
    },
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'rows' },
      encode: {
        enter: { fill: { value: 'steelblue' }, x: { scale: 'x', value: 0 }, x2: { scale: 'x', field: 'v' }, y: { scale: 'y', field: 'k' }, height: { scale: 'y', band: 1 } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { limit: 200, minE: 0, maxE: 300 },
      { limit: 110, minE: 0, maxE: 300 },
      { limit: 50, minE: 0, maxE: 300 },
      { limit: 110, minE: 170, maxE: 300 },
      { limit: 110, minE: 0, maxE: 40 },
    ],
    1500,
  );
});
