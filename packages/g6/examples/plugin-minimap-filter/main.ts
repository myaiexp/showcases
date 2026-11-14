// minimap filter: which elements are drawn in the thumbnail
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

type Filter = (id: string, elementType: string) => boolean;
const FILTERS: Record<string, Filter> = {
  everything: () => true,
  'nodes only': (_id, type) => type === 'node',
  'odd nodes only': (id, type) => type === 'node' && Number(id) % 2 === 1,
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('cluster');
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: stage.preview ? 7 : 14 }, palette: { field: 'cluster' } },
        edge: { style: { stroke: '#8b9baf88' } },
        layout: { type: 'circular', radius: stage.preview ? 60 : 150 },
        behaviors: ['drag-canvas', 'zoom-canvas'],
        autoFit: 'center',
        plugins: [{ type: 'minimap', key: 'minimap', shape: 'key', size: stage.preview ? [100, 66] : [240, 160], filter: FILTERS.everything }],
      }),
    );
    await graph.render();

    const names = Object.keys(FILTERS);
    if (stage.bar) {
      select(stage.bar, 'filter', names, 'everything', (n) => graph.updatePlugin({ key: 'minimap', filter: FILTERS[n] }));
    } else {
      stage.every(1400, (i) => graph.updatePlugin({ key: 'minimap', filter: FILTERS[names[i % names.length]!] }));
    }
  });

export default mount;
