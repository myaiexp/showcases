// Static mode runs a fixed number of iterations at once; iterations decide how settled it looks
import { changeset } from 'vega';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { ringGraph } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const graph = ringGraph(36, 4);

  const spec: Spec = {
    width: 400,
    height: 250,
    padding: 0,
    autosize: 'none',
    signals: [
      { name: 'static', value: true, bind: { input: 'checkbox' } },
      // Few iterations stop the layout early; 300 is the default.
      { name: 'iterations', value: 300, bind: { input: 'range', min: 1, max: 300, step: 1 } },
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
        encode: { enter: { fill: { scale: 'color', field: 'group' }, size: { value: 70 }, stroke: { value: '#ddd' } } },
        transform: [
          {
            type: 'force',
            static: { signal: 'static' },
            iterations: { signal: 'iterations' },
            forces: [
              { force: 'center', x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
              { force: 'nbody', strength: -25 },
              { force: 'link', links: 'links', distance: 28 },
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

  // Cards: fresh nodes each step start from the same spiral, so more iterations means a more settled graph.
  if (stage.preview) {
    const steps = [1, 4, 12, 40, 300];
    stage.every(1400, (i) => {
      view.signal('iterations', steps[i % steps.length] ?? 300);
      return view
        .change('nodes', changeset().remove(() => true).insert(ringGraph(36, 4).nodes))
        .runAsync()
        .then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
