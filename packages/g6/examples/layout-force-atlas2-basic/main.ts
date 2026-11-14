// The docs' basic force-atlas2 example with a preventOverlap toggle
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ringGraph, toggleOption } from '../../shared/layout-data.ts';

// node1..node15 in a ring, plus the seven chords the docs add.
const ring = () => {
  const data = ringGraph(15, 0);
  for (let i = 0; i < 7; i++) data.edges?.push({ id: `chord${i}`, source: `n${i}`, target: `n${i + 7}` });
  return data;
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force-atlas2', preventOverlap: true, kr: 20, nodeSize: 24 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: ring(),
        node: {
          style: { size: 24 },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    toggleOption(stage, graph, layout, 'preventOverlap', { preventOverlap: true }, { preventOverlap: false }, true, 3000);
  });

export default mount;
