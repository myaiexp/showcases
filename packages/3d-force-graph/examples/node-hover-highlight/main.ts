// Interaction: onNodeHover lights up the hovered node, its links and its neighbours
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { team, type SampleLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number; z?: number };
type Link = Omit<SampleLink, 'source' | 'target'> & { source: string | Node; target: string | Node };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a person: their links and direct colleagues stay lit.' });
  const log = stage.bar && readout(stage.bar, 'Hover a node');

  const data = team() as { nodes: Node[]; links: Link[] };
  const id = (end: string | Node): string => (typeof end === 'object' ? String(end.id) : end);

  let hovered: Node | null = null;
  const near = new Set<string>();
  const litLink = (l: Link): boolean => !hovered || id(l.source) === hovered.id || id(l.target) === hovered.id;

  const graph = stage.own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, Link>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor((n) => (!hovered ? '#7aa2f7' : n === hovered ? '#ff5d73' : near.has(String(n.id)) ? '#ffb454' : '#3b4261'))
    .linkWidth((l) => (hovered && litLink(l) ? 2 : 0))
    .linkColor((l) => (hovered && litLink(l) ? '#ffb454' : '#c0caf5'))
    .onNodeHover((node) => {
      if (node === hovered) return;
      hovered = node;
      near.clear();
      if (node) {
        for (const l of data.links) {
          if (id(l.source) === node.id) near.add(id(l.target));
          if (id(l.target) === node.id) near.add(id(l.source));
        }
      }
      // Accessors are read again only when a prop is set: set them again to repaint.
      graph.nodeColor(graph.nodeColor()).linkWidth(graph.linkWidth()).linkColor(graph.linkColor());
      if (log) log.textContent = node ? `${node.name}: ${near.size} direct links` : 'Hover a node';
    });

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 10));
    const tour = ['Ada', 'Fay', 'Kai', 'Hana'];
    let i = 0;
    stage.every(1800, () => {
      const name = tour[i++ % tour.length];
      const target = data.nodes.find((n) => n.id === name);
      if (target) ghost.node(target);
    });
  }

  return stage.dispose;
};

export default mount;
