// Interaction: onLinkClick selects the clicked link: it thickens and turns red
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { endNode, linkLength, midpoint } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a link (they are thin cylinders here, to be easier to hit) to select it.' });
  const log = stage.bar && readout(stage.bar, 'Nothing selected');

  let selected: TLink | null = null;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .linkLabel('name')
    .linkWidth((l) => (l === selected ? 2.5 : 1))
    .linkColor((l) => (l === selected ? '#ff5d73' : '#7a88b8'))
    .linkOpacity(0.8)
    .cooldownTime(2500)
    .onLinkClick((link) => {
      selected = link;
      graph.linkWidth(graph.linkWidth()).linkColor(graph.linkColor());
      const text = `onLinkClick: ${endNode(link.source).name} → ${endNode(link.target).name} (${link.name})`;
      note.textContent = text;
      if (log) log.textContent = text;
    });
  const note = overlay(stage, 'onLinkClick');

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 25);
    });
    let i = 0;
    stage.every(2000, () => {
      // Long links first: their middle is clear of the nodes at either end.
      const links = graph.graphData().links.filter((l) => linkLength(l) > 30);
      const link = links[(i++ * 5) % Math.max(1, links.length)];
      if (!link) return;
      const m = midpoint(link);
      ghost.at(m.x, m.y, m.z);
      stage.after(450, () => ghost.click());
    });
  } else {
    fitOnce(graph);
  }

  return stage.dispose;
};

export default mount;
