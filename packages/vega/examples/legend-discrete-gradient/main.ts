// Scales that discretise (quantize, threshold) default to a discrete gradient legend
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 320,
  height: 120,
  padding: 8,
  signals: [
    { name: 'len', value: 160 },
    { name: 'thick', value: 14 },
  ],
  data: [
    {
      name: 'rows',
      values: Array.from({ length: 16 }, (_, i) => ({ i, v: Math.round(50 + 48 * Math.sin(i / 2.2)) })),
    },
  ],
  scales: [
    { name: 'x', type: 'band', domain: { data: 'rows', field: 'i' }, range: 'width', padding: 0.1 },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    // four equal bins over 0..100
    { name: 'q', type: 'quantize', domain: [0, 100], range: ['#3b4a8a', '#3c8fb0', '#8fcf8f', '#f0e060'] },
    // uneven bins cut at 20 and 70
    { name: 't', type: 'threshold', domain: [20, 70], range: ['#d06060', '#e0a030', '#7ac47a'] },
  ],
  legends: [
    {
      fill: 'q',
      title: 'quantize (bars)',
      orient: 'bottom',
      direction: 'horizontal',
      type: 'discrete',
      gradientLength: { signal: 'len' },
      gradientThickness: { signal: 'thick' },
      format: '.0f',
    },
    { fill: 't', title: 'threshold (dots)', orient: 'right', type: 'discrete', direction: 'vertical', gradientLength: { signal: 'len' }, gradientThickness: { signal: 'thick' } },
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'rows' },
      encode: {
        enter: { x: { scale: 'x', field: 'i' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { scale: 'q', field: 'v' } },
      },
    },
    {
      type: 'symbol',
      from: { data: 'rows' },
      encode: {
        enter: { x: { scale: 'x', field: 'i', band: 0.5 }, y: { value: 8 }, size: { value: 70 }, fill: { scale: 't', field: 'v' } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { len: 160, thick: 14 },
      { len: 240, thick: 24 },
      { len: 100, thick: 10 },
    ],
    1500,
  );
});
