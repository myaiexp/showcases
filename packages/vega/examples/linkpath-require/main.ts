// A force layout in a data set bound to a signal; linkpath requires it so links follow every tick
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { ringGraph } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const graph = ringGraph(26, 5);

  const spec: Spec = {
    width: 400,
    height: 250,
    padding: 0,
    autosize: 'none',
    signals: [{ name: 'distance', value: 28, bind: { input: 'range', min: 10, max: 70, step: 1 } }],
    data: [
      { name: 'raw', values: graph.links.map((l) => ({ ...l })) },
      {
        name: 'nodes',
        values: graph.nodes,
        // The simulation moves nodes as a side effect between dataflow runs, so bind it to a signal.
        transform: [
          {
            type: 'force',
            signal: 'sim',
            forces: [
              { force: 'center', x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
              { force: 'nbody', strength: -30 },
              { force: 'link', links: 'raw', distance: { signal: 'distance' } },
            ],
          },
        ],
      },
      {
        name: 'edges',
        values: graph.links.map((l) => ({ ...l })),
        transform: [
          { type: 'lookup', from: 'nodes', key: 'id', fields: ['source', 'target'], as: ['a', 'b'] },
          // require tells linkpath to rerun when the force signal changes, though no node tuple changed.
          { type: 'linkpath', require: { signal: 'sim' }, sourceX: 'a.x', sourceY: 'a.y', targetX: 'b.x', targetY: 'b.y' },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'category10' } }],
    marks: [
      {
        type: 'path',
        from: { data: 'edges' },
        encode: { update: { path: { field: 'path' }, stroke: { value: '#888' } } },
      },
      {
        type: 'symbol',
        from: { data: 'nodes' },
        encode: {
          enter: { fill: { scale: 'color', field: 'group' }, size: { value: 90 }, stroke: { value: '#ddd' } },
          update: { x: { field: 'x' }, y: { field: 'y' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ distance: 60 }, { distance: 14 }], 2600);
  return () => stage.dispose();
};

export default mount;
