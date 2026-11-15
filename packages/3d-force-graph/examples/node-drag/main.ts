// Interaction: onNodeDrag and onNodeDragEnd report how far a dragged node moved in 3D
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { clusters, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number; z?: number; fx?: number; fy?: number; fz?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a node. The others follow through the link and charge forces.' });
  const log = stage.bar && readout(stage.bar, 'Drag a node');
  let pin = false;
  const fmt = (t: { x: number; y: number; z: number }): string => [t.x, t.y, t.z].map((v) => v.toFixed(1)).join(', ');

  const data = clusters(3, 10);
  const graph = stage.own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node>)
    .graphData(data)
    .nodeAutoColorBy('group')
    .onNodeDrag((node, translate) => {
      if (log) log.textContent = `dragging ${node.name}: moved ${fmt(translate)} since the last call`;
    })
    .onNodeDragEnd((node, translate) => {
      // Fixing fx/fy/fz keeps the node where it was dropped; leaving them lets the forces take it back.
      if (pin) {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }
      if (log) log.textContent = `dropped ${node.name}: ${fmt(translate)}${pin ? ', pinned' : ''}`;
    });

  if (stage.bar) checkbox(stage.bar, 'pin nodes where dropped (fx, fy, fz)', pin, (v) => (pin = v));

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(0, 20));
    const hubs = data.nodes.filter((n) => String(n.id).endsWith('-0')) as Node[];
    let i = 0;
    const step = (): void => {
      if (stage.disposed) return;
      const node = hubs[i++ % hubs.length]!;
      const angle = i * 2.1;
      void ghost.drag(node, Math.cos(angle) * 50, Math.sin(angle) * 35, 1000).then(() => stage.after(1800, step));
    };
    stage.after(3200, step);
  }

  return stage.dispose;
};

export default mount;
