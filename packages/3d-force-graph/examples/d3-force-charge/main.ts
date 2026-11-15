// Force engine: d3Force('charge') is the many-body force; a negative strength repels, a positive one attracts
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The charge force pushes every pair of nodes apart (default strength -60 in 3D). Change it, then reheat so the layout moves.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(stage.preview ? 2200 : 6000);
  const note = overlay(stage, "d3Force('charge').strength(-60)");

  const apply = (strength: number): void => {
    graph.d3Force('charge')!.strength(strength);
    graph.d3ReheatSimulation();
    note.textContent = `d3Force('charge').strength(${strength})`;
  };

  if (stage.preview) {
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(500, 15);
    });
    const steps = [-10, -200, -60];
    let i = 0;
    stage.every(3200, () => apply(steps[i++ % steps.length]!));
  } else {
    fitOnce(graph);
    if (stage.bar) {
      slider(stage.bar, 'charge strength', -300, 30, 5, -60, (v) => {
        apply(v);
        // A reheat restarts the cooldown clock; fit again when the layout settles.
        graph.onEngineStop(() => graph.zoomToFit(600, 40));
      });
    }
  }

  return stage.dispose;
};

export default mount;
