// edge.palette with type group: edges of one data.direction share a colour
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const SCHEMES: Record<string, string[]> = {
  'orange / teal': ['#F08F56', '#00C9C9'],
  'blue / pink': ['#1783FF', '#FF85C0'],
  'green / gold': ['#52C41A', '#FFC53D'],
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [1, 2, 3, 4, 5, 6].map((n) => ({ id: `node-${n}` })),
          edges: [
            { source: 'node-1', target: 'node-2', data: { direction: 'out' } },
            { source: 'node-1', target: 'node-3', data: { direction: 'out' } },
            { source: 'node-1', target: 'node-4', data: { direction: 'out' } },
            { source: 'node-5', target: 'node-1', data: { direction: 'in' } },
            { source: 'node-6', target: 'node-1', data: { direction: 'in' } },
          ],
        },
        node: { style: { size: 14 } },
        layout: { type: 'radial', unitRadius: 80, linkDistance: 80 },
        edge: {
          style: { endArrow: true, lineWidth: 2 },
          palette: { type: 'group', field: 'direction', color: SCHEMES['orange / teal']! },
        },
      }),
    );
    await graph.render();
    const names = Object.keys(SCHEMES);
    const set = async (name: string): Promise<void> => {
      graph.setEdge({
        style: { endArrow: true, lineWidth: 2 },
        palette: { type: 'group', field: 'direction', color: SCHEMES[name]! },
      });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'palette.color', names, names[0]!, (v) => void set(v));
    else stage.every(1500, (i) => set(names[i % names.length]!));
  });

export default mount;
