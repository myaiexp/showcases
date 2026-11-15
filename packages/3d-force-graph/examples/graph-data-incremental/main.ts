// Data input: read graphData(), append a node and a link, set it again: the layout grows in place
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { rng } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = { id: number; x?: number; y?: number; z?: number };
type Link = { source: number | Node; target: number | Node };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each click appends nodes to the data that graphData() returned and sets it again.' });
  const log = stage.bar && readout(stage.bar);
  const rand = rng(17);

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, Link>)
    .graphData({ nodes: [{ id: 0 }, { id: 1 }], links: [{ source: 1, target: 0 }] })
    .nodeLabel('id');

  let next = 2;
  const addNodes = (count: number): void => {
    const { nodes, links } = graph.graphData();
    const added: Node[] = [];
    const newLinks: Link[] = [];
    for (let i = 0; i < count; i++) {
      const id = next++;
      added.push({ id });
      newLinks.push({ source: id, target: Math.floor(rand() * id) });
    }
    graph.graphData({ nodes: [...nodes, ...added], links: [...links, ...newLinks] });
    if (log) log.textContent = `${nodes.length + count} nodes, ${links.length + count} links`;
  };
  const reset = (): void => {
    next = 2;
    graph.graphData({ nodes: [{ id: 0 }, { id: 1 }], links: [{ source: 1, target: 0 }] });
    if (log) log.textContent = '2 nodes, 1 link';
  };

  if (stage.preview) {
    graph.cooldownTime(60000);
    stage.every(450, () => {
      if (next > 45) reset();
      else addNodes(1);
      graph.zoomToFit(500, 20);
    });
  } else {
    addNodes(8);
  }

  if (stage.bar) {
    button(stage.bar, 'Add a node', () => addNodes(1));
    button(stage.bar, 'Add 10 nodes', () => addNodes(10));
    button(stage.bar, 'Reset', reset);
  }

  return stage.dispose;
};

export default mount;
