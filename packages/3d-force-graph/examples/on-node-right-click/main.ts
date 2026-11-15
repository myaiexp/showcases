// Interaction: onNodeRightClick pins a node where it is (fx, fy, fz), and a second right-click frees it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { scramble } from '../../shared/layout.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

type Node = TNode & { fx?: number; fy?: number; fz?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Right-click a node to pin it (orange); pinned nodes stay put when the others are scrambled and settle again.' });
  const log = stage.bar && readout(stage.bar, '0 pinned');

  const data = clusters(3, stage.preview ? 7 : 12) as TData & { nodes: Node[] };
  const pinned = (n: Node): boolean => n.fx !== undefined;
  const count = (): number => data.nodes.filter(pinned).length;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor((n) => (pinned(n) ? '#ff9e64' : '#7aa2f7'))
    .cooldownTime(2500);
  const note = overlay(stage, 'onNodeRightClick');
  const status = (text: string): void => {
    note.textContent = text;
    if (log) log.textContent = `${count()} pinned`;
  };

  const unpin = (n: Node): void => {
    delete n.fx;
    delete n.fy;
    delete n.fz;
  };
  graph.onNodeRightClick((node) => {
    if (pinned(node)) unpin(node);
    else Object.assign(node, { fx: node.x, fy: node.y, fz: node.z });
    graph.nodeColor(graph.nodeColor());
    status(`onNodeRightClick: ${pinned(node) ? 'pinned' : 'freed'} ${node.name}`);
  });

  const shake = (): void => {
    scramble(data.nodes.filter((n) => !pinned(n)), 70);
    graph.d3ReheatSimulation();
    status('unpinned nodes scrambled and reheated');
  };

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 20);
    });
    const pins = [3, 9, 14];
    let i = 0;
    stage.every(2200, () => {
      const step = i++ % 6;
      if (step < 3) {
        const target = data.nodes[pins[step]!]!;
        ghost.node(target);
        stage.after(450, () => ghost.click(2));
      } else if (step === 3) shake();
      else if (step === 5) {
        data.nodes.forEach(unpin);
        graph.nodeColor(graph.nodeColor());
        graph.d3ReheatSimulation();
        status('all freed');
      }
    });
  } else {
    fitOnce(graph);
    if (stage.bar) {
      button(stage.bar, 'Scramble unpinned and reheat', shake);
      button(stage.bar, 'Free all', () => {
        data.nodes.forEach(unpin);
        graph.nodeColor(graph.nodeColor());
        graph.d3ReheatSimulation();
        status('all freed');
      });
    }
  }

  return stage.dispose;
};

export default mount;
