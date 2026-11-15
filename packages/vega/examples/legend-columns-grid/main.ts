// columns and gridAlign arrange symbol entries on a grid
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const names = ['Oak', 'Spruce', 'Pine', 'Birch', 'Willow', 'Maple', 'Elm', 'Ash', 'Beech', 'Rowan', 'Fir', 'Alder'];

const spec: Spec = {
  width: 340,
  height: 60,
  padding: 8,
  signals: [
    { name: 'cols', value: 4, bind: { input: 'range', min: 0, max: 12, step: 1 } },
    { name: 'colPad', value: 16 },
    { name: 'rowPad', value: 4 },
    { name: 'align', value: 'each', bind: { input: 'select', options: ['each', 'all', 'none'] } },
  ],
  scales: [{ name: 'c', type: 'ordinal', domain: names, range: { scheme: 'tableau20' } }],
  legends: [
    {
      fill: 'c',
      orient: 'bottom',
      direction: 'horizontal',
      columns: { signal: 'cols' },
      columnPadding: { signal: 'colPad' },
      rowPadding: { signal: 'rowPad' },
      gridAlign: { signal: 'align' },
      title: { signal: "'columns: ' + cols + ', gridAlign: ' + align" },
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
      { cols: 4, colPad: 16, rowPad: 4, align: 'each' },
      { cols: 4, colPad: 16, rowPad: 4, align: 'all' },
      { cols: 6, colPad: 30, rowPad: 12, align: 'all' },
      { cols: 3, colPad: 8, rowPad: 2, align: 'none' },
      { cols: 0, colPad: 10, rowPad: 4, align: 'each' },
      { cols: 1, colPad: 10, rowPad: 2, align: 'each' },
    ],
    1400,
  );
});
