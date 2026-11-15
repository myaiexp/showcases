// Data input: graphData() as a getter, so new nodes and links can be pushed onto the live arrays
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { rng } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { id: number; name: string };
type Link = LinkObject<Node>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each new node is pushed onto the arrays graphData() returns; the rest keep their places.' });
  const cap = stage.preview ? 36 : 120;
  const rand = rng(11);

  const graph = stage
    .own(new ForceGraph<Node, Link>(stage.container))
    .nodeLabel('name');

  let next = 1;
  const count = stage.bar && readout(stage.bar);
  const report = (): void => {
    if (count) count.textContent = `${graph.graphData().nodes.length} nodes, ${graph.graphData().links.length} links`;
  };

  const add = (n = 1): void => {
    // The getter hands back the arrays the graph is using: push onto them, then set the same object.
    const data = graph.graphData();
    for (let i = 0; i < n; i++) {
      const parent = data.nodes[Math.floor(rand() * data.nodes.length)]!;
      const id = next++;
      // Start the newcomer on its parent so it grows out of it.
      data.nodes.push({ id, name: `node ${id}`, x: (parent.x ?? 0) + rand() - 0.5, y: (parent.y ?? 0) + rand() - 0.5 });
      data.links.push({ source: parent.id, target: id });
    }
    graph.graphData(data);
    report();
  };
  const reset = (): void => {
    // A seed of three nodes to grow from.
    next = 3;
    graph.graphData({
      nodes: [0, 1, 2].map((id) => ({ id, name: `node ${id}` })),
      links: [{ source: 1, target: 0 }, { source: 2, target: 0 }],
    });
    report();
  };

  reset();

  if (stage.bar) {
    button(stage.bar, 'Add a node', () => add());
    button(stage.bar, 'Add 10', () => add(10));
    button(stage.bar, 'Start over', reset);
    report();
  }

  if (stage.preview) {
    graph.cooldownTime(3000);
    keepFitted(graph);
    stage.every(1100, () => {
      if (graph.graphData().nodes.length >= cap) reset();
      else add();
    });
  }

  return stage.dispose;
};

export default mount;
