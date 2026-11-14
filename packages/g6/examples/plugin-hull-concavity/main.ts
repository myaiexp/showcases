// hull concavity: Infinity is convex, smaller values cut in
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const LEVELS = ['Infinity', '200', '120', '80', '50'];
const parse = (v: string): number => (v === 'Infinity' ? Infinity : Number(v));

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
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
        plugins: [
          { type: 'hull', key: 'hull', members: ['node-0', 'node-1', 'node-2', 'node-3', 'node-4', 'node-5', 'node-6'], concavity: Infinity, labelText: 'hull' },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'concavity', LEVELS, 'Infinity', (v) => graph.updatePlugin({ key: 'hull', concavity: parse(v) }));
    } else {
      stage.every(1200, (i) => graph.updatePlugin({ key: 'hull', concavity: parse(LEVELS[i % LEVELS.length]!) }));
    }
  });

export default mount;
