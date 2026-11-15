// A signal holding the hidden series is toggled by clicks on legend marks
import type { Spec } from 'vega';
import { guideCentres, guideMount } from '../../shared/guides-kit.ts';

const rows = ['A', 'B', 'C'].flatMap((g, gi) =>
  Array.from({ length: 10 }, (_, t) => ({ g, t, v: 25 + gi * 25 + 12 * Math.sin(t / 1.6 + gi * 2) })),
);

const spec: Spec = {
  width: 300,
  height: 170,
  padding: 8,
  signals: [
    {
      // a string of hidden series letters, e.g. "AC"
      name: 'hidden',
      value: '',
      on: [
        {
          events: '@lsym:click, @llab:click',
          update: "indexof(hidden, datum.value) < 0 ? hidden + datum.value : replace(hidden, datum.value, '')",
        },
      ],
    },
  ],
  data: [{ name: 'rows', values: rows }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 9], range: 'width' },
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
      title: 'click to toggle',
      orient: 'right',
      encode: {
        symbols: { name: 'lsym', interactive: true, update: { size: { value: 140 }, cursor: { value: 'pointer' } } },
        labels: { name: 'llab', interactive: true, update: { cursor: { value: 'pointer' } } },
        entries: { update: { opacity: { signal: 'indexof(hidden, datum.value) < 0 ? 1 : 0.3' } } },
      },
    },
  ],
  marks: [
    {
      type: 'group',
      from: { facet: { name: 'series', data: 'rows', groupby: 'g' } },
      marks: [
        {
          type: 'line',
          from: { data: 'series' },
          encode: {
            update: {
              x: { scale: 'x', field: 't' },
              y: { scale: 'y', field: 'v' },
              stroke: { scale: 'c', field: 'g' },
              strokeWidth: { value: 3 },
              strokeOpacity: { signal: 'indexof(hidden, datum.g) < 0 ? 1 : 0' },
            },
          },
        },
      ],
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  const ghost = stage.ghost(view);
  stage.every(1000, (i) => {
    const spots = guideCentres(view, 'legend-symbol');
    const at = spots[i % Math.max(spots.length, 1)];
    if (at) ghost.click(at[0], at[1]);
  });
});
