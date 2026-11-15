// Data input: onNodeClick sets graphData again without the node and the links that touch it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { randomTree, type SampleLink, type SampleNode } from '../../shared/data.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number; z?: number };
type Link = Omit<SampleLink, 'source' | 'target'> & { source: number | Node; target: number | Node };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node to remove it and its links.' });
  const log = stage.bar && readout(stage.bar);
  const fresh = (): { nodes: Node[]; links: Link[] } => randomTree(stage.preview ? 30 : 60, 4) as { nodes: Node[]; links: Link[] };

  const graph = stage.own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, Link>).graphData(fresh()).nodeLabel('name');

  const remove = (node: Node): void => {
    const { nodes, links } = graph.graphData();
    // After the first digest source and target are node objects, not ids.
    graph.graphData({
      nodes: nodes.filter((n) => n !== node),
      links: links.filter((l) => l.source !== node && l.target !== node),
    });
    if (log) log.textContent = `${nodes.length - 1} nodes left`;
  };
  graph.onNodeClick(remove);

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.every(1300, () => {
      const { nodes } = graph.graphData();
      if (nodes.length < 14) {
        graph.graphData(fresh());
        return;
      }
      const target = nodes[Math.floor(Math.random() * nodes.length)]!;
      ghost.node(target);
      // The click lands on whatever the last hover found, so give the hover a moment.
      stage.after(450, () => ghost.click());
    });
  } else if (log) {
    log.textContent = '60 nodes';
  }

  if (stage.bar) button(stage.bar, 'Restore all', () => graph.graphData(fresh()));

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
