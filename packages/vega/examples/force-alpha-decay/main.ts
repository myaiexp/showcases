// Alpha is the simulation's heat: alphaTarget keeps it warm, velocityDecay is friction
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { ringGraph } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const graph = ringGraph(30, 5);

  const spec: Spec = {
    width: 400,
    height: 250,
    padding: 0,
    autosize: 'none',
    signals: [
      // Above 0 the simulation never cools below this alpha, so nodes keep moving.
      { name: 'alphaTarget', value: 0, bind: { input: 'range', min: 0, max: 0.6, step: 0.05 } },
      { name: 'velocityDecay', value: 0.4, bind: { input: 'range', min: 0.02, max: 0.9, step: 0.01 } },
      { name: 'alpha', value: 1, bind: { input: 'range', min: 0.1, max: 1, step: 0.05 } },
    ],
    data: [
      { name: 'nodes', values: graph.nodes },
      { name: 'links', values: graph.links },
    ],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'category10' } }],
    marks: [
      {
        type: 'symbol',
        zindex: 1,
        from: { data: 'nodes' },
        encode: { enter: { fill: { scale: 'color', field: 'group' }, size: { value: 80 }, stroke: { value: '#ddd' } } },
        transform: [
          {
            type: 'force',
            alpha: { signal: 'alpha' },
            alphaTarget: { signal: 'alphaTarget' },
            velocityDecay: { signal: 'velocityDecay' },
            forces: [
              { force: 'center', x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
              { force: 'nbody', strength: -40 },
              { force: 'link', links: 'links', distance: 30 },
            ],
          },
        ],
      },
      {
        type: 'path',
        from: { data: 'links' },
        interactive: false,
        encode: { update: { stroke: { value: '#888' } } },
        transform: [
          { type: 'linkpath', sourceX: 'datum.source.x', sourceY: 'datum.source.y', targetX: 'datum.target.x', targetY: 'datum.target.y' },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { alphaTarget: 0.4, velocityDecay: 0.08 },
    { alphaTarget: 0, velocityDecay: 0.6 },
  ], 2800);
  return () => stage.dispose();
};

export default mount;
