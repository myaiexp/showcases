// collapseElement and expandElement on a tree node, with and without align: the folded node keeps its place
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const kids: Record<string, string[]> = { root: ['a', 'b'], a: ['a1', 'a2', 'a3'], b: ['b1'] };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const nodes = ['root', 'a', 'b', 'a1', 'a2', 'a3', 'b1'].map((id) => ({ id, children: kids[id] ?? [] }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes, edges: nodes.flatMap((n) => n.children.map((c) => ({ source: n.id, target: c }))) },
        node: { style: { size: 26, labelText: (d: NodeData) => d.id, labelPlacement: 'right', labelOffsetX: 4 } },
        edge: { style: { stroke: '#4a5a7a' } },
        layout: { type: 'compact-box', direction: 'LR', getHeight: () => 26, getWidth: () => 26, getVGap: () => 14, getHGap: () => 60 },
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();

    // 'a' is the fold target: with align its screen position stays put, without it the layout re-centres.
    let align = true;
    let folded = false;
    const flip = async (): Promise<void> => {
      folded = !folded;
      await (folded ? graph.collapseElement('a', { animation: true, align }) : graph.expandElement('a', { animation: true, align }));
    };
    if (stage.bar) {
      toggle(stage.bar, 'align', align, (v) => (align = v));
      button(stage.bar, 'collapse / expand node a', () => void flip());
    } else {
      stage.every(1700, async (i) => {
        align = Math.floor((i - 1) / 2) % 2 === 1;
        await flip();
      });
    }
  });

export default mount;
