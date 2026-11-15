// Four axes on two scales: bottom/top share x, left/right share y
import type { Spec } from 'vega';
import { cycle } from '../../shared/cards.ts';
import { guideMount, points } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 360,
  height: 200,
  padding: 5,
  signals: [{ name: 'n', value: 10 }],
  data: [{ name: 'pts', values: points(30, 7) }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width', zero: false },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
  ],
  // Each axis names its scale and an orient; one scale can back any number of axes.
  axes: [
    { orient: 'bottom', scale: 'x', title: 'bottom: x', tickCount: { signal: 'n' } },
    { orient: 'top', scale: 'x', title: 'top: x (fewer ticks)', tickCount: 4, format: '.0f', domainColor: 'orange', tickColor: 'orange' },
    { orient: 'left', scale: 'y', title: 'left: y' },
    { orient: 'right', scale: 'y', title: 'right: y as a percent', format: '.0f', formatType: 'number', labelColor: 'orange', domainColor: 'orange', tickColor: 'orange' },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: {
        enter: { fill: { value: 'steelblue' }, fillOpacity: { value: 0.7 }, size: { value: 50 } },
        update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  // Cards: the bottom axis's tickCount signal steps through 3, 6, 10, 20.
  cycle(stage, view, 'n', [3, 6, 10, 20], 1400);
});
