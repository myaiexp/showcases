// Node config priority: setNode over global node.style over per-node data style
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: {
          nodes: [
            // 'global' has no style of its own; 'own' sets stroke and fill in its data.
            { id: 'global', style: { x: 60, y: 60 } },
            { id: 'own', style: { x: 180, y: 60, stroke: '#FF7A45', fill: '#7a2e12' } },
            { id: 'kept', style: { x: 300, y: 60, stroke: '#61DDAA' } },
          ],
        },
        node: {
          style: {
            size: 50,
            lineWidth: 4,
            fill: '#7FFFD4',
            labelText: (d: NodeData) => d.id,
            // Reading the datum first puts the data's own stroke above the global one.
            stroke: (d: NodeData) => (d.style?.stroke as string | undefined) ?? '#5CACEE',
          },
        },
      }),
    );
    await graph.render();

    // setNode has the top priority: it overrides the data's fill but not what it leaves unset.
    const override = async (on: boolean): Promise<void> => {
      graph.setNode(
        on
          ? { style: { size: 50, lineWidth: 4, fill: '#B37FEB', labelText: (d: NodeData) => d.id, stroke: (d: NodeData) => (d.style?.stroke as string | undefined) ?? '#5CACEE' } }
          : { style: { size: 50, lineWidth: 4, fill: '#7FFFD4', labelText: (d: NodeData) => d.id, stroke: (d: NodeData) => (d.style?.stroke as string | undefined) ?? '#5CACEE' } },
      );
      await graph.draw();
    };

    if (stage.bar) {
      button(stage.bar, 'setNode: fill violet', () => void override(true));
      button(stage.bar, 'setNode: fill aquamarine', () => void override(false));
    } else {
      stage.every(1500, (i) => override(i % 2 === 1));
    }
  });

export default mount;
