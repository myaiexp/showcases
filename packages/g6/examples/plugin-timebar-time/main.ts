// timebar plugin in time mode over nodes that carry data.timestamp
import { Graph, Timebar } from '@antv/g6';
import type { Mount } from '@/types.ts';
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
        behaviors: ['drag-canvas'],
        autoFit: 'view',
        padding: [10, 10, stage.preview ? 56 : 110, 10],
        plugins: [
          {
            type: 'timebar',
            key: 'timebar',
            data: timebarSeries(),
            timebarType: 'time',
            loop: true,
            width: stage.preview ? 250 : 450,
            height: stage.preview ? 44 : 100,
          },
        ],
      }),
    );
    await graph.render();

    // play() is what the play button calls; a card has nobody to press it.
    if (stage.preview) graph.getPluginInstance<Timebar>('timebar').play();
  });

export default mount;
