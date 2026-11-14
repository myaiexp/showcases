// All seven built-in edge types from the extensions list, each between its own pair of nodes
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const TYPES = ['line', 'polyline', 'quadratic', 'cubic', 'cubic-horizontal', 'cubic-vertical', 'cubic-radial'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const nodes = TYPES.flatMap((type, i) => [
      { id: `${type}-s`, style: { x: 0, y: i * 60 } },
      { id: `${type}-t`, style: { x: 220, y: i * 60 + (i % 2 ? 30 : -20) } },
    ]);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes,
          edges: TYPES.map((type) => ({ id: type, type, source: `${type}-s`, target: `${type}-t` })),
        },
        node: { style: { size: 10 } },
        edge: { style: { endArrow: true, labelText: (d) => d.id, labelFontSize: 11, labelBackground: true } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    if (stage.preview) stage.every(700, (i) => graph.setElementState({ [TYPES[(i + 6) % 7]!]: [], [TYPES[i % 7]!]: 'selected' }));
  });

export default mount;
