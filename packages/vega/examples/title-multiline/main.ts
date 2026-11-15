// A string array is one line per entry
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 320,
  height: 80,
  padding: 8,
  signals: [
    { name: 'lh', value: 24 },
    { name: 'slh', value: 16 },
    { name: 'align', value: 'center' },
    { name: 'lim', value: 400 },
  ],
  title: {
    text: ['Winter 2025', 'Energy use by district'],
    subtitle: ['Hourly mean, kWh per household', 'Weekends excluded', 'Source: sample data'],
    fontSize: 20,
    lineHeight: { signal: 'lh' },
    subtitleFontSize: 12,
    subtitleLineHeight: { signal: 'slh' },
    align: { signal: 'align' },
    limit: { signal: 'lim' },
    anchor: 'middle',
  },
  scales: [
    { name: 'x', type: 'linear', domain: [0, 24], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 3], range: 'height' },
  ],
  axes: [
    { orient: 'bottom', scale: 'x', tickCount: 6 },
    { orient: 'left', scale: 'y', tickCount: 3 },
  ],
  data: [{ name: 'rows', values: Array.from({ length: 25 }, (_, h) => ({ h, v: 1.1 + 0.9 * Math.sin((h - 6) / 3.8) ** 2 })) }],
  marks: [
    {
      type: 'line',
      from: { data: 'rows' },
      encode: { enter: { x: { scale: 'x', field: 'h' }, y: { scale: 'y', field: 'v' }, stroke: { value: 'orange' }, strokeWidth: { value: 2.5 }, interpolate: { value: 'monotone' } } },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { lh: 24, slh: 16, align: 'center', lim: 400 },
      { lh: 36, slh: 12, align: 'left', lim: 400 },
      { lh: 18, slh: 24, align: 'right', lim: 400 },
      { lh: 24, slh: 16, align: 'center', lim: 90 },
    ],
    1500,
  );
});
