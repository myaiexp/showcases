// Per-node x and y forces plus collide make a beeswarm, computed in one static batch
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { bubbles } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 220,
    padding: 5,
    signals: [
      { name: 'xStrength', value: 0.15, bind: { input: 'range', min: 0.02, max: 0.5, step: 0.01 } },
      { name: 'yStrength', value: 0.15, bind: { input: 'range', min: 0.02, max: 0.5, step: 0.01 } },
    ],
    data: [
      {
        name: 'nodes',
        values: bubbles(9, 110, 3, 9),
        transform: [
          // Each node's focus point: its group's column, the vertical middle.
          { type: 'formula', as: 'xfocus', expr: "(indexof(['A','B','C'], datum.group) + 0.5) * width / 3" },
          { type: 'formula', as: 'yfocus', expr: 'height / 2' },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: ['A', 'B', 'C'], range: { scheme: 'category10' } }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'nodes' },
        encode: {
          enter: { fill: { scale: 'color', field: 'group' }, stroke: { value: '#ddd' }, strokeWidth: { value: 0.5 } },
          update: { size: { signal: 'pow(2 * datum.r, 2)' } },
        },
        transform: [
          {
            type: 'force',
            static: true,
            forces: [
              { force: 'x', x: 'xfocus', strength: { signal: 'xStrength' } },
              { force: 'y', y: 'yfocus', strength: { signal: 'yStrength' } },
              { force: 'collide', radius: { expr: 'datum.r' } },
            ],
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ xStrength: 0.4, yStrength: 0.05 }, { xStrength: 0.05, yStrength: 0.4 }, { xStrength: 0.15, yStrength: 0.15 }], 2000);
  return () => stage.dispose();
};

export default mount;
