// Interaction: onNodeDrag and onNodeDragEnd report how far a dragged node moved
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { clusters, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number; fx?: number; fy?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a node. The others follow through the link and charge forces.' });
  const log = stage.bar && readout(stage.bar, 'Drag a node');
  let pin = false;

  const data = clusters(3, 10);
  const graph = stage.own(new ForceGraph<Node>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .onNodeDrag((node, translate) => {
      if (log) log.textContent = `dragging ${node.name}: moved ${translate.x.toFixed(1)}, ${translate.y.toFixed(1)} since the last call`;
    })
    .onNodeDragEnd((node, translate) => {
      // Fixing fx/fy keeps the node where it was dropped; leaving them lets the forces take it back.
      if (pin) {
        node.fx = node.x;
        node.fy = node.y;
      }
      if (log) log.textContent = `dropped ${node.name}: ${translate.x.toFixed(1)}, ${translate.y.toFixed(1)} from where it started${pin ? ', pinned' : ''}`;
    });

  if (stage.bar) checkbox(stage.bar, 'pin nodes where dropped (fx, fy)', pin, (v) => (pin = v));

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(0, 20));
    const ghost = stage.ghost(graph);
    const hubs = data.nodes.filter((n) => String(n.id).endsWith('-0')) as Node[];
    let i = 0;
    stage.after(3200, () => {
      const step = (): void => {
        if (stage.disposed) return;
        const node = hubs[i++ % hubs.length]!;
        const angle = i * 2.1;
        void ghost.drag(node, Math.cos(angle) * 50, Math.sin(angle) * 35, 1000).then(() => {
          // The drag reheats the layout and may push nodes out of the small card: fit again.
          stage.after(1200, () => graph.zoomToFit(500, 20));
          stage.after(2200, step);
        });
      };
      step();
    });
  }

  return stage.dispose;
};

export default mount;
