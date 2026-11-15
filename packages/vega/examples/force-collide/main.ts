// Collide pushes bubbles of different radii apart; padding and strength are live
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { bubbles } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 250,
    padding: 0,
    autosize: 'none',
    signals: [
      { name: 'pad', value: 1, bind: { input: 'range', min: 0, max: 12, step: 1 } },
      { name: 'strength', value: 0.7, bind: { input: 'range', min: 0, max: 1, step: 0.05 } },
      { name: 'iterations', value: 1, bind: { input: 'range', min: 1, max: 6, step: 1 } },
    ],
    data: [{ name: 'nodes', values: bubbles(4, 55) }],
    scales: [{ name: 'color', type: 'ordinal', domain: ['A', 'B', 'C'], range: { scheme: 'category10' } }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'nodes' },
        encode: {
          enter: { fill: { scale: 'color', field: 'group' }, fillOpacity: { value: 0.85 }, stroke: { value: '#ddd' } },
          // symbol size is an area: the diameter squared
          update: { size: { signal: 'pow(2 * datum.r, 2)' } },
        },
        transform: [
          {
            type: 'force',
            forces: [
              { force: 'center', x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
              // The radius is an expression over each node, so padding adds to every bubble.
              { force: 'collide', radius: { expr: 'datum.r + pad' }, strength: { signal: 'strength' }, iterations: { signal: 'iterations' } },
            ],
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ pad: 8 }, { pad: 0 }, { pad: 3 }], 2200);
  return () => stage.dispose();
};

export default mount;
