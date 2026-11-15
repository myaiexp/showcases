// Force engine: warmupTicks runs layout ticks before the first frame, so the graph appears already settled
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitNow } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const WARMUPS = [0, 300];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: WARMUPS.map((w) => `warmupTicks(${w})`),
    hint: 'Both graphs get the same fresh data. The one with warm-up ticks is already settled on its first frame; the other grows out of a heap at the origin.',
  });
  const base = clusters(3, stage.preview ? 8 : 14) as TData;
  const notes: HTMLElement[] = [];
  const ticks = WARMUPS.map(() => 0);

  const graphs = WARMUPS.map((warmup, i) => {
    const graph = stage
      .own(new ForceGraph3D(stage.panes[i]!.container) as ForceGraph3DInstance<TNode, TLink>, stage.panes[i])
      .nodeLabel('name')
      .nodeAutoColorBy('group')
      .warmupTicks(warmup)
      .cooldownTime(3500)
      .onEngineTick(() => ticks[i]!++);
    notes.push(overlay(stage, '', stage.panes[i]));
    return graph;
  });

  const load = (): void => {
    ticks.fill(0);
    // warmupTicks is read when data arrives, so it is set before graphData in the same step.
    graphs.forEach((g, i) => g.warmupTicks(WARMUPS[i]!).graphData(structuredClone(base)));
  };
  load();
  // Fit to the settled layout once; later loads keep the camera where it is.
  stage.after(stage.preview ? 1200 : 2500, () => graphs.forEach((g) => fitNow(g, 15)));
  stage.every(100, () => notes.forEach((n, i) => (n.textContent = `${ticks[i]} ticks drawn`)));

  if (stage.preview) stage.every(5500, load);
  else if (stage.bar) button(stage.bar, 'Load the data again', load);

  return stage.dispose;
};

export default mount;
