// shortest-path startDirections and endDirections: which sides the edge may leave and enter
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const SIDES = ['top', 'right', 'bottom', 'left'] as const;
type Side = (typeof SIDES)[number];
const edgeOf = (s: Side, t: Side): EdgeOptions => ({
  type: 'polyline',
  style: {
    stroke: '#FF85C0',
    lineWidth: 2,
    endArrow: true,
    router: { type: 'shortest-path', startDirections: [s], endDirections: [t], enableObstacleAvoidance: true },
    labelText: `leave ${s}, enter ${t}`,
    labelAutoRotate: false,
    labelBackground: true,
    labelFill: '#222',
    labelBackgroundFill: '#fff0f6',
    labelFontSize: 10,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let s: Side = 'right';
    let t: Side = 'left';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'a', style: { x: 50, y: 40 } },
            { id: 'b', style: { x: 230, y: 130 } },
          ],
          edges: [{ id: 'e', source: 'a', target: 'b' }],
        },
        node: { style: { size: 26 } },
        edge: edgeOf(s, t),
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(s, t));
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'startDirections', SIDES, s, (v) => ((s = v), void apply()));
      select(stage.bar, 'endDirections', SIDES, t, (v) => ((t = v), void apply()));
    } else {
      const steps: [Side, Side][] = [['right', 'left'], ['bottom', 'top'], ['top', 'right'], ['left', 'bottom']];
      stage.every(1400, (i) => ([s, t] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
