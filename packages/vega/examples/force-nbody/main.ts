// N-body strength: negative repels nodes, positive pulls them together
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 250,
    padding: 0,
    autosize: 'none',
    signals: [
      { name: 'strength', value: -30, bind: { input: 'range', min: -80, max: 20, step: 1 } },
      { name: 'distanceMax', value: 400, bind: { input: 'range', min: 20, max: 400, step: 10 } },
    ],
    data: [{ name: 'nodes', values: Array.from({ length: 90 }, (_, id) => ({ id, group: id % 3 })) }],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'tableau10' } }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'nodes' },
        encode: {
          enter: { fill: { scale: 'color', field: 'group' }, size: { value: 40 }, stroke: { value: '#222' } },
        },
        transform: [
          {
            type: 'force',
            forces: [
              { force: 'center', x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
              { force: 'collide', radius: 4 },
              // distanceMax: past this distance two nodes ignore each other.
              { force: 'nbody', strength: { signal: 'strength' }, distanceMax: { signal: 'distanceMax' } },
            ],
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ strength: -70 }, { strength: 8 }, { strength: -12 }], 2400);
  return () => stage.dispose();
};

export default mount;
