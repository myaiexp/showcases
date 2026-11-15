// Interaction: onNodeClick collapses or expands a subtree by setting graphData with only the visible nodes
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import type { TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

type Node = TNode & { depth?: number; kids?: string[]; parent?: string };
type Link = { source: string | Node; target: string | Node };

/** A tree: the root, three children, three each below those, and two leaves under every other one. */
function buildTree(): Map<string, Node> {
  const nodes = new Map<string, Node>();
  const add = (id: string, depth: number, parent?: string): void => {
    nodes.set(id, { id, name: id, depth, kids: [], parent });
    if (parent) nodes.get(parent)!.kids!.push(id);
  };
  add('n0', 0);
  for (let a = 1; a <= 3; a++) {
    add(`n${a}`, 1, 'n0');
    for (let b = 1; b <= 3; b++) {
      add(`n${a}.${b}`, 2, `n${a}`);
      if (b !== 2) for (let c = 1; c <= 2; c++) add(`n${a}.${b}.${c}`, 3, `n${a}.${b}`);
    }
  }
  return nodes;
}
const DEPTH_COLORS = ['#f7768e', '#7aa2f7', '#9ece6a', '#bb9af7'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node with children to collapse it (orange, bigger), click again to expand it.' });
  const log = stage.bar && readout(stage.bar);

  const tree = buildTree();
  const collapsed = new Set<string>();
  const hiddenUnder = (n: Node): number => (n.kids ?? []).reduce((sum, k) => sum + 1 + hiddenUnder(tree.get(k)!), 0);

  /** The nodes reachable from the root without passing through a collapsed one. */
  const visible = (): { nodes: Node[]; links: Link[] } => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    const walk = (id: string): void => {
      const n = tree.get(id)!;
      nodes.push(n);
      if (collapsed.has(id)) return;
      for (const k of n.kids ?? []) {
        links.push({ source: id, target: k });
        walk(k);
      }
    };
    walk('n0');
    return { nodes, links };
  };

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, Link>)
    .graphData(visible())
    .nodeLabel((n) => (collapsed.has(String(n.id)) ? `${n.name} (+${hiddenUnder(n)} hidden)` : String(n.name)))
    .nodeColor((n) => (collapsed.has(String(n.id)) ? '#ff9e64' : DEPTH_COLORS[n.depth ?? 0]!))
    .nodeVal((n) => (collapsed.has(String(n.id)) ? 2 + hiddenUnder(n) / 2 : 1))
    .linkDirectionalArrowLength(2.5)
    .linkDirectionalArrowRelPos(1)
    .cooldownTime(stage.preview ? 1800 : 3000);
  const note = overlay(stage, 'click a node to collapse it');

  const toggle = (node: Node): void => {
    if (!node.kids?.length) return;
    const id = String(node.id);
    if (collapsed.has(id)) {
      collapsed.delete(id);
      // Children that come back start at their parent, then spring outwards.
      for (const k of node.kids) Object.assign(tree.get(k)!, { x: node.x, y: node.y, z: node.z, vx: 0, vy: 0, vz: 0 });
    } else collapsed.add(id);
    const data = visible();
    graph.graphData(data).nodeColor(graph.nodeColor()).nodeVal(graph.nodeVal()).nodeLabel(graph.nodeLabel());
    const text = `${collapsed.has(id) ? 'collapsed' : 'expanded'} ${node.name}: ${data.nodes.length} nodes shown`;
    note.textContent = text;
    if (log) log.textContent = text;
  };
  graph.onNodeClick(toggle);

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    // Keep the tree framed while it grows and shrinks (the layout moves for a while after each click).
    stage.every(800, () => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(700, 25);
    });
    const order = ['n1', 'n2', 'n3', 'n1', 'n2', 'n3'];
    let i = 0;
    stage.every(2600, () => {
      const target = tree.get(order[i++ % order.length]!)!;
      ghost.node(target);
      stage.after(450, () => ghost.click());
    });
  } else {
    // Frame the tree each time the layout freezes, as it grows and shrinks.
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(500, 40);
    });
  }

  return stage.dispose;
};

export default mount;
