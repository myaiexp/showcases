// Array functions: lerp uses only the ends of an array; interpolateLinear follows every entry
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 200,
    padding: 8,
    signals: [
      { name: 'ctrl', value: [10, 100, 30, 80, 20] },
      { name: 'frac', value: 0.35, bind: { input: 'range', min: 0, max: 1, step: 0.01 } },
    ],
    data: [
      {
        name: 'samples',
        values: [{}],
        transform: [
          // sequence() gives the fractions 0, 0.02, ... 1; flatten turns that array into rows.
          { type: 'formula', as: 'f', expr: 'sequence(0, 1.001, 0.02)' },
          { type: 'flatten', fields: ['f'], as: ['f'] },
          { type: 'formula', as: 'piece', expr: 'interpolateLinear(ctrl, datum.f)' },
          { type: 'formula', as: 'ends', expr: 'lerp(ctrl, datum.f)' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 1], range: 'width' },
      { name: 'y', domain: [0, 110], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', tickCount: 5, title: 'fraction' },
      { orient: 'left', scale: 'y', tickCount: 5 },
    ],
    marks: [
      {
        type: 'line',
        from: { data: 'samples' },
        encode: { update: { x: { scale: 'x', field: 'f' }, y: { scale: 'y', field: 'ends' }, stroke: { value: 'orange' }, strokeWidth: { value: 2 }, strokeDash: { value: [5, 4] } } },
      },
      {
        type: 'line',
        from: { data: 'samples' },
        encode: { update: { x: { scale: 'x', field: 'f' }, y: { scale: 'y', field: 'piece' }, stroke: { value: 'steelblue' }, strokeWidth: { value: 2 } } },
      },
      {
        type: 'rule',
        encode: { update: { x: { scale: 'x', signal: 'frac' }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: '#666' } } },
      },
      {
        type: 'symbol',
        encode: { update: { x: { scale: 'x', signal: 'frac' }, y: { scale: 'y', signal: 'interpolateLinear(ctrl, frac)' }, size: { value: 90 }, fill: { value: 'steelblue' } } },
      },
      {
        type: 'symbol',
        encode: { update: { x: { scale: 'x', signal: 'frac' }, y: { scale: 'y', signal: 'lerp(ctrl, frac)' }, size: { value: 90 }, fill: { value: 'orange' } } },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 4 },
            y: { value: -2 },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: {
              signal:
                "'ctrl ' + ctrl + ':  interpolateLinear = ' + format(interpolateLinear(ctrl, frac), '.1f') + ',  lerp = ' + format(lerp(ctrl, frac), '.1f')",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'frac', [0.35, 0.1, 0.5, 0.75, 0.95, 0.25], 900);
  return () => stage.dispose();
};

export default mount;
