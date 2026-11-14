// Edges join named ports via sourcePort and targetPort; linkToCenter
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const ports = (linkToCenter: boolean) => [
      { key: 'in1', placement: [0, 0.25] as [number, number], r: 5, fill: '#52C41A', linkToCenter },
      { key: 'in2', placement: [0, 0.75] as [number, number], r: 5, fill: '#52C41A', linkToCenter },
      { key: 'out1', placement: [1, 0.25] as [number, number], r: 5, fill: '#FF4D4F', linkToCenter },
      { key: 'out2', placement: [1, 0.75] as [number, number], r: 5, fill: '#FF4D4F', linkToCenter },
    ];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            { id: 'a', style: { x: 40, y: 70 } },
            { id: 'b', style: { x: 230, y: 70 } },
            { id: 'c', style: { x: 420, y: 70 } },
          ],
          edges: [
            // Parallel edges need their own ids (the default is source-target). Crossed on purpose: out1 feeds in2 and out2 feeds in1.
            { id: 'e1', source: 'a', target: 'b', style: { sourcePort: 'out1', targetPort: 'in2' } },
            { id: 'e2', source: 'a', target: 'b', style: { sourcePort: 'out2', targetPort: 'in1' } },
            { id: 'e3', source: 'b', target: 'c', style: { sourcePort: 'out1', targetPort: 'in1' } },
          ],
        },
        node: { type: 'rect', style: { size: [70, 60], fill: '#2a3550', stroke: '#5B8FF9', ports: ports(false), portStroke: '#fff', portLineWidth: 1 } },
        edge: { style: { stroke: '#8fb4ff', lineWidth: 2, endArrow: true } },
      }),
    );
    await graph.render();

    const setLink = async (linkToCenter: boolean): Promise<void> => {
      graph.updateNodeData(['a', 'b', 'c'].map((id) => ({ id, style: { ports: ports(linkToCenter) } })));
      await graph.draw();
    };

    if (stage.bar) toggle(stage.bar, 'linkToCenter', false, (v) => void setLink(v));
    else stage.every(1500, (i) => setLink(i % 2 === 1));
  });

export default mount;
