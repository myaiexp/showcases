// Interaction: onNodeDragEnd sets fx, fy and fz, so a node stays where it was dropped
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

type Node = TNode & { fx?: number; fy?: number; fz?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a node and let go: it turns orange and stays put while the others rearrange around it.' });
  const log = stage.bar && readout(stage.bar, '0 pinned');

  const data = team() as TData & { nodes: Node[] };
  const pinned = (n: Node): boolean => n.fx !== undefined;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor((n) => (pinned(n) ? '#ff9e64' : '#7aa2f7'))
    .cooldownTime(2500)
    .onNodeDragEnd((node) => {
      // Dragging fixes the node while held and clears it on release: fix it again here.
      Object.assign(node, { fx: node.x, fy: node.y, fz: node.z });
      graph.nodeColor(graph.nodeColor());
      status(`pinned ${node.name}`);
    });
  const note = overlay(stage, 'onNodeDragEnd');
  const status = (text: string): void => {
    const count = data.nodes.filter(pinned).length;
    note.textContent = `${text}\n${count} pinned`;
    if (log) log.textContent = `${text}: ${count} pinned`;
  };
  const unpinAll = (): void => {
    for (const n of data.nodes) {
      delete n.fx;
      delete n.fy;
      delete n.fz;
    }
    graph.nodeColor(graph.nodeColor());
    graph.d3ReheatSimulation();
    status('all freed');
  };

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 30);
    });
    const names = ['Kai', 'Ada', 'Hana', 'Pia'];
    let i = 0;
    let busy = false;
    stage.every(2600, () => {
      if (busy) return;
      if (i > 0 && i % 5 === 4) {
        i++;
        return unpinAll();
      }
      busy = true;
      const target = data.nodes.find((n) => n.name === names[i++ % names.length])!;
      const sign = i % 2 ? 1 : -1;
      void ghost.drag(target, sign * 22, -18, 800).then(() => (busy = false));
    });
  } else {
    fitOnce(graph);
    if (stage.bar) button(stage.bar, 'Free all', unpinAll);
  }

  return stage.dispose;
};

export default mount;
