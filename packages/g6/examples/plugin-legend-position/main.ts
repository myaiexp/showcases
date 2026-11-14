// legend position presets, and x/y which override them
import { Graph } from '@antv/g6';
import type { EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { legendData } from '../../shared/plugin-data.ts';

const POSITIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom', 'right-top', 'right-bottom'];

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
        plugins: [{ type: 'legend', key: 'legend', nodeField: 'cluster', edgeField: 'cluster', itemLabelFill: '#d6dcea', position: 'top-left' }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'position', POSITIONS, 'top-left', (position) => graph.updatePlugin({ key: 'legend', position, x: undefined, y: undefined }));
      select(stage.bar, 'x, y', ['unset', '20, 20', '200, 120', '400, 300'], 'unset', (v) => {
        const [x, y] = v === 'unset' ? [undefined, undefined] : v.split(', ').map(Number);
        graph.updatePlugin({ key: 'legend', x, y });
      });
    } else {
      stage.every(1300, (i) => graph.updatePlugin({ key: 'legend', position: POSITIONS[i % POSITIONS.length] }));
    }
  });

export default mount;
