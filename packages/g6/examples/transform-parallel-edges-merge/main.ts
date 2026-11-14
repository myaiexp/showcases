// process-parallel-edges in merge mode: parallel edges collapse into one styled edge
import { Graph } from '@antv/g6';
import type { EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { parallelGraph } from '../../shared/transform-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const merged = (mode: 'merge' | 'bundle') => ({
      key: 'parallel',
      type: 'process-parallel-edges',
      mode,
      // style receives the edges that were merged: thicker line the more of them there are.
      style: (prev: EdgeData[]) => ({ stroke: '#E86452', lineWidth: 1 + prev.length * 2 }),
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: parallelGraph(),
        node: { style: { size: 22, fill: '#5B8FF9', labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#F6BD16', lineWidth: 2 } },
        transforms: [merged('merge')],
      }),
    );
    await graph.render();

    const setMerge = async (on: boolean): Promise<void> => {
      graph.setTransforms([merged(on ? 'merge' : 'bundle')]);
      await graph.render();
    };
    if (stage.bar) toggle(stage.bar, 'merge (off = bundle)', true, (v) => void setMerge(v));
    else stage.every(1600, (i) => setMerge(i % 2 === 0));
  });

export default mount;
