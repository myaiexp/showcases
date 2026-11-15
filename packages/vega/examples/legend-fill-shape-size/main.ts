// One legend can carry several scales over the same domain (fill + shape); size needs its own
import type { Spec } from 'vega';
import { guideMount, points } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 300,
  height: 190,
  padding: 8,
  signals: [{ name: 'phase', value: 0 }],
  data: [{ name: 'pts', values: points(30, 21) }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    { name: 'c', type: 'ordinal', domain: ['A', 'B', 'C'], range: ['steelblue', 'orange', '#7ac47a'] },
    { name: 'sh', type: 'ordinal', domain: ['A', 'B', 'C'], range: ['circle', 'square', 'triangle-up'] },
    { name: 'sz', type: 'linear', domain: [1, 9], range: [20, 260] },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    { orient: 'left', scale: 'y' },
  ],
  legends: [
    // fill and shape share the domain A, B, C, so each entry shows a coloured shape
    { fill: 'c', shape: 'sh', title: 'group', orient: 'right' },
    // size alone: the legend shows tick values of the linear scale
    { size: 'sz', title: 'value', orient: 'right', symbolType: 'circle', symbolFillColor: '#8899aa' },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: {
        enter: { fillOpacity: { value: 0.8 } },
        update: {
          x: { scale: 'x', field: 'x', offset: { signal: '6 * sin(phase + datum.v)' } },
          y: { scale: 'y', field: 'y', offset: { signal: '6 * cos(phase + datum.v)' } },
          fill: { scale: 'c', field: 'g' },
          shape: { scale: 'sh', field: 'g' },
          size: { scale: 'sz', field: 'v' },
        },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  stage.every(120, (i) => view.signal('phase', i / 4).runAsync().then(() => undefined));
});
