// orient: "none" turns off automatic layout; legendX/legendY position the legend group
import type { Spec } from 'vega';
import { guideMount, points } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 320,
  height: 180,
  padding: 8,
  signals: [
    { name: 'angle', value: 0, bind: { input: 'range', min: 0, max: 6.28, step: 0.05 } },
    { name: 'lx', update: '120 + 100 * cos(angle)' },
    { name: 'ly', update: '60 + 50 * sin(angle)' },
  ],
  data: [{ name: 'pts', values: points(34, 9) }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    { name: 'c', type: 'ordinal', domain: ['A', 'B', 'C'], range: ['steelblue', 'orange', '#7ac47a'] },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    { orient: 'left', scale: 'y' },
  ],
  legends: [
    {
      fill: 'c',
      orient: 'none',
      legendX: { signal: 'lx' },
      legendY: { signal: 'ly' },
      title: 'floating',
      padding: 6,
      fillColor: '#2a2d36',
      strokeColor: '#99a',
      cornerRadius: 4,
      zindex: 1,
    },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: { enter: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { scale: 'c', field: 'g' }, size: { value: 45 }, fillOpacity: { value: 0.75 } } },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  stage.every(90, (i) => view.signal('angle', (i / 15) % 6.28).runAsync().then(() => undefined));
});
