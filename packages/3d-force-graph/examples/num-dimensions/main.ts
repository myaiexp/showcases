// Force engine: numDimensions runs the layout in 1, 2 or 3 dimensions
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { diagonalFit } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const DIMS = ['3', '2', '1'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'In 2 dimensions every node ends up in a plane (z is erased), in 1 on a line. Rotate to look edge-on.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(stage.preview ? 2000 : 4000);

  const note = overlay(stage, 'numDimensions(3)');
  let first = true;
  graph.onEngineStop(() => {
    graph.scene().updateMatrixWorld(true);
    if (first) diagonalFit(graph, 20);
    else graph.zoomToFit(600, 20);
    first = false;
  });
  const apply = (v: (typeof DIMS)[number]): void => {
    graph.numDimensions(Number(v) as 1 | 2 | 3);
    note.textContent = `numDimensions(${v})`;
  };

  if (stage.preview) {
    let i = 0;
    stage.every(3200, () => apply(DIMS[++i % DIMS.length]!));
  } else if (stage.bar) {
    select(stage.bar, 'numDimensions', DIMS, apply);
  }

  return stage.dispose;
};

export default mount;
