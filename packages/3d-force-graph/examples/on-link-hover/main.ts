// Interaction: onLinkHover turns particles on for the hovered link only
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { endNode, linkLength, midpoint } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a link: it turns orange and four particles run along it, source to target.' });
  const log = stage.bar && readout(stage.bar, 'Hover a link');

  let hovered: TLink | null = null;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .linkWidth((l) => (l === hovered ? 2 : 1))
    .linkColor((l) => (l === hovered ? '#ffb454' : '#5b6a9a'))
    .linkDirectionalParticles((l) => (l === hovered ? 4 : 0))
    .linkDirectionalParticleSpeed(0.012)
    .linkDirectionalParticleWidth(3)
    .cooldownTime(2500)
    .onLinkHover((link) => {
      hovered = link;
      // The accessors read `hovered`: set them again to apply it.
      graph.linkWidth(graph.linkWidth()).linkColor(graph.linkColor()).linkDirectionalParticles(graph.linkDirectionalParticles());
      const text = link ? `onLinkHover: ${endNode(link.source).name} → ${endNode(link.target).name}` : 'onLinkHover: null';
      note.textContent = text;
      if (log) log.textContent = text;
    });
  const note = overlay(stage, 'onLinkHover');

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 25);
    });
    let i = 0;
    stage.every(1800, () => {
      const links = graph.graphData().links.filter((l) => linkLength(l) > 30);
      const link = links[(i++ * 3) % Math.max(1, links.length)];
      if (!link) return;
      const m = midpoint(link);
      ghost.at(m.x, m.y, m.z);
    });
  } else {
    fitOnce(graph);
  }

  return stage.dispose;
};

export default mount;
