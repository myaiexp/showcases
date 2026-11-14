// Four bubble-sets plugins, one per cluster (cluster.json for collection.json)
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

const COLOURS: Record<string, string> = { a: '#1783ff', b: '#00c9c9', c: '#f08f56', d: '#d580ff' };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('cluster');
    const members: Record<string, string[]> = {};
    for (const n of data.nodes ?? []) (members[String(n.data?.cluster)] ??= []).push(n.id);
    const sets = Object.entries(members).map(([cluster, ids]) => ({
      key: `bubble-sets-${cluster}`,
      type: 'bubble-sets',
      members: ids,
      labelText: `cluster-${cluster}`,
      fill: COLOURS[cluster] ?? '#999',
      stroke: COLOURS[cluster] ?? '#999',
      labelFill: '#fff',
      labelPadding: 2,
      labelBackgroundFill: COLOURS[cluster] ?? '#999',
      labelBackgroundRadius: 5,
    }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
        node: { style: { size: stage.preview ? 8 : 14 }, palette: { field: 'cluster' } },
        edge: { style: { stroke: '#8b9baf55' } },
        layout: { type: 'force', preventOverlap: true, linkDistance: 60 },
        plugins: sets,
        autoFit: 'view',
        padding: 20,
      }),
    );
    await graph.render();

    if (stage.preview) stage.every(2600, () => graph.layout());
  });

export default mount;
