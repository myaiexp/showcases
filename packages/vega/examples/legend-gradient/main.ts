// A gradient legend for a continuous fill scale
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const cells = Array.from({ length: 12 * 6 }, (_, i) => ({ col: i % 12, row: Math.floor(i / 12), v: Math.round(50 + 50 * Math.sin((i % 12) / 2.5) * Math.cos(Math.floor(i / 12) / 1.6)) }));

const spec: Spec = {
  width: 288,
  height: 144,
  padding: 8,
  signals: [
    { name: 'len', value: 200 },
    { name: 'thick', value: 14 },
    { name: 'count', value: 5 },
    { name: 'op', value: 1 },
    { name: 'bw', value: 0 },
  ],
  data: [{ name: 'cells', values: cells }],
  scales: [
    { name: 'heat', type: 'linear', domain: [0, 100], range: { scheme: 'viridis' } },
    { name: 'x', type: 'band', domain: { data: 'cells', field: 'col' }, range: 'width' },
    { name: 'y', type: 'band', domain: { data: 'cells', field: 'row' }, range: 'height' },
  ],
  legends: [
    {
      fill: 'heat',
      type: 'gradient',
      title: 'value',
      orient: 'right',
      gradientLength: { signal: 'len' },
      gradientThickness: { signal: 'thick' },
      gradientStrokeColor: '#ddd',
      gradientStrokeWidth: { signal: 'bw' },
      gradientOpacity: { signal: 'op' },
      tickCount: { signal: 'count' },
    },
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'cells' },
      encode: {
        enter: {
          x: { scale: 'x', field: 'col' },
          y: { scale: 'y', field: 'row' },
          width: { scale: 'x', band: 1 },
          height: { scale: 'y', band: 1 },
          fill: { scale: 'heat', field: 'v' },
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
      { len: 200, thick: 14, count: 5, op: 1, bw: 0 },
      { len: 120, thick: 30, count: 3, op: 1, bw: 1.5 },
      { len: 140, thick: 8, count: 10, op: 0.6, bw: 0 },
      { len: 200, thick: 22, count: 8, op: 1, bw: 3 },
    ],
    1500,
  );
});
