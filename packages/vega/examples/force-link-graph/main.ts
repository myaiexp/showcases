// A network settles under center, collide, nbody and link forces
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 275,
    padding: 0,
    autosize: 'none',
    signals: [
      { name: 'cx', update: 'width / 2' },
      { name: 'cy', update: 'height / 2' },
      { name: 'nbodyStrength', value: -10, bind: { input: 'range', min: -50, max: 10, step: 1 } },
      { name: 'linkDistance', value: 15, bind: { input: 'range', min: 5, max: 100, step: 1 } },
    ],
    data: [
      { name: 'node-data', url: 'data/miserables.json', format: { type: 'json', property: 'nodes' } },
      { name: 'link-data', url: 'data/miserables.json', format: { type: 'json', property: 'links' } },
    ],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'category20c' } }],
    marks: [
      {
        name: 'nodes',
        type: 'symbol',
        zindex: 1,
        from: { data: 'node-data' },
        encode: {
          enter: { fill: { scale: 'color', field: 'group' }, stroke: { value: '#ddd' }, size: { value: 50 } },
        },
        transform: [
          {
            // Not static: the simulation ticks on screen, and a changed force parameter reheats it.
            type: 'force',
            forces: [
              { force: 'center', x: { signal: 'cx' }, y: { signal: 'cy' } },
              { force: 'collide', radius: 5 },
              { force: 'nbody', strength: { signal: 'nbodyStrength' } },
              { force: 'link', links: 'link-data', distance: { signal: 'linkDistance' } },
            ],
          },
        ],
      },
      {
        // Links join the node objects the force transform wrote x and y onto.
        type: 'path',
        from: { data: 'link-data' },
        interactive: false,
        encode: { update: { stroke: { value: '#999' }, strokeWidth: { value: 0.5 } } },
        transform: [
          {
            type: 'linkpath',
            shape: 'line',
            sourceX: 'datum.source.x',
            sourceY: 'datum.source.y',
            targetX: 'datum.target.x',
            targetY: 'datum.target.y',
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  // Cards: alternate tight and loose settings so the graph keeps breathing.
  cycleSteps(stage, view, [
    { nbodyStrength: -40, linkDistance: 40 },
    { nbodyStrength: -5, linkDistance: 12 },
  ], 2600);
  return () => stage.dispose();
};

export default mount;
