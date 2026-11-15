// Math functions: sin, cos, tan, abs and clamp drawn as curves over a formula-made x range
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

// Each curve is one formula column; a line mark draws it from the same rows.
const curves = [
  { as: 'sine', label: 'sin(freq * x)', color: 'steelblue' },
  { as: 'cosine', label: 'clamp(amp * cos(x), -lim, lim)', color: 'orange' },
  { as: 'folded', label: 'abs(sin(x * freq / 2))', color: '#7ad39a' },
  // tan jumps at its poles; the clamp keeps the jump inside the plot.
  { as: 'tangent', label: 'clamp(tan(x / 2), -2, 2)', color: '#d977c9' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 220,
    padding: 8,
    signals: [
      { name: 'freq', value: 1, bind: { input: 'range', min: 0.5, max: 4, step: 0.25 } },
      { name: 'amp', value: 2, bind: { input: 'range', min: 0, max: 4, step: 0.25 } },
      { name: 'lim', value: 1.5, bind: { input: 'range', min: 0.25, max: 3, step: 0.25 } },
    ],
    data: [
      {
        name: 'xs',
        transform: [
          { type: 'sequence', start: 0, stop: 6.3, step: 0.05, as: 'x' },
          { type: 'formula', as: 'sine', expr: 'sin(freq * datum.x)' },
          { type: 'formula', as: 'cosine', expr: 'clamp(amp * cos(datum.x), -lim, lim)' },
          { type: 'formula', as: 'folded', expr: 'abs(sin(datum.x * freq / 2))' },
          { type: 'formula', as: 'tangent', expr: 'clamp(tan(datum.x / 2), -2, 2)' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 6.3], range: 'width' },
      { name: 'y', type: 'linear', domain: [-2, 2], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', tickCount: 6 },
      { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.15 },
    ],
    marks: [
      ...curves.map((c) => ({
        type: 'line' as const,
        from: { data: 'xs' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: c.as },
            stroke: { value: c.color },
            strokeWidth: { value: 2 },
          },
        },
      })),
      ...curves.map((c, i) => ({
        type: 'text' as const,
        encode: {
          enter: {
            x: { value: 8 + (i % 2) * 190 },
            y: { signal: `height + 38 + ${Math.floor(i / 2) * 14}` },
            text: { value: c.label },
            fill: { value: c.color },
            fontSize: { value: 10.5 },
            font: { value: 'ui-monospace, monospace' },
          },
        },
      })),
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { freq: 1, amp: 2, lim: 1.5 },
      { freq: 2, amp: 3, lim: 1 },
      { freq: 3, amp: 1, lim: 2 },
      { freq: 4, amp: 4, lim: 0.5 },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
