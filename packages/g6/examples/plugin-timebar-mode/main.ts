// timebar mode and elementTypes, changed on a live graph
import { Graph, Timebar } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { timeData, timebarSeries } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: timeData(),
        node: { style: { size: stage.preview ? 10 : 22, fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid', cols: 5 },
        autoFit: 'view',
        padding: [10, 10, stage.preview ? 56 : 110, 10],
        plugins: [
          {
            type: 'timebar',
            key: 'timebar',
            data: timebarSeries(),
            mode: 'visibility',
            elementTypes: ['node', 'edge'],
            loop: true,
            width: stage.preview ? 250 : 450,
            height: stage.preview ? 44 : 100,
          },
        ],
      }),
    );
    await graph.render();

    const tb = graph.getPluginInstance<Timebar>('timebar');
    if (stage.bar) {
      select(stage.bar, 'mode', ['visibility', 'modify'], 'visibility', (mode) => graph.updatePlugin({ key: 'timebar', mode }));
      select(stage.bar, 'elementTypes', ['node + edge', 'node'], 'node + edge', (v) =>
        graph.updatePlugin({ key: 'timebar', elementTypes: v === 'node' ? ['node'] : ['node', 'edge'] }),
      );
    } else {
      tb.play();
    }
  });

export default mount;
