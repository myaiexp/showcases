// Quadratic edge curveOffset and curvePosition, with draggable nodes
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const edgeOf = (offset: number, position: number): EdgeOptions => ({
  type: 'quadratic',
  style: { stroke: '#7e3feb', lineWidth: 2, curveOffset: offset, curvePosition: position, labelText: 'quadratic', labelBackground: true, labelBackgroundFill: '#f9f0ff', labelFill: '#222' },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let offset = 30;
    let position = 0.5;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'node1', style: { x: 40, y: 120 } },
            { id: 'node2', style: { x: 240, y: 80 } },
          ],
          edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
        },
        node: { style: { fill: '#f8f8f8', stroke: '#8b9baf' } },
        edge: edgeOf(offset, position),
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(offset, position));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'curveOffset', [-100, 100, 1], offset, (v) => ((offset = v), void apply()));
      slider(stage.bar, 'curvePosition', [0, 1, 0.05], position, (v) => ((position = v), void apply()));
    } else {
      const steps: [number, number][] = [[30, 0.5], [80, 0.5], [80, 0.2], [-60, 0.8]];
      stage.every(1200, (i) => ([offset, position] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
