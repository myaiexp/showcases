// fisheye lens style and the style given to magnified nodes
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { gridData } from '../../shared/plugin-data.ts';
import { atNode, lensHandler } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const cols = stage.preview ? 9 : 12;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(stage.preview ? 27 : 60, cols),
        node: { style: { size: stage.preview ? 10 : 14, fill: '#8b9baf', labelText: (d) => d.id, labelFill: '#fff', labelFontSize: 9 } },
        edge: { style: { stroke: '#8b9baf88' } },
        layout: { type: 'grid', cols },
        autoFit: 'view',
        padding: 16,
        plugins: [
          {
            type: 'fisheye',
            key: 'fisheye',
            r: stage.preview ? 60 : 130,
            d: 2,
            showDPercent: false,
            style: { fill: '#2f54eb', fillOpacity: 0.2, stroke: '#85a5ff', strokeOpacity: 0.9, lineWidth: 1.5, shadowColor: '#2f54eb', shadowBlur: 10 },
            nodeStyle: {
              size: stage.preview ? 18 : 28,
              fill: '#d6e4ff',
              stroke: '#2f54eb',
              lineWidth: 2,
              labelFill: '#1d39c4',
              labelFontSize: 12,
              labelFontWeight: 'bold',
              labelBackground: true,
              labelBackgroundFill: '#ffffff',
              labelBackgroundOpacity: 0.85,
            },
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'showDPercent', false, (showDPercent) => graph.updatePlugin({ key: 'fisheye', showDPercent }));
    } else {
      const move = lensHandler(graph.getPluginInstance('fisheye'), 'onCreateFisheye');
      // The lens's first move fails on node labels; park it off-canvas once so later moves work.
      if (stage.preview) move({ canvas: { x: -9999, y: -9999 } });
      const path = ['g4', 'g12', 'g14', 'g22'];
      stage.every(800, (i) => move(atNode(graph, path[i % path.length]!)));
    }
  });

export default mount;
