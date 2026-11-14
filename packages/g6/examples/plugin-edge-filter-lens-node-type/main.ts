// edge-filter-lens nodeType, radius and trigger controls
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';
import { atNode, lensHandler } from '../../shared/plugin-drive.ts';

const TYPES = ['both', 'source', 'target', 'either'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('circular');
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: stage.preview ? 8 : 16, fill: '#1783ff' } },
        edge: { style: { stroke: '#8b9baf55' } },
        layout: { type: 'circular' },
        autoFit: 'view',
        padding: 20,
        plugins: [{ type: 'edge-filter-lens', key: 'lens', trigger: 'click', r: stage.preview ? 45 : 90, nodeType: 'both', minR: 30, maxR: 200 }],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'lens', ...o });
    if (stage.bar) {
      select(stage.bar, 'nodeType', TYPES, 'both', (nodeType) => up({ nodeType }));
      select(stage.bar, 'trigger', ['click', 'pointermove', 'drag'], 'click', (trigger) => up({ trigger }));
      slider(stage.bar, 'r', [30, 200, 5], 90, (r) => up({ r }));
    } else {
      const move = lensHandler(graph.getPluginInstance('lens'), 'onEdgeFilter');
      // The lens's first move fails on node labels; park it off-canvas once so later moves work.
      if (stage.preview) move({ canvas: { x: -9999, y: -9999 } });
      stage.every(1000, (i) => {
        up({ nodeType: TYPES[i % TYPES.length] });
        move(atNode(graph, i % 2 ? '3' : '14'));
      });
    }
  });

export default mount;
