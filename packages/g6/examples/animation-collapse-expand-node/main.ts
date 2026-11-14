// node-collapse and node-expand animation stages: children fold into their parent node
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const MODES = {
  'node-collapse / node-expand': { collapse: 'node-collapse', expand: 'node-expand' },
  fade: { collapse: 'fade', expand: 'fade' },
  off: { collapse: false, expand: false },
} as const;
type Mode = keyof typeof MODES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const node = (m: Mode) => ({
      style: { size: 22, fill: '#61DDAA', labelText: (d: { id: string }) => d.id, labelPlacement: 'bottom' as const },
      animation: MODES[m],
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 28,
        data: {
          // children lists the child ids; the fold hides those nodes and the edges to them.
          nodes: [
            { id: 'root', children: ['a', 'b', 'c'] },
            { id: 'a' },
            { id: 'b' },
            { id: 'c' },
          ],
          edges: [
            { source: 'root', target: 'a' },
            { source: 'root', target: 'b' },
            { source: 'root', target: 'c' },
          ],
        },
        node: node('node-collapse / node-expand'),
        edge: { style: { stroke: '#4a5a7a' } },
        layout: { type: 'antv-dagre', rankdir: 'LR', nodesep: 14, ranksep: 70 },
      }),
    );
    await graph.render();

    let mode: Mode = 'node-collapse / node-expand';
    let collapsed = false;
    const flip = async (): Promise<void> => {
      collapsed = !collapsed;
      graph.setNode(node(mode));
      await (collapsed ? graph.collapseElement('root') : graph.expandElement('root'));
    };
    if (stage.bar) {
      select(stage.bar, 'collapse / expand animation', Object.keys(MODES) as Mode[], mode, (v) => (mode = v));
      button(stage.bar, 'toggle collapse of root', () => void flip());
    } else stage.every(1600, flip);
  });

export default mount;
