// The docs' real case: the Quality fishbone with vGap, hGap and direction RL
import { Graph, treeToGraphData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { quality } from '../../shared/layout-fishbone-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: treeToGraphData(quality),
        node: {
          type: 'rect',
          style: {
            size: [90, 22],
            radius: 3,
            labelText: (d) => d.id,
            labelFill: '#fff',
            labelFontSize: 9,
            labelPlacement: 'center',
            labelWordWrap: true,
            labelMaxWidth: '100%',
            labelMaxLines: 2,
          },
        },
        edge: { type: 'polyline', style: { lineWidth: 2 } },
        layout: { type: 'fishbone', direction: 'RL', vGap: 40, hGap: 50 },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        animation: false,
      }),
    );
    await graph.render();
  });

export default mount;
