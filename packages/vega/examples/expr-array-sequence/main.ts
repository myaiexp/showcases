// Array functions: sequence([start,] stop [, step]) as dots on a number line, forwards and reversed
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 90,
    padding: 8,
    signals: [
      { name: 'start', value: 0, bind: { input: 'range', min: -10, max: 20, step: 1 } },
      { name: 'stop', value: 12, bind: { input: 'range', min: -10, max: 20, step: 1 } },
      { name: 'step', value: 2, bind: { input: 'range', min: -5, max: 5, step: 0.5 } },
    ],
    data: [
      {
        name: 'dots',
        values: [{}],
        transform: [
          { type: 'formula', as: 'seq', expr: 'sequence(start, stop, step)' },
          { type: 'flatten', fields: ['seq'], as: ['n'] },
        ],
      },
      {
        // reverse() returns a new array, so the second row counts down the same values.
        name: 'back',
        values: [{}],
        transform: [
          { type: 'formula', as: 'seq', expr: 'reverse(sequence(start, stop, step))' },
          { type: 'flatten', fields: ['seq'], as: ['n'] },
          { type: 'window', ops: ['row_number'], as: ['rank'] },
        ],
      },
    ],
    scales: [{ name: 'x', type: 'linear', domain: [-10, 20], range: 'width' }],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 15, offset: 0 }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'dots' },
        encode: { update: { x: { scale: 'x', field: 'n' }, y: { value: 16 }, size: { value: 110 }, fill: { value: 'steelblue' } } },
      },
      {
        type: 'symbol',
        from: { data: 'back' },
        encode: { update: { x: { scale: 'x', field: 'n' }, y: { value: 44 }, size: { value: 110 }, fill: { value: 'orange' } } },
      },
      {
        type: 'text',
        from: { data: 'back' },
        encode: {
          update: { x: { scale: 'x', field: 'n' }, y: { value: 44 }, align: { value: 'center' }, baseline: { value: 'middle' }, text: { field: 'rank' }, fill: { value: '#fff' }, fontSize: { value: 8 } },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: -2 },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: { signal: "'sequence(' + start + ', ' + stop + ', ' + step + ') has ' + length(sequence(start, stop, step)) + ' values: ' + truncate(join(sequence(start, stop, step), ' '), 54)" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { start: 0, stop: 12, step: 2 },
      { start: 15, stop: -5, step: -3 },
      { start: -8, stop: 18, step: 4.5 },
      { start: 0, stop: 10, step: 1 },
      { start: 5, stop: 5, step: 1 },
    ],
    1200,
  );
  return () => stage.dispose();
};

export default mount;
