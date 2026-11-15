// Title text, side, anchor and style are all legend properties
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 260,
  height: 80,
  padding: 8,
  signals: [
    { name: 'tOrient', value: 'top', bind: { input: 'select', options: ['top', 'left', 'bottom', 'right'] } },
    { name: 'tAnchor', value: 'start', bind: { input: 'select', options: ['start', 'middle', 'end'] } },
    { name: 'tPad', value: 8 },
    { name: 'tSize', value: 13 },
    { name: 'tCol', value: '#ddd' },
  ],
  scales: [{ name: 'c', type: 'ordinal', domain: ['Small', 'Medium', 'Large', 'Extra large'], range: { scheme: 'set2' } }],
  legends: [
    {
      fill: 'c',
      orient: 'right',
      title: ['Shirt', 'sizes'],
      titleOrient: { signal: 'tOrient' },
      titleAnchor: { signal: 'tAnchor' },
      titlePadding: { signal: 'tPad' },
      titleFontSize: { signal: 'tSize' },
      titleColor: { signal: 'tCol' },
      titleLineHeight: 15,
      titleFontWeight: 'bold',
      padding: 6,
      strokeColor: '#667',
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { tOrient: 'top', tAnchor: 'start', tPad: 8, tSize: 13, tCol: '#ddd' },
      { tOrient: 'left', tAnchor: 'start', tPad: 12, tSize: 13, tCol: 'orange' },
      { tOrient: 'bottom', tAnchor: 'middle', tPad: 4, tSize: 16, tCol: '#7ac47a' },
      { tOrient: 'right', tAnchor: 'end', tPad: 16, tSize: 11, tCol: 'steelblue' },
      { tOrient: 'top', tAnchor: 'end', tPad: 20, tSize: 18, tCol: '#d06060' },
    ],
    1400,
  );
});
