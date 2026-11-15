// Where an axis sits relative to the plot, and whether it draws above or below the marks
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 340,
  height: 160,
  padding: 8,
  signals: [
    { name: 'offset', value: 0 },
    { name: 'position', value: 0 },
    { name: 'translate', value: 0.5 },
    { name: 'z', value: 0 },
  ],
  data: [{ name: 'rows', values: ['A', 'B', 'C', 'D', 'E'].map((k, i) => ({ k, v: [40, 90, 65, 20, 75][i] })) }],
  scales: [
    { name: 'x', type: 'band', domain: { data: 'rows', field: 'k' }, range: 'width', padding: 0.15 },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
  ],
  axes: [
    {
      orient: 'left',
      scale: 'y',
      offset: { signal: 'offset' },
      title: { signal: "'offset ' + offset" },
      grid: true,
      gridColor: '#fff',
      gridOpacity: 0.7,
      // typed as a number only; the parser accepts a signal reference
      zindex: { signal: 'z' } as unknown as number,
    },
    {
      orient: 'bottom',
      scale: 'x',
      position: { signal: 'position' },
      translate: { signal: 'translate' },
      title: { signal: "'position ' + position + ', translate ' + translate + ', zindex ' + z" },
    },
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'rows' },
      encode: {
        enter: {
          x: { scale: 'x', field: 'k' },
          width: { scale: 'x', band: 1 },
          y: { scale: 'y', field: 'v' },
          y2: { scale: 'y', value: 0 },
          fill: { value: 'steelblue' },
        },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { offset: 0, position: 0, translate: 0.5, z: 0 },
      { offset: 14, position: 0, translate: 0.5, z: 1 },
      { offset: 14, position: 30, translate: 0, z: 1 },
      { offset: 0, position: 0, translate: 4, z: 0 },
    ],
    1500,
  );
});
