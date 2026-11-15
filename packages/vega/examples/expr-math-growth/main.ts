// Math functions: pow, sqrt, exp, log, min and max compared as growth curves
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 220,
    padding: 8,
    signals: [{ name: 'power', value: 2, bind: { input: 'range', min: 0.25, max: 4, step: 0.25 } }],
    data: [
      {
        name: 'rows',
        transform: [
          { type: 'sequence', start: 0.05, stop: 5.05, step: 0.05, as: 'x' },
          { type: 'formula', as: 'pow', expr: 'pow(datum.x, power)' },
          { type: 'formula', as: 'sqrt', expr: 'sqrt(datum.x)' },
          { type: 'formula', as: 'exp', expr: 'exp(datum.x) / 10' },
          { type: 'formula', as: 'log', expr: 'log(datum.x)' },
          // min and max take any number of arguments: the envelope of the four curves above.
          { type: 'formula', as: 'high', expr: 'max(datum.pow, datum.sqrt, datum.exp, datum.log)' },
          { type: 'formula', as: 'low', expr: 'min(datum.pow, datum.sqrt, datum.exp, datum.log)' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 5], range: 'width' },
      { name: 'y', type: 'linear', domain: [-3, 15], range: 'height', clamp: true },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.15 },
    ],
    marks: [
      {
        type: 'area',
        from: { data: 'rows' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'high' },
            y2: { scale: 'y', field: 'low' },
            fill: { value: '#8fb8de' },
            fillOpacity: { value: 0.15 },
          },
        },
      },
      ...(
        [
          ['pow', 'pow(x, power)', 'steelblue'],
          ['sqrt', 'sqrt(x)', 'orange'],
          ['exp', 'exp(x) / 10', '#d977c9'],
          ['log', 'log(x)', '#7ad39a'],
        ] as const
      ).flatMap(([f, label, color], i) => [
        {
          type: 'line' as const,
          from: { data: 'rows' },
          encode: {
            update: {
              x: { scale: 'x', field: 'x' },
              y: { scale: 'y', field: f },
              stroke: { value: color },
              strokeWidth: { value: 2 },
            },
          },
        },
        {
          type: 'text' as const,
          encode: {
            enter: {
              x: { value: 10 },
              y: { value: 8 + i * 14 },
              text: { value: label },
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
  cycle(stage, view, 'power', [1, 2, 3, 0.5, 4, 1.5], 1100);
  return () => stage.dispose();
};

export default mount;
