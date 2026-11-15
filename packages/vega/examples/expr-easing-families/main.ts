// Easing functions: six easing curves on [0, 1], each with a dot that follows the time signal
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// name = the expression function. The bare easeQuad would be the InOut variant.
const eases = [
  ['easeLinear', 'steelblue'],
  ['easeQuadIn', 'orange'],
  ['easeCubicOut', '#7ad39a'],
  ['easeSinInOut', '#d977c9'],
  ['easeExpIn', '#e6d36a'],
  ['easeCircleOut', '#6fd0d8'],
  ['easePolyInOut', '#ff7f7f'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 220,
    padding: 8,
    signals: [{ name: 't', value: 0.4, bind: { input: 'range', min: 0, max: 1, step: 0.01 } }],
    data: [
      {
        name: 'ts',
        transform: [
          { type: 'sequence', start: 0, stop: 1.01, step: 0.01, as: 't' },
          ...eases.map(([f]) => ({ type: 'formula' as const, as: f, expr: `${f}(datum.t)` })),
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 1], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 1], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', tickCount: 5, title: 't' },
      { orient: 'left', scale: 'y', tickCount: 5, grid: true, gridOpacity: 0.15 },
    ],
    marks: [
      {
        type: 'rule',
        encode: { update: { x: { scale: 'x', signal: 't' }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: '#666' } } },
      },
      ...eases.flatMap(([f, color], i) => [
        {
          type: 'line' as const,
          from: { data: 'ts' },
          encode: {
            update: {
              x: { scale: 'x', field: 't' },
              y: { scale: 'y', field: f },
              stroke: { value: color },
              strokeWidth: { value: 1.8 },
            },
          },
        },
        {
          // The dot's height is the easing function applied to the live signal.
          type: 'symbol' as const,
          encode: {
            update: {
              x: { scale: 'x', signal: 't' },
              y: { scale: 'y', signal: `${f}(t)` },
              size: { value: 60 },
              fill: { value: color },
            },
          },
        },
        {
          type: 'text' as const,
          encode: {
            enter: {
              x: { signal: 'width + 14' },
              y: { value: 8 + i * 15 },
              text: { value: f },
              fill: { value: color },
              fontSize: { value: 11 },
              font: { value: 'ui-monospace, monospace' },
            },
          },
        },
      ]),
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    stage.every(90, (i) => {
      view.signal('t', (i % 41) / 40);
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
