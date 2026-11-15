// text + subtitle, each with its own style properties
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 320,
  height: 120,
  padding: 8,
  signals: [
    { name: 'size', value: 22 },
    { name: 'tcol', value: '#eee' },
    { name: 'gap', value: 4 },
    { name: 'scol', value: '#9ab' },
    { name: 'sstyle', value: 'italic' },
  ],
  title: {
    text: 'Monthly rainfall',
    subtitle: 'Millimetres per month, one station',
    fontSize: { signal: 'size' },
    color: { signal: 'tcol' },
    fontWeight: 'bold',
    font: 'serif',
    subtitleFontSize: 13,
    subtitleColor: { signal: 'scol' },
    subtitleFontStyle: { signal: 'sstyle' },
    subtitlePadding: { signal: 'gap' },
    anchor: 'start',
  },
  data: [{ name: 'rows', values: [48, 36, 41, 39, 52, 64, 81, 90, 77, 70, 61, 55].map((v, i) => ({ m: i + 1, v })) }],
  scales: [
    { name: 'x', type: 'band', domain: { data: 'rows', field: 'm' }, range: 'width', padding: 0.1 },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
  ],
  axes: [
    { orient: 'bottom', scale: 'x' },
    { orient: 'left', scale: 'y' },
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'rows' },
      encode: { enter: { x: { scale: 'x', field: 'm' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } } },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { size: 22, tcol: '#eee', gap: 4, scol: '#9ab', sstyle: 'italic' },
      { size: 30, tcol: 'orange', gap: 14, scol: '#7ac47a', sstyle: 'normal' },
      { size: 16, tcol: '#7ac47a', gap: 0, scol: 'orange', sstyle: 'italic' },
      { size: 26, tcol: 'steelblue', gap: 8, scol: '#d06060', sstyle: 'normal' },
    ],
    1500,
  );
});
