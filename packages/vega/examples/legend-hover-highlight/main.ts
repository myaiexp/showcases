// Legend marks can be named and made interactive, so signals can react to them
import type { Spec } from 'vega';
import { guideCentres, guideMount, points } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 300,
  height: 180,
  padding: 8,
  signals: [
    {
      name: 'lit',
      value: null,
      on: [
        { events: '@lsym:mouseover, @llab:mouseover', update: 'datum.value' },
        { events: '@lsym:mouseout, @llab:mouseout', update: 'null' },
      ],
    },
  ],
  data: [{ name: 'pts', values: points(45, 17) }],
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
      title: 'group',
      orient: 'right',
      encode: {
        symbols: { name: 'lsym', interactive: true, update: { size: { value: 140 } } },
        labels: { name: 'llab', interactive: true, update: { fontSize: { value: 13 } } },
        entries: { update: { opacity: { signal: 'lit == null || lit === datum.value ? 1 : 0.3' } } },
      },
    },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: {
        update: {
          x: { scale: 'x', field: 'x' },
          y: { scale: 'y', field: 'y' },
          fill: { scale: 'c', field: 'g' },
          size: { signal: "lit === datum.g ? 120 : 50" },
          fillOpacity: { signal: 'lit == null || lit === datum.g ? 0.9 : 0.12' },
        },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  const ghost = stage.ghost(view);
  stage.every(900, (i) => {
    const spots = guideCentres(view, 'legend-label');
    const at = spots[i % (spots.length + 1)];
    if (at) ghost.move(at[0], at[1]);
    else ghost.out();
  });
});
