// A palette without register: an inline colour array on nodes, an inline interpolator on edges
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const nodes = ['a', 'b', 'c', 'd', 'e', 'f'].map((id, i) => ({ id, data: { category: 'XYZ'[i % 3] } }));
    const edges = [
      ['a', 'b', 10], ['b', 'c', 40], ['c', 'd', 70], ['d', 'e', 100], ['e', 'f', 25], ['f', 'a', 55],
    ].map(([source, target, value]) => ({ source: String(source), target: String(target), data: { value } }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 28,
        data: { nodes, edges },
        layout: { type: 'circular', radius: 70 },
        node: {
          style: { size: 28, labelText: (d) => d.id },
          // color as an array: no registered name is needed.
          palette: { type: 'group', field: 'category', color: ['#5B8FF9', '#61DDAA', '#F6BD16'] },
        },
        edge: {
          style: { lineWidth: 3 },
          // color as a function: edge value rescaled to 0..1 gives the stroke.
          palette: { type: 'value', field: 'value', color: (t: number) => `rgb(${Math.round(80 + t * 175)}, ${Math.round(120 - t * 80)}, ${Math.round(255 - t * 200)})` },
        },
      }),
    );
    await graph.render();

    const setEdges = async (on: boolean): Promise<void> => {
      graph.setEdge({
        style: { lineWidth: 3 },
        palette: on
          ? { type: 'value', field: 'value', color: (t: number) => `rgb(${Math.round(80 + t * 175)}, ${Math.round(120 - t * 80)}, ${Math.round(255 - t * 200)})` }
          : undefined,
      });
      await graph.draw();
    };
    if (stage.bar) toggle(stage.bar, 'edge palette', true, (v) => void setEdges(v));
    else stage.every(1500, (i) => setEdges(i % 2 === 0));
  });

export default mount;
