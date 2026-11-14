// process-parallel-edges: no transform, bundle and merge side by side through setTransforms
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { parallelGraph } from '../../shared/transform-data.ts';

const MODES = ['none', 'bundle', 'merge'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: parallelGraph(),
        node: { style: { size: 22, fill: '#5B8FF9', labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#F6BD16', lineWidth: 2, endArrow: true } },
        transforms: [],
      }),
    );
    await graph.render();

    // With no transform the parallel edges are drawn on top of each other as straight lines.
    const setMode = async (mode: Mode): Promise<void> => {
      graph.setTransforms(mode === 'none' ? [] : [{ type: 'process-parallel-edges', mode }]);
      await graph.render();
    };
    if (stage.bar) select(stage.bar, 'mode', MODES, 'none', (v) => void setMode(v));
    else stage.every(1500, (i) => setMode(MODES[i % MODES.length]!));
  });

export default mount;
