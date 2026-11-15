// Render control: onRenderFramePre paints under every node and link: a grid and a hull round each group
import { polygonHull } from 'd3';
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, PALETTE, type GLink, type GNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The hulls and grid are drawn by the callback before the graph, so nodes and links sit on top.' });
  let hulls = true;
  let grid = true;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeColor((n) => PALETTE[(n.group ?? 1) - 1]!)
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(stage.preview ? 2500 : 4000)
    .onRenderFramePre((c, scale) => {
      if (grid) {
        const step = 50;
        c.beginPath();
        for (let v = -1000; v <= 1000; v += step) {
          c.moveTo(v, -1000);
          c.lineTo(v, 1000);
          c.moveTo(-1000, v);
          c.lineTo(1000, v);
        }
        c.strokeStyle = 'rgba(0,0,0,0.07)';
        c.lineWidth = 1 / scale;
        c.stroke();
      }
      if (!hulls) return;
      const nodes = graph.graphData().nodes;
      for (const g of [1, 2, 3]) {
        const pts = nodes.filter((n) => n.group === g).map((n) => [n.x ?? 0, n.y ?? 0] as [number, number]);
        const hull = polygonHull(pts);
        if (!hull) continue;
        c.beginPath();
        hull.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
        c.closePath();
        c.lineJoin = 'round';
        c.lineWidth = 26;
        c.fillStyle = PALETTE[g - 1]! + '33';
        c.strokeStyle = PALETTE[g - 1]! + '33';
        c.fill();
        c.stroke();
      }
    })
    .onEngineStop(() => graph.zoomToFit(400, 30));

  if (stage.bar) {
    checkbox(stage.bar, 'hulls', hulls, (v) => (hulls = v));
    checkbox(stage.bar, 'grid', grid, (v) => (grid = v));
    // The canvas only repaints while the engine runs, so redraw when a box flips.
    stage.bar.addEventListener('change', () => graph.d3ReheatSimulation());
  } else {
    // Shake the nodes now and then so the hulls visibly follow.
    stage.every(3500, () => {
      for (const n of graph.graphData().nodes) {
        n.x = (n.x ?? 0) + (Math.random() - 0.5) * 120;
        n.y = (n.y ?? 0) + (Math.random() - 0.5) * 120;
      }
      graph.d3ReheatSimulation();
    });
  }

  return stage.dispose;
};

export default mount;
