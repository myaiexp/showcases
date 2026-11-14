// bubble-sets plugin around a list of member ids
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const SETS: Record<string, string[]> = {
  'node-0, node-2, node-3': ['node-0', 'node-2', 'node-3'],
  'node-1, node-2, node-3': ['node-1', 'node-2', 'node-3'],
  'node-3..6': ['node-3', 'node-4', 'node-5', 'node-6'],
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const names = Object.keys(SETS);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hullData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
        autoFit: 'view',
        padding: 24,
        plugins: [{ type: 'bubble-sets', key: 'bubbles', members: SETS[names[0]!], label: false }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'members', names, names[0]!, (n) => graph.updatePlugin({ key: 'bubbles', members: SETS[n] }));
    } else {
      stage.every(1500, (i) => graph.updatePlugin({ key: 'bubbles', members: SETS[names[i % names.length]!] }));
    }
  });

export default mount;
