// Custom transform: beforeDraw moves nodes without edges from add to remove, so they stay hidden
import { BaseTransform, ExtensionCategory, Graph, register, type DrawData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

class HideFreeNode extends BaseTransform {
  override beforeDraw(input: DrawData): DrawData {
    const { model } = this.context;
    const { add, remove } = input;
    add.nodes.forEach((nodeData, nodeId) => {
      // A node with no related edges is dropped from the add list and queued for removal.
      if (!model.getRelatedEdgesData(nodeId).length) {
        add.nodes.delete(nodeId);
        remove.nodes.set(nodeId, nodeData);
      }
    });
    return input;
  }
}
register(ExtensionCategory.TRANSFORM, 'showcase-transform-hide-free-node', HideFreeNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: ['1', '2', '3', '4', '5', '6'].map((id) => ({ id })),
          edges: [
            { source: '1', target: '2' },
            { source: '2', target: '3' },
            { source: '3', target: '5' },
          ],
        },
        node: { style: { size: 26, fill: '#61DDAA', labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#4a5a7a', endArrow: true } },
        layout: { type: 'antv-dagre', rankdir: 'LR', nodesep: 20, ranksep: 50 },
        transforms: ['showcase-transform-hide-free-node'],
      }),
    );
    await graph.render();

    // Nodes 4 and 6 have no edges: they are in the data but never drawn while the transform is on.
    const setHidden = async (hide: boolean): Promise<void> => {
      graph.setTransforms(hide ? ['showcase-transform-hide-free-node'] : []);
      await graph.render();
    };
    if (stage.bar) toggle(stage.bar, 'hide-free-node transform', true, (v) => void setHidden(v));
    else stage.every(1500, (i) => setHidden(i % 2 === 0));
  });

export default mount;
