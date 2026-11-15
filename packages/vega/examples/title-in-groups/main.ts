// A group mark can declare title like the top level; text can read the group's data via parent
import type { Spec } from 'vega';
import { cycle } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const rows = ['North', 'South', 'East', 'West'].flatMap((region, ri) =>
  Array.from({ length: 12 }, (_, t) => ({ region, t, v: 30 + ri * 12 + 20 * Math.sin(t / 1.8 + ri) })),
);

const spec: Spec = {
  width: 400,
  height: 200,
  padding: 8,
  signals: [{ name: 'sub', value: 'mean' }],
  data: [{ name: 'rows', values: rows }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 11], range: [0, 150] },
    { name: 'y', type: 'linear', domain: [0, 100], range: [60, 0] },
  ],
  marks: [
    {
      type: 'group',
      from: { facet: { name: 'f', data: 'rows', groupby: 'region', aggregate: { fields: ['v'], ops: ['mean'], as: ['avg'] } } },
      encode: {
        update: {
          x: { signal: '(datum.region === "North" || datum.region === "South") ? 30 : 230' },
          y: { signal: '(datum.region === "North" || datum.region === "East") ? 40 : 150' },
          width: { value: 150 },
          height: { value: 60 },
        },
      },
      // Title text is a signal evaluated in the group's scope; parent is the facet datum
      title: {
        text: { signal: 'parent.region' },
        subtitle: { signal: "sub + ' ' + format(parent.avg, '.1f')" },
        anchor: 'start',
        fontSize: 14,
        subtitleFontSize: 11,
        subtitleColor: '#9ab',
        offset: 8,
      },
      axes: [{ orient: 'bottom', scale: 'x', tickCount: 4 }],
      marks: [
        {
          type: 'area',
          from: { data: 'f' },
          encode: { enter: { x: { scale: 'x', field: 't' }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.6 } } },
        },
      ],
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycle(stage, view, 'sub', ['mean', 'average', 'avg'], 1500);
});
