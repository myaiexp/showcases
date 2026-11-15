// Render control: onRenderFramePost paints over the graph: a ring on the selected node and a legend
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { clusters, PALETTE, type GLink, type GNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node to select it. The ring and the legend are painted after everything else.' });
  const data = clusters(3, stage.preview ? 6 : 10);
  const hubs = data.nodes.filter((n) => String(n.id).endsWith('-0')) as GNode[];
  let selected: GNode | null = null;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeColor((n) => PALETTE[(n.group ?? 1) - 1]!)
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .autoPauseRedraw(false)
    .cooldownTime(2500)
    .onNodeClick((n) => (selected = n))
    .onBackgroundClick(() => (selected = null))
    .onRenderFramePost((c, scale) => {
      if (selected) {
        c.beginPath();
        c.arc(selected.x ?? 0, selected.y ?? 0, 9 + 2 * Math.sin(performance.now() / 200), 0, 2 * Math.PI);
        c.strokeStyle = '#111';
        c.lineWidth = 2 / scale;
        c.stroke();
      }
      // The legend sits at a fixed spot on screen: turn that spot into graph coordinates.
      const at = graph.screen2GraphCoords(10, stage.height - 10 - 14 * 3);
      c.font = `${11 / scale}px sans-serif`;
      c.textBaseline = 'middle';
      [1, 2, 3].forEach((g, i) => {
        const y = at.y + (i * 14 + 7) / scale;
        c.fillStyle = PALETTE[g - 1]!;
        c.beginPath();
        c.arc(at.x + 5 / scale, y, 4 / scale, 0, 2 * Math.PI);
        c.fill();
        c.fillStyle = '#333';
        c.fillText(`group ${g}`, at.x + 14 / scale, y);
      });
    })
    .onEngineStop(() => graph.zoomToFit(300, 24));

  if (stage.preview) {
    let i = 0;
    stage.after(3000, () => {
      const step = (): void => {
        selected = hubs[i++ % hubs.length]!;
      };
      step();
      stage.every(1500, step);
    });
  }

  return stage.dispose;
};

export default mount;
