// cubic-horizontal edges on a left-to-right dagre layout, with curve sliders
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const edgeOf = (pos: number, off: number): EdgeOptions => ({
  type: 'cubic-horizontal',
  style: { endArrow: true, labelText: (d) => String(d.id), labelBackground: true, labelFontSize: 9, curvePosition: [pos, 1 - pos], curveOffset: [off, off] },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let pos = 0.5;
    let off = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: ['node1', 'node2', 'node3', 'node4', 'node5', 'node6'].map((id) => ({ id })),
          edges: [
            { id: 'line-default', source: 'node1', target: 'node2' },
            { id: 'line-active', source: 'node1', target: 'node3', states: ['active'] },
            { id: 'line-selected', source: 'node1', target: 'node4', states: ['selected'] },
            { id: 'line-highlight', source: 'node1', target: 'node5', states: ['highlight'] },
            { id: 'line-inactive', source: 'node1', target: 'node6', states: ['inactive'] },
          ],
        },
        // Ports on the left and right let the edges leave and enter sideways.
        node: { style: { size: 12, port: true, ports: [{ placement: 'right' }, { placement: 'left' }] } },
        edge: edgeOf(pos, off),
        layout: { type: 'antv-dagre', rankdir: 'LR', nodesep: 14, ranksep: 90 },
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(pos, off));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'curvePosition[0] (second is 1 minus it)', [0, 1, 0.05], pos, (v) => ((pos = v), void apply()));
      slider(stage.bar, 'curveOffset', [-60, 60, 1], off, (v) => ((off = v), void apply()));
    } else {
      stage.every(1200, (i) => ((pos = [0.5, 0.2, 0.8, 0.5][i % 4]!), (off = [0, 0, 0, 30][i % 4]!), apply()));
    }
  });

export default mount;
