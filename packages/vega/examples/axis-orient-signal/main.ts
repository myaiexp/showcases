// orient accepts a signal: bound selects (full view) or a card timer move the axes
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount, points } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 360,
  height: 200,
  padding: 5,
  signals: [
    { name: 'xSide', value: 'bottom', bind: { input: 'select', options: ['bottom', 'top'] } },
    { name: 'ySide', value: 'left', bind: { input: 'select', options: ['left', 'right'] } },
  ],
  data: [{ name: 'pts', values: points(24, 3) }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
  ],
  axes: [
    { orient: { signal: 'xSide' }, scale: 'x', title: 'x axis', grid: true, gridOpacity: 0.15 },
    { orient: { signal: 'ySide' }, scale: 'y', title: 'y axis', grid: true, gridOpacity: 0.15 },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: {
        enter: { fill: { value: 'orange' }, fillOpacity: { value: 0.75 }, size: { value: 45 } },
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
      { xSide: 'bottom', ySide: 'left' },
      { xSide: 'top', ySide: 'left' },
      { xSide: 'top', ySide: 'right' },
      { xSide: 'bottom', ySide: 'right' },
    ],
    1300,
  );
});
