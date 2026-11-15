// Force engine: the center force keeps the graph's mean position at the origin; d3Force('center', null) removes it
import { forceCenter } from 'd3';
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['center kept', 'center removed'],
    hint: 'The cross is the origin and the red dot is the mean position of the nodes. Drag a node: with the force it pulls back, without it the graph stays where you left it.',
  });
  const data = clusters(2, 6);

  const graphs = [true, false].map((keep, i) => {
    const pane = stage.panes[i]!;
    const graph = stage.own(new ForceGraph<GNode, GLink>(pane.container), pane)
      .graphData(structuredClone(data))
      .nodeAutoColorBy('group')
      .linkColor(() => 'rgba(0,0,0,0.25)')
      .d3Force('center', keep ? forceCenter() : null)
      .autoPauseRedraw(false)
      .cooldownTime(60000)
      .zoom(stage.preview ? 0.55 : 1.3)
      .centerAt(0, 0)
      .onRenderFramePre((c, scale) => {
        c.strokeStyle = 'rgba(0,0,0,0.35)';
        c.lineWidth = 1 / scale;
        c.beginPath();
        c.moveTo(-8, 0);
        c.lineTo(8, 0);
        c.moveTo(0, -8);
        c.lineTo(0, 8);
        c.stroke();
      })
      .onRenderFramePost((c, scale) => {
        const nodes = graph.graphData().nodes;
        const mx = nodes.reduce((s, n) => s + (n.x ?? 0), 0) / nodes.length;
        const my = nodes.reduce((s, n) => s + (n.y ?? 0), 0) / nodes.length;
        c.beginPath();
        c.arc(mx, my, 3.5 / scale, 0, 2 * Math.PI);
        c.fillStyle = '#e4572e';
        c.fill();
      });
    return graph;
  });

  if (stage.bar) {
    checkbox(stage.bar, 'right pane keeps the center force', false, (on) => {
      graphs[1]!.d3Force('center', on ? forceCenter() : null);
    });
  } else {
    // Drag one node in each pane: only the graph with the force drifts back to the origin.
    graphs.forEach((graph, i) => {
      const ghost = stage.ghost(graph);
      stage.after(1800, () => {
        const step = (): void => {
          const hubs = graph.graphData().nodes.filter((n) => String(n.id).endsWith('-0'));
          const hub = hubs[i % hubs.length];
          if (!hub) return;
          const dir = Math.random() < 0.5 ? -1 : 1;
          void ghost.drag(hub, 40 * dir, 25 * dir, 800).then(() => stage.after(3000, step));
        };
        step();
      });
    });
  }

  return stage.dispose;
};

export default mount;
