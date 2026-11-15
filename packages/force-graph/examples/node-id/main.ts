// Data input: nodeId names the attribute that identifies a node, the one links refer to
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { team } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { key: string; group: number; color?: string };
type Link = LinkObject<Node> & { name: string };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Nodes carry a key (and an unrelated numeric id); links name people by key.' });
  const log = stage.bar && readout(stage.bar, 'Hover a node');

  // Rename the sample's id to key and add a numeric `id` that no link refers to.
  const base = team();
  const data = {
    nodes: base.nodes.map((n, i) => ({ key: String(n.id), group: n.group ?? 1, id: 1000 + i, val: n.val })) as Node[],
    links: base.links.map((l) => ({ source: l.source, target: l.target, name: String(l.name) })) as Link[],
  };

  const graph = stage
    .own(new ForceGraph<Node, Link>(stage.container))
    .nodeId('key')
    .graphData(data)
    .nodeLabel('key')
    .nodeAutoColorBy('group')
    .onNodeHover((n) => {
      if (log) log.textContent = n ? `key '${n.key}', id ${n.id}, ${data.links.filter((l) => l.source === n || l.target === n).length} links` : 'Hover a node';
    });

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 14));
    const ghost = stage.ghost(graph);
    const tour = ['Ada', 'Fay', 'Kai', 'Hana'];
    let i = 0;
    stage.every(1800, () => {
      const name = tour[i++ % tour.length];
      const target = data.nodes.find((n) => n.key === name);
      if (target) ghost.node(target);
    });
  }

  return stage.dispose;
};

export default mount;
