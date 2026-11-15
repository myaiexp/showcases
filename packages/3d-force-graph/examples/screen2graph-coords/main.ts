// Utility: screen2GraphCoords maps a click on the canvas to a point in the graph, at a chosen distance from the camera
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { randomTree, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

type Node = TNode & { fx?: number; fy?: number; fz?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click empty space: a node is pinned at that screen point, as deep as the graph centre, and linked to the nearest node.' });
  const log = stage.bar && readout(stage.bar, 'Click empty space');

  const fresh = (): TData => randomTree(stage.preview ? 12 : 20, 9) as TData;
  let added = 0;

  /** A node at screen point (sx, sy), as far from the camera as the graph centre is. */
  const addAt = (sx: number, sy: number): void => {
    const distance = graph.camera().position.length();
    const p = graph.screen2GraphCoords(sx, sy, distance);
    const { nodes, links } = graph.graphData();
    let nearest: Node = nodes[0]!;
    let best = Infinity;
    for (const n of nodes) {
      const d = Math.hypot((n.x ?? 0) - p.x, (n.y ?? 0) - p.y, (n.z ?? 0) - p.z);
      if (d < best) [best, nearest] = [d, n];
    }
    const node: Node = { id: `added ${++added}`, name: `added ${added}`, ...p, fx: p.x, fy: p.y, fz: p.z, group: 2 };
    graph.graphData({ nodes: [...nodes, node], links: [...links, { source: node.id, target: nearest.id }] });
    const text = `screen2GraphCoords(${Math.round(sx)}, ${Math.round(sy)}, ${Math.round(distance)})\n→ { x: ${p.x.toFixed(0)}, y: ${p.y.toFixed(0)}, z: ${p.z.toFixed(0)} }`;
    note.textContent = text;
    if (log) log.textContent = text;
  };

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, TLink>)
    .graphData(fresh())
    .nodeLabel('name')
    .nodeColor((n) => (n.group === 2 ? '#ff9e64' : '#7aa2f7'))
    .cooldownTime(2500)
    .onBackgroundClick((event) => {
      const r = stage.container.getBoundingClientRect();
      addAt(event.clientX - r.left, event.clientY - r.top);
    });
  const note = overlay(stage, 'onBackgroundClick');

  const reset = (): void => {
    added = 0;
    graph.graphData(fresh());
    note.textContent = 'data reset';
    if (log) log.textContent = 'data reset';
  };

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 45);
    });
    const spots = [[0.14, 0.2], [0.85, 0.28], [0.2, 0.8], [0.88, 0.82], [0.5, 0.1], [0.5, 0.92]] as const;
    let i = 0;
    stage.every(2200, () => {
      if (added >= 6) return reset();
      const [fx, fy] = spots[i++ % spots.length]!;
      ghost.px(fx * stage.width, fy * stage.height);
      stage.after(450, () => ghost.click());
    });
  } else {
    fitOnce(graph, 70);
    if (stage.bar) button(stage.bar, 'Reset', reset);
  }

  return stage.dispose;
};

export default mount;
