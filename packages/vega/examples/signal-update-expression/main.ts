// A signal's update expression follows the signals it reads
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 120,
    padding: 5,

    // Only `a` is set by hand (the slider). `b` and `c` have update expressions that read
    // other signals, so Vega re-runs them in specification order whenever `a` moves.
    signals: [
      {
        name: 'a',
        description: 'The input: a slider-driven value.',
        value: 40,
        bind: { input: 'range', min: 0, max: 100, step: 1 },
      },
      { name: 'b', description: 'Twice a.', update: 'a * 2' },
      { name: 'c', description: 'a plus b, so three times a.', update: 'a + b' },
    ],

    data: [{ name: 'rows', values: [{ k: 'a', i: 0 }, { k: 'b', i: 1 }, { k: 'c', i: 2 }] }],

    scales: [
      { name: 'y', type: 'band', domain: { data: 'rows', field: 'k' }, range: 'height', padding: 0.25 },
      { name: 'x', type: 'linear', domain: [0, 300], range: 'width' },
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'rows' },
        encode: {
          enter: { height: { scale: 'y', band: 1 }, fill: { value: 'steelblue' } },
          // x and x2 must sit in the same encode set, or the rect collapses to zero width.
          update: {
            x: { value: 0 },
            y: { scale: 'y', field: 'k' },
            x2: { scale: 'x', signal: '[a, b, c][datum.i]' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'rows' },
        encode: {
          enter: { baseline: { value: 'middle' }, fill: { value: '#eee' }, dx: { value: 6 } },
          update: {
            x: { value: 0 },
            y: { scale: 'y', field: 'k', band: 0.5 },
            text: { signal: "datum.k + ' = ' + [a, b, c][datum.i]" },
          },
        },
      },
    ],
  };

  await stage.render(spec).then((view) => cycle(stage, view, 'a', [20, 75, 45, 100], 1300));
  return () => stage.dispose();
};

export default mount;
