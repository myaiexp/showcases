// legend title and item spacing options
import { Graph } from '@antv/g6';
import type { EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { legendData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(
    el,
    ctx,
    async (stage) => {
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
            {
              type: 'legend',
              key: 'legend',
              nodeField: 'cluster',
              edgeField: 'cluster',
              position: 'top-left',
              showTitle: true,
              titleText: 'Categories',
              titleFill: '#ffffff',
              itemLabelFill: '#d6dcea',
              itemSpacing: 6,
              rowPadding: 6,
              colPadding: 8,
              itemMarkerSize: 12,
              itemLabelFontSize: 12,
            },
          ],
        }),
      );
      await graph.render();

      const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'legend', ...o });
      if (stage.bar) {
        toggle(stage.bar, 'showTitle', true, (showTitle) => up({ showTitle }));
        slider(stage.bar, 'itemSpacing', [0, 20, 1], 6, (itemSpacing) => up({ itemSpacing }));
        slider(stage.bar, 'rowPadding', [0, 20, 1], 6, (rowPadding) => up({ rowPadding }));
        slider(stage.bar, 'colPadding', [0, 20, 1], 8, (colPadding) => up({ colPadding }));
        slider(stage.bar, 'itemMarkerSize', [12, 20, 1], 12, (itemMarkerSize) => up({ itemMarkerSize }));
        slider(stage.bar, 'itemLabelFontSize', [12, 20, 1], 12, (itemLabelFontSize) => up({ itemLabelFontSize }));
      } else {
        stage.every(1300, (i) => up({ itemMarkerSize: 12 + (i % 3) * 3, itemLabelFontSize: 12 + (i % 3) * 2, rowPadding: 4 + (i % 3) * 4, titleText: i % 2 ? 'Categories' : 'Legend' }));
      }
    },
    { height: 520 },
  );

export default mount;
