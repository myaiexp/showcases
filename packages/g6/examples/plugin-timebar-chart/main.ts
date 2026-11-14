// timebar plugin in chart mode, with a value per day
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
        autoFit: 'view',
        padding: [10, 10, stage.preview ? 62 : 110, 10],
        plugins: [
          {
            type: 'timebar',
            key: 'timebar',
            data: timebarSeries([10, 2, 3, 4, 15]),
            timebarType: 'chart',
            loop: true,
            width: stage.preview ? 250 : 450,
            height: stage.preview ? 50 : 100,
            labelFormatter: (time: number | Date) => new Date(time).toISOString().slice(5, 10),
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) graph.getPluginInstance<Timebar>('timebar').play();
  });

export default mount;
