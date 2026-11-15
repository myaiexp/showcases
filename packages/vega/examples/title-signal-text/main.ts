// title.text and subtitle accept signals, so a title can act as a readout
import type { Spec } from 'vega';
import { guideMount } from '../../shared/guides-kit.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const values = [12, 19, 25, 31, 44, 52, 61, 58, 47, 33, 21, 15];

const spec: Spec = {
  width: 340,
  height: 120,
  padding: 8,
  signals: [
    { name: 'hovered', value: null, on: [{ events: 'rect:mouseover', update: 'datum' }, { events: 'rect:mouseout', update: 'null' }] },
  ],
  title: {
    text: { signal: "hovered ? hovered.m + ': ' + hovered.v + ' units' : 'Hover a month'" },
    subtitle: { signal: "'Total for the year: ' + " + values.reduce((a, b) => a + b, 0) },
    anchor: 'start',
    fontSize: 17,
    subtitleColor: '#9ab',
  },
  data: [{ name: 'rows', values: months.map((m, i) => ({ m, v: values[i] ?? 0 })) }],
  scales: [
    { name: 'x', type: 'band', domain: months, range: 'width', padding: 0.15 },
    { name: 'y', type: 'linear', domain: [0, 70], range: 'height' },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    { orient: 'left', scale: 'y', tickCount: 4 },
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'rows' },
      encode: {
        enter: { x: { scale: 'x', field: 'm' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 } },
        update: { fill: { value: 'steelblue' } },
        hover: { fill: { value: 'orange' } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  const ghost = stage.ghost(view);
  const x = view.scale('x');
  stage.every(700, (i) => {
    const m = months[i % months.length] ?? 'Jan';
    ghost.move(x(m) + x.bandwidth() / 2, 100);
  });
});
