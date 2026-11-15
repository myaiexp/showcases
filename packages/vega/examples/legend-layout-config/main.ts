// config.legend.layout controls how legends with the same orient are stacked
import type { Spec } from 'vega';
import { cycle } from '../../shared/cards.ts';
import { guideMount, points } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 280,
  height: 150,
  padding: 8,
  config: {
    legend: {
      layout: {
        // the default layout covers left/right; bottom is set here, stacked as a row from the middle
        bottom: { anchor: 'middle', direction: 'horizontal', center: true, margin: 24 },
        right: { direction: 'vertical', center: true, margin: 10 },
      },
    },
  },
  signals: [{ name: 'side', value: 'bottom', bind: { input: 'select', options: ['bottom', 'right'] } }],
  data: [{ name: 'pts', values: points(30, 31) }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    { name: 'c', type: 'ordinal', domain: ['A', 'B', 'C'], range: ['steelblue', 'orange', '#7ac47a'] },
    { name: 'sz', type: 'linear', domain: [1, 9], range: [20, 200] },
    { name: 'heat', type: 'linear', domain: [0, 100], range: { scheme: 'plasma' } },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    { orient: 'left', scale: 'y' },
  ],
  legends: [
    { fill: 'c', title: 'group', orient: { signal: 'side' }, direction: 'vertical', symbolType: 'circle' },
    { size: 'sz', title: 'value', orient: { signal: 'side' }, direction: 'vertical', symbolType: 'circle', symbolFillColor: '#8899aa' },
    { fill: 'heat', type: 'gradient', title: 'height', orient: { signal: 'side' }, direction: 'horizontal', gradientLength: 100 },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: {
        enter: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { scale: 'c', field: 'g' }, size: { scale: 'sz', field: 'v' }, fillOpacity: { value: 0.75 } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycle(stage, view, 'side', ['bottom', 'right'], 1800);
});
