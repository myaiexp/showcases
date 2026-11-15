// stroke, strokeDash, strokeWidth and opacity are legend channels too
import type { Spec } from 'vega';
import { guideMount } from '../../shared/guides-kit.ts';

const rows = ['A', 'B', 'C'].flatMap((g, gi) =>
  Array.from({ length: 12 }, (_, t) => ({ g, t, v: 30 + gi * 25 + 14 * Math.sin(t / 2 + gi * 1.7) })),
);

const spec: Spec = {
  width: 300,
  height: 170,
  padding: 8,
  signals: [{ name: 'phase', value: 0 }],
  data: [{ name: 'rows', values: rows }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 11], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    { name: 'c', type: 'ordinal', domain: ['A', 'B', 'C'], range: ['steelblue', 'orange', '#7ac47a'] },
    { name: 'dash', type: 'ordinal', domain: ['A', 'B', 'C'], range: [[1, 0], [6, 3], [2, 3]] },
    { name: 'w', type: 'ordinal', domain: ['A', 'B', 'C'], range: [1, 3, 5] },
    { name: 'op', type: 'ordinal', domain: ['A', 'B', 'C'], range: [1, 0.7, 0.4] },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    { orient: 'left', scale: 'y' },
  ],
  legends: [
    { stroke: 'c', strokeDash: 'dash', title: 'colour + dash', orient: 'right', symbolType: 'stroke', symbolSize: 400 },
    { strokeWidth: 'w', opacity: 'op', title: 'width + opacity', orient: 'right', symbolType: 'stroke', symbolSize: 400, symbolStrokeColor: '#ddd' },
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
              y: { scale: 'y', field: 'v', offset: { signal: '4 * sin(phase + datum.t)' } },
              stroke: { scale: 'c', field: 'g' },
              strokeDash: { scale: 'dash', field: 'g' },
              strokeWidth: { scale: 'w', field: 'g' },
              strokeOpacity: { scale: 'op', field: 'g' },
            },
          },
        },
      ],
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  stage.every(120, (i) => view.signal('phase', i / 4).runAsync().then(() => undefined));
});
