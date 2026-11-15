// Force engine: d3Force('link') pulls linked nodes to a distance, here set from each link's value
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each link\'s distance is its value times the slider, so thicker links (higher value) end up longer.' });

  let unit = 15;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .linkWidth((l) => (l.value ?? 1) - 0.5)
    .linkOpacity(0.5)
    .cooldownTime(stage.preview ? 2200 : 6000);
  const note = overlay(stage);

  const apply = (v: number): void => {
    unit = v;
    graph.d3Force('link')!.distance((l: TLink) => (l.value ?? 1) * unit);
    graph.d3ReheatSimulation();
    note.textContent = `d3Force('link').distance(l => l.value * ${unit})`;
  };
  apply(unit);

  if (stage.preview) {
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(500, 15);
    });
    const steps = [6, 30, 15];
    let i = 0;
    stage.every(3200, () => apply(steps[i++ % steps.length]!));
  } else {
    fitOnce(graph);
    if (stage.bar) {
      slider(stage.bar, 'distance per unit of value', 2, 40, 1, unit, (v) => {
        apply(v);
        graph.onEngineStop(() => graph.zoomToFit(600, 40));
      });
    }
  }

  return stage.dispose;
};

export default mount;
