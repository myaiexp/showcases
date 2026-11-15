// Interaction: linkHoverPrecision sets how close (in graph units) the pointer must be to a thin link to hover it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { endNode, linkLength, midpoint, pointerMarker } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Links are 1 px lines (linkWidth 0): hover near one. With a low precision you must be right on it, with a high one it grabs from afar.' });
  const log = stage.bar && readout(stage.bar, 'Hover near a link');

  let hovered: TLink | null = null;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .linkColor((l) => (l === hovered ? '#ffb454' : '#5b6a9a'))
    .linkHoverPrecision(1)
    .cooldownTime(2500)
    .onLinkHover((link) => {
      hovered = link;
      graph.linkColor(graph.linkColor());
      show();
    });
  const note = overlay(stage);
  let precision = 1;
  function show(): void {
    const text = `linkHoverPrecision(${precision})\n${hovered ? `hovering ${endNode(hovered.source).name} → ${endNode(hovered.target).name}` : 'no link under the pointer'}`;
    note.textContent = text;
    if (log) log.textContent = text;
  }
  show();

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    const mark = pointerMarker(stage);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 30);
    });
    // Park the pointer a few pixels off the middle of one link, and widen the precision step by step.
    const aim = (): void => {
      const link = graph.graphData().links.filter((l) => linkLength(l) > 40).sort((a, b) => linkLength(b) - linkLength(a))[0];
      if (!link) return;
      const a = endNode(link.source);
      const b = endNode(link.target);
      const sa = graph.graph2ScreenCoords(a.x ?? 0, a.y ?? 0, a.z ?? 0);
      const sb = graph.graph2ScreenCoords(b.x ?? 0, b.y ?? 0, b.z ?? 0);
      const m = midpoint(link);
      const sm = graph.graph2ScreenCoords(m.x, m.y, m.z);
      const len = Math.hypot(sb.x - sa.x, sb.y - sa.y) || 1;
      const x = sm.x - ((sb.y - sa.y) / len) * 9;
      const y = sm.y + ((sb.x - sa.x) / len) * 9;
      ghost.px(x, y);
      mark(x, y);
    };
    const steps = [1, 3, 8, 20];
    let i = 0;
    // Wait until the camera has settled on the fitted view, then start stepping.
    stage.after(3200, () => {
      aim();
      const next = (): void => {
        precision = steps[i++ % steps.length]!;
        graph.linkHoverPrecision(precision);
        show();
      };
      next();
      stage.every(2400, next);
    });
  } else {
    fitOnce(graph);
    if (stage.bar) slider(stage.bar, 'linkHoverPrecision', 0, 30, 1, precision, (v) => {
      precision = v;
      graph.linkHoverPrecision(v);
      show();
    });
  }

  return stage.dispose;
};

export default mount;
