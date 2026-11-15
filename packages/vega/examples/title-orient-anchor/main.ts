// orient chooses the edge, anchor the position along it
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount, points } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 300,
  height: 150,
  padding: 8,
  signals: [
    { name: 'orient', value: 'top', bind: { input: 'select', options: ['top', 'right', 'bottom', 'left'] } },
    { name: 'anchor', value: 'middle', bind: { input: 'select', options: ['start', 'middle', 'end'] } },
  ],
  title: {
    text: { signal: "orient + ' / ' + anchor" },
    subtitle: 'orient and anchor from signals',
    orient: { signal: 'orient' },
    anchor: { signal: 'anchor' },
    fontSize: 16,
    offset: 8,
  },
  data: [{ name: 'pts', values: points(28, 12) }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    { orient: 'left', scale: 'y' },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: { enter: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { value: 'steelblue' }, size: { value: 50 }, fillOpacity: { value: 0.8 } } },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { orient: 'top', anchor: 'middle' },
      { orient: 'top', anchor: 'start' },
      { orient: 'right', anchor: 'middle' },
      { orient: 'bottom', anchor: 'end' },
      { orient: 'left', anchor: 'start' },
      { orient: 'left', anchor: 'end' },
    ],
    1300,
  );
});
