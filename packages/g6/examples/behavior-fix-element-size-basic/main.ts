// fix-element-size: elements keep their screen size while the view zooms
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const nodes = [
  ['n1', 200, 100], ['n2', 360, 100], ['n3', 280, 220], ['n4', 120, 220], ['n5', 440, 220],
] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: nodes.map(([id, x, y]) => ({ id, style: { x, y, labelText: id } })),
          edges: ([['n1', 'n2'], ['n1', 'n3'], ['n2', 'n3'], ['n1', 'n4'], ['n2', 'n5']] as [string, string][]).map(([source, target]) => ({ source, target })),
        },
        node: { style: { labelPlacement: 'bottom', labelFill: '#ddd', labelFontSize: 14 } },
        behaviors: ['zoom-canvas', 'drag-canvas', { type: 'fix-element-size', key: 'fix', enable: true }],
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Scroll to zoom: nodes, edge widths and labels hold their screen size.';
      toggle(stage.bar, 'enable', true, (enable) => graph.updateBehavior({ key: 'fix', enable }));
    } else {
      const zooms = [0.4, 2, 1];
      stage.every(2000, (i) => graph.zoomTo(zooms[i % zooms.length]!, { duration: 1000 }));
    }
  });

export default mount;
