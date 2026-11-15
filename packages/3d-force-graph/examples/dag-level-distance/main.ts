// Force engine: dagLevelDistance sets how far apart the levels of a DAG layout sit
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { diagonalFit } from '../../shared/camera.ts';
import { layeredDag, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Top-down DAG: the slider is the gap between levels. Left alone, the library derives it from the number of nodes.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(layeredDag(5, stage.preview ? 4 : 5) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('level')
    .dagMode('td')
    .dagLevelDistance(40)
    .cooldownTime(stage.preview ? 1000 : 4000);

  const note = overlay(stage, 'dagLevelDistance(40)');
  let first = true;
  graph.onEngineStop(() => {
    graph.scene().updateMatrixWorld(true);
    if (first) diagonalFit(graph, 20);
    else graph.zoomToFit(500, 20);
    first = false;
  });
  const apply = (v: number): void => {
    graph.dagLevelDistance(v);
    note.textContent = `dagLevelDistance(${v})`;
  };

  if (stage.preview) {
    const steps = [15, 70, 40, 100];
    let i = 0;
    stage.every(2600, () => apply(steps[i++ % steps.length]!));
  } else if (stage.bar) {
    slider(stage.bar, 'dagLevelDistance', 10, 120, 5, 40, apply);
  }

  return stage.dispose;
};

export default mount;
