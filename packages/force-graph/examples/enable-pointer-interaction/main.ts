// Interaction: enablePointerInteraction off stops hover, tooltips, clicks and node drag, and skips the per-frame hit test
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { hoverTour } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With the box ticked nodes react to the pointer. Unticked, hover rings, tooltips, clicks and drags are all off (wheel and pan still work).' });
  const data = clusters(3, stage.preview ? 6 : 10);
  let on = true;
  let hovered: GNode | null = null;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .autoPauseRedraw(false)
    .nodeCanvasObjectMode((n) => (n === hovered ? 'after' : undefined))
    .nodeCanvasObject((n, c, scale) => {
      c.beginPath();
      c.arc(n.x ?? 0, n.y ?? 0, Math.sqrt(n.val ?? 1) * 4 + 3, 0, 2 * Math.PI);
      c.strokeStyle = '#e4572e';
      c.lineWidth = 2 / scale;
      c.stroke();
    })
    .onNodeHover((n) => {
      hovered = n;
      show();
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 30));
  const say = status(stage);
  const show = (): void => say(`enablePointerInteraction(${on}): ${hovered ? `hovering ${hovered.name}` : 'no hover'}`);
  show();

  const set = (v: boolean): void => {
    on = v;
    graph.enablePointerInteraction(v);
    if (!v) hovered = null;
    show();
  };
  if (stage.bar) {
    checkbox(stage.bar, 'enablePointerInteraction', true, set);
  } else {
    const nodes = data.nodes as GNode[];
    hoverTour(stage, stage.ghost(graph), () => [nodes[2], nodes[7], nodes[12], nodes[15]], { every: 1600 });
    // The ghost keeps moving; every few steps pointer interaction is switched off and on again.
    stage.after(3200, () => stage.every(3300, () => set(!on)));
  }

  return stage.dispose;
};

export default mount;
