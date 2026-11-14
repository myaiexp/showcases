// Node positions computed from getSize and recomputed when the size changes
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: ['nw', 'ne', 'sw', 'se', 'center'].map((id) => ({ id, style: { x: 0, y: 0 } })),
          edges: ['nw', 'ne', 'sw', 'se'].map((id) => ({ id: `e-${id}`, source: id, target: 'center' })),
        },
        node: { style: { size: 16, labelText: (d) => String(d.id) } },
        edge: { style: { stroke: '#4a5a78' } },
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const place = async () => {
      const [width, height] = graph.getSize();
      const m = 30;
      const pos: Record<string, [number, number]> = {
        nw: [m, m], ne: [width - m, m], sw: [m, height - m], se: [width - m, height - m], center: [width / 2, height / 2],
      };
      graph.updateNodeData(Object.entries(pos).map(([id, [x, y]]) => ({ id, style: { x, y } })));
      await graph.draw();
      show(`getSize() -> [${width}, ${height}]`);
    };
    graph.on(GraphEvent.AFTER_SIZE_CHANGE, () => void place());
    await place();

    if (stage.bar) {
      slider(stage.bar, 'width', [300, 900, 20], graph.getSize()[0], (w) => graph.resize(w, graph.getSize()[1]));
      slider(stage.bar, 'height', [200, 560, 10], graph.getSize()[1], (h) => graph.resize(graph.getSize()[0], h));
    } else {
      const sizes: [number, number][] = [[170, 130], [260, 200], [220, 110]];
      stage.every(1400, (i) => graph.resize(...sizes[i % sizes.length]!));
    }
  });

export default mount;
