// Easing functions: Back, Elastic and Bounce in their In, Out and InOut variants, with optional clamping
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const families = [
  ['easeBack', 'steelblue'],
  ['easeElastic', 'orange'],
  ['easeBounce', '#7ad39a'],
] as const;
const variants = [
  ['In', [2, 3]],
  ['Out', [8, 3]],
  ['InOut', []],
] as const;
const curves = families.flatMap(([f, color]) => variants.map(([v, dash]) => ({ name: `${f}${v}`, color, dash })));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 220,
    padding: 8,
    // clamp(value, 0, 1) is the docs' remedy when a calculation needs a value inside the unit interval.
    signals: [{ name: 'clip', value: false, bind: { input: 'checkbox' } }],
    data: [
      {
        name: 'ts',
        transform: [
          { type: 'sequence', start: 0, stop: 1.005, step: 0.005, as: 't' },
          ...curves.map((c) => ({ type: 'formula' as const, as: c.name, expr: `clip ? clamp(${c.name}(datum.t), 0, 1) : ${c.name}(datum.t)` })),
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 1], range: 'width' },
      { name: 'y', type: 'linear', domain: [-0.4, 1.4], range: 'height', zero: false },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', tickCount: 5, title: 't' },
      { orient: 'left', scale: 'y', tickCount: 6, grid: true, gridOpacity: 0.15 },
    ],
    marks: [
      ...curves.map((c) => ({
        type: 'line' as const,
        from: { data: 'ts' },
        encode: {
          update: {
            x: { scale: 'x', field: 't' },
            y: { scale: 'y', field: c.name },
            stroke: { value: c.color },
            strokeDash: { value: [...c.dash] },
            strokeWidth: { value: 1.6 },
          },
        },
      })),
      ...families.map(([f, color], i) => ({
        type: 'text' as const,
        encode: {
          enter: {
            x: { signal: 'width + 14' },
            y: { value: 8 + i * 15 },
            text: { value: `${f}  (In dashed, Out dotted)` },
            fill: { value: color },
            fontSize: { value: 10.5 },
          },
        },
      })),
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    stage.every(1500, (i) => {
      view.signal('clip', i % 2 === 1);
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
