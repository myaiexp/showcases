// Interaction: onNodeHover lights up the hovered node, its links and its neighbours
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { team, type SampleLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number };
type Link = Omit<SampleLink, 'source' | 'target'> & { source: string | Node; target: string | Node };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a person: their links and direct colleagues stay lit.' });
  const log = stage.bar && readout(stage.bar, 'Hover a node');

  const data = team() as { nodes: Node[]; links: Link[] };
  const id = (end: string | Node): string => (typeof end === 'object' ? String(end.id) : end);

  let hovered: Node | null = null;
  const near = new Set<string>();
  const lit = (n: Node): boolean => !hovered || near.has(String(n.id));
  const litLink = (l: Link): boolean => !hovered || id(l.source) === hovered.id || id(l.target) === hovered.id;

  const graph = stage.own(new ForceGraph<Node, Link>(stage.container))
    .graphData(data)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .nodeVisibility(true)
    .nodeCanvasObjectMode(() => 'before')
    // A ring under every lit node while something is hovered; the default circle is drawn on top.
    .nodeCanvasObject((node, c, scale) => {
      if (!hovered || !lit(node)) return;
      c.beginPath();
      c.arc(node.x ?? 0, node.y ?? 0, Math.sqrt(node.val ?? 1) * 4 + 3 / scale, 0, 2 * Math.PI);
      c.fillStyle = node === hovered ? '#e4572e' : '#f3a712';
      c.fill();
    })
    .linkWidth((l) => (hovered && litLink(l) ? 3 : 1))
    .linkColor((l) => (litLink(l) ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.06)'))
    .onNodeHover((node) => {
      hovered = node;
      near.clear();
      if (node) {
        near.add(String(node.id));
        for (const l of data.links) {
          if (id(l.source) === node.id) near.add(id(l.target));
          if (id(l.target) === node.id) near.add(id(l.source));
        }
      }
      if (log) log.textContent = node ? `${node.name}: ${near.size - 1} direct links` : 'Hover a node';
    })
    // The canvas is not redrawn after the layout stops, so keep painting for the highlight.
    .autoPauseRedraw(false);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 14));
    const ghost = stage.ghost(graph);
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
