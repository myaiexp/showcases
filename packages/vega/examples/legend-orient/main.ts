// orient places the legend outside (left/right/top/bottom) or inside (corners); none leaves it to legendX/Y
import type { Spec } from 'vega';
import { cycle } from '../../shared/cards.ts';
import { guideMount, points } from '../../shared/guides-kit.ts';

const orients = ['right', 'left', 'top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'none'];

const spec: Spec = {
  width: 300,
  height: 170,
  padding: 8,
  signals: [
    { name: 'where', value: 'right', bind: { input: 'select', options: orients } },
    { name: 'gap', value: 10, bind: { input: 'range', min: 0, max: 40, step: 2 } },
  ],
  data: [{ name: 'pts', values: points(30, 4) }],
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
      title: { signal: 'where' },
      orient: { signal: 'where' },
      offset: { signal: 'gap' },
      padding: 6,
      fillColor: '#2a2d36',
      strokeColor: '#99a',
      cornerRadius: 4,
      // legendX and legendY apply only while orient is "none"
      legendX: 150,
      legendY: 60,
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
  cycle(stage, view, 'where', orients, 1200);
});
