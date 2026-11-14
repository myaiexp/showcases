// sourcePort and targetPort pick which node ports an edge connects to
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const PORTS = ['top', 'right', 'bottom', 'left'] as const;
type Port = (typeof PORTS)[number];
const edgeOf = (s: Port, t: Port): EdgeOptions => ({
  type: 'polyline',
  style: { stroke: '#5CACEE', lineWidth: 2, endArrow: true, router: { type: 'orth' }, sourcePort: s, targetPort: t, labelAutoRotate: false, labelText: `${s} to ${t}`, labelBackground: true, labelFontSize: 10 },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let s: Port = 'right';
    let t: Port = 'left';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'a', style: { x: 40, y: 40 } },
            { id: 'b', style: { x: 220, y: 130 } },
          ],
          edges: [{ id: 'e', source: 'a', target: 'b' }],
        },
        node: {
          style: {
            size: 30,
            port: true,
            ports: PORTS.map((p) => ({ key: p, placement: p, fill: '#F4664A' })),
            portR: 3,
          },
        },
        edge: edgeOf(s, t),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(s, t));
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'sourcePort', PORTS, s, (v) => ((s = v), void apply()));
      select(stage.bar, 'targetPort', PORTS, t, (v) => ((t = v), void apply()));
    } else {
      const steps: [Port, Port][] = [['right', 'left'], ['bottom', 'left'], ['right', 'top'], ['bottom', 'top']];
      stage.every(1300, (i) => ([s, t] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
