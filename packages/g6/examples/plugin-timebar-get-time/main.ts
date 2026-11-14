// timebar getTime reading data.born, with an initial selection in values
import { Graph } from '@antv/g6';
import type { ElementDatum } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { START, timebarSeries } from '../../shared/plugin-data.ts';

const DAY = 24 * 3600 * 1000;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: Array.from({ length: 15 }, (_, i) => ({ id: `n${i}`, data: { born: START + (i % 5) * DAY } })),
          edges: Array.from({ length: 14 }, (_, i) => ({ source: `n${i}`, target: `n${i + 1}` })),
        },
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
            // Nodes have no `timestamp`: say where their time lives.
            getTime: (datum: ElementDatum) => Number(datum.data?.born),
            // Start with days 2 to 4 selected.
            values: [START + DAY, START + 3 * DAY],
            width: stage.preview ? 250 : 450,
            height: stage.preview ? 44 : 100,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const ranges: [number, number][] = [[START + DAY, START + 3 * DAY], [START, START + DAY], [START + 3 * DAY, START + 4 * DAY]];
      stage.every(1300, (i) => graph.updatePlugin({ key: 'timebar', values: ranges[i % ranges.length] }));
    }
  });

export default mount;
