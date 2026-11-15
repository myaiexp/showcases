// Interaction: onLinkRightClick removes the link, by setting the data again without it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { endNode, linkLength, midpoint } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Right-click a link to remove it. Nodes keep their places; the layout relaxes without that spring.' });
  const log = stage.bar && readout(stage.bar);
  const fresh = (): TData => clusters(3, stage.preview ? 7 : 12) as TData;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(fresh())
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .linkWidth(1)
    .linkOpacity(0.7)
    .cooldownTime(2000)
    .onLinkRightClick((link) => {
      const { nodes, links } = graph.graphData();
      graph.graphData({ nodes, links: links.filter((l) => l !== link) });
      const text = `removed ${endNode(link.source).name} – ${endNode(link.target).name}: ${links.length - 1} links left`;
      note.textContent = text;
      if (log) log.textContent = text;
    });
  const note = overlay(stage, 'onLinkRightClick');
  if (log) log.textContent = `${graph.graphData().links.length} links`;

  const restore = (): void => {
    graph.graphData(fresh());
    note.textContent = 'data restored';
    if (log) log.textContent = 'data restored';
  };

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 25);
    });
    stage.every(1800, () => {
      const links = graph.graphData().links.filter((l) => linkLength(l) > 30);
      if (links.length < 8) return restore();
      const link = links[Math.floor(Math.random() * links.length)]!;
      const m = midpoint(link);
      ghost.at(m.x, m.y, m.z);
      stage.after(450, () => ghost.click(2));
    });
  } else {
    fitOnce(graph);
    if (stage.bar) button(stage.bar, 'Restore all links', restore);
  }

  return stage.dispose;
};

export default mount;
