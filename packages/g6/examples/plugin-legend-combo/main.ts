// legend with a third group: combos, read from data.cluster
import { Graph } from '@antv/g6';
import type { ComboData, EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a1', combo: 'c1', style: { x: 60, y: 50 }, data: { cluster: 'worker' } },
            { id: 'a2', combo: 'c1', style: { x: 60, y: 130 }, data: { cluster: 'worker' } },
            { id: 'b1', combo: 'c2', style: { x: 200, y: 50 }, data: { cluster: 'queue' } },
            { id: 'b2', combo: 'c2', style: { x: 200, y: 130 }, data: { cluster: 'worker' } },
          ],
          edges: [
            { source: 'a1', target: 'a2', data: { cluster: 'sync' } },
            { source: 'a2', target: 'b1', data: { cluster: 'async' } },
            { source: 'b1', target: 'b2', data: { cluster: 'sync' } },
          ],
          combos: [
            { id: 'c1', data: { cluster: 'zone-1' } },
            { id: 'c2', data: { cluster: 'zone-2' } },
          ],
        },
        node: { style: { size: 18 }, palette: { field: 'cluster' } },
        edge: { style: { lineWidth: 2, stroke: (d: EdgeData) => (d.data?.cluster === 'sync' ? '#1783ff' : '#f08f56') } },
        combo: {
          style: {
            lineWidth: 2,
            fillOpacity: 0.1,
            fill: (d: ComboData) => (d.data?.cluster === 'zone-1' ? '#f04864' : '#d580ff'),
            stroke: (d: ComboData) => (d.data?.cluster === 'zone-1' ? '#f04864' : '#d580ff'),
          },
        },
        autoFit: 'view',
        padding: stage.preview ? [10, 20, 60, 20] : [20, 20, 90, 20],
        plugins: [
          {
            type: 'legend',
            nodeField: 'cluster',
            edgeField: 'cluster',
            comboField: 'cluster',
            itemLabelFill: '#d6dcea',
            itemLabelFontSize: stage.preview ? 10 : 12,
            itemMarkerSize: stage.preview ? 10 : 12,
            position: 'bottom-left',
            layout: 'flex',
            gridCol: 3,
            gridRow: 2,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) stage.every(1500, (i) => graph.translateBy([i % 2 ? 16 : -16, 0], { duration: 900 }));
  });

export default mount;
