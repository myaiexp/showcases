// treeToGraphData() flattens a nested { id, children } tree into nodes and edges
import { Graph, treeToGraphData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const tree = {
      id: 'root',
      children: [
        { id: 'node1', children: [{ id: 'node1-1' }, { id: 'node1-2' }] },
        { id: 'node2', children: [{ id: 'node2-1' }, { id: 'node2-2' }] },
      ],
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: treeToGraphData(tree),
        node: { style: { size: 24, labelText: (d) => d.id } },
        layout: { type: 'compact-box', direction: 'TB' },
        edge: { type: 'cubic-vertical' },
      }),
    );
    await graph.render();

    if (stage.bar) {
      const data = treeToGraphData(tree);
      readout(el).textContent = `nested tree (${JSON.stringify(tree).length} chars) -> ${data.nodes?.length} nodes, ${data.edges?.length} edges, children kept on nodes`;
      const dir = async (direction: 'TB' | 'LR' | 'RL' | 'BT'): Promise<void> => {
        graph.setOptions({
          layout: { type: 'compact-box', direction },
          edge: { type: direction === 'TB' || direction === 'BT' ? 'cubic-vertical' : 'cubic-horizontal' },
        });
        await graph.render();
      };
      select(stage.bar, 'layout direction', ['TB', 'LR', 'BT', 'RL'] as const, 'TB', (v) => void dir(v));
    } else {
      const dirs = ['LR', 'BT', 'RL', 'TB'] as const;
      stage.every(2400, async (i) => {
        const direction = dirs[(i - 1) % 4]!;
        graph.setOptions({
          layout: { type: 'compact-box', direction },
          edge: { type: direction === 'TB' || direction === 'BT' ? 'cubic-vertical' : 'cubic-horizontal' },
        });
        await graph.render();
      });
    }
  });

export default mount;
