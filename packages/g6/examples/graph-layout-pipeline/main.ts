// layout as one object, or as an array that runs several layouts as a pipeline
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Form = 'object' | 'array (pipeline)';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const nodes = Array.from({ length: 16 }, (_, i) => ({ id: `n${i}`, data: { group: i < 8 ? 'ring' : 'grid' } }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes,
          edges: nodes.slice(1).map((n, i) => ({ source: `n${i}`, target: n.id })),
        },
        node: {
          style: { size: 16 },
          palette: { field: 'group', color: 'tableau' },
        },
        autoFit: 'view',
        layout: { type: 'circular' },
      }),
    );
    await graph.render();

    // In a pipeline each layout takes the nodes its nodeFilter accepts, one after another.
    const layouts = {
      object: { type: 'circular' },
      'array (pipeline)': [
        { type: 'circular', center: [0, 0], radius: 90, nodeFilter: (d: { data?: { group?: string } }) => d.data?.group === 'ring' },
        { type: 'grid', begin: [140, -60], cols: 4, width: 200, height: 120, nodeFilter: (d: { data?: { group?: string } }) => d.data?.group === 'grid' },
      ],
    } as const;
    const apply = async (form: Form): Promise<void> => {
      // G6's LayoutOptions union is keyed by type; this table of two forms is typed loosely.
      graph.setOptions({ layout: layouts[form] as never });
      await graph.layout();
      await graph.fitView({}, { duration: 400 });
    };

    if (stage.bar) select(stage.bar, 'layout', ['object', 'array (pipeline)'] as const, 'object', (v) => void apply(v));
    else stage.every(2400, (i) => apply(i % 2 ? 'object' : 'array (pipeline)'));
  });

export default mount;
