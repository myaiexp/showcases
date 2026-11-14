// legend item layout: flex or grid, with row and column limits
import { Graph } from '@antv/g6';
import type { EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { legendData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: legendData(),
        node: { style: { size: 22 }, palette: { field: 'cluster' } },
        edge: { style: { lineWidth: 2, stroke: (d: EdgeData) => (d.data?.cluster === 'edge-type1' ? '#1783ff' : '#f08f56') } },
        layout: { type: 'grid', cols: 2 },
        autoFit: 'view',
        padding: stage.preview ? 40 : 70,
        plugins: [
          { type: 'legend', key: 'legend', nodeField: 'cluster', edgeField: 'cluster', itemLabelFill: '#d6dcea', layout: 'flex', gridRow: 1, gridCol: 10, position: 'top-left' },
        ],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'legend', ...o });
    if (stage.bar) {
      select(stage.bar, 'layout', ['flex', 'grid'], 'flex', (layout) => up({ layout }));
      select(stage.bar, 'orientation', ['horizontal', 'vertical'], 'horizontal', (orientation) => up({ orientation }));
      slider(stage.bar, 'gridRow', [1, 8, 1], 1, (gridRow) => up({ gridRow }));
      slider(stage.bar, 'gridCol', [1, 10, 1], 10, (gridCol) => up({ gridCol }));
    } else {
      const shapes = [[1, 10], [20, 1], [2, 3], [1, 2]];
      stage.every(1500, (i) => {
        const [gridRow, gridCol] = shapes[i % shapes.length]!;
        up({ gridRow, gridCol });
      });
    }
  });

export default mount;
