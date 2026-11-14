// The Canvas object behind a graph: layers, camera, root and cursor
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = gridData(3, 2, 70, 90, 70);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: 20, labelText: (d) => String(d.id) } },
        edge: { style: { stroke: '#4a5a78' } },
        behaviors: ['zoom-canvas'],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const canvas = graph.getCanvas();
    const report = () => {
      const layers = Object.keys(canvas.getLayers());
      const counts = layers.map((l) => `${l}:${canvas.getRoot(l as 'main').childElementCount}`);
      show(`layers  ${layers.join(', ')}\nroot children  ${counts.join('  ')}\ncamera zoom  ${canvas.getCamera().getZoom().toFixed(2)}`);
    };
    report();

    let added = 0;
    const add = async () => {
      graph.addNodeData([{ id: `extra-${added}`, style: { x: 60 + (added % 5) * 40, y: 170 } }]);
      added++;
      await graph.draw();
      report();
    };

    if (stage.bar) {
      select(stage.bar, 'setCursor', ['default', 'pointer', 'crosshair', 'grab', 'move', 'not-allowed'] as const, 'default', (c) => canvas.setCursor(c));
      button(stage.bar, 'add a node', () => void add());
      graph.on('canvas:wheel', () => window.setTimeout(report, 50));
    } else {
      stage.every(1200, (i) => (i % 2 ? graph.zoomBy(0.7, { duration: 400 }).then(report) : add()));
    }
  });

export default mount;
