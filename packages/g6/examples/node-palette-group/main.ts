// node.palette groups nodes by a data field, one fill colour per category
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const CATEGORIES = ['A', 'B', 'C', 'D', 'E'];
const COLORS = ['#1783FF', '#F08F56', '#D580FF', '#00C9C9', '#7863FF'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: Array.from({ length: 10 }, (_, i) => ({ id: `node-${i}`, data: { category: CATEGORIES[i % 5], parity: i % 2 ? 'odd' : 'even' } })),
        },
        layout: { type: 'grid', cols: 5 },
        node: {
          style: { size: 30, labelText: (d) => String(d.data?.category) },
          palette: { type: 'group', field: 'category', color: COLORS },
        },
      }),
    );
    await graph.render();

    // Changing the grouping field regroups the colours; same-field nodes always match.
    const group = async (field: 'category' | 'parity' | 'id'): Promise<void> => {
      graph.setNode({
        style: { size: 30, labelText: (d) => String(d.data?.[field] ?? d.id) },
        palette: { type: 'group', field: field === 'id' ? undefined : field, color: COLORS },
      });
      await graph.draw();
    };

    if (stage.bar) select(stage.bar, 'field', ['category', 'parity', 'id'] as const, 'category', (v) => void group(v));
    else stage.every(1500, (i) => group((['category', 'parity', 'id'] as const)[i % 3]!));
  });

export default mount;
