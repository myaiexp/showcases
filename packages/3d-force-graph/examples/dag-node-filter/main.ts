// Force engine: dagNodeFilter leaves the nodes it rejects out of the DAG layout, free to move in any direction
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { diagonalFit } from '../../shared/camera.ts';
import { layeredDag, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

type Node = TNode & { level?: number; fy?: number };
const CHOICES = ['none', 'level 2', 'level 3', 'level 4'] as const;
type Choice = (typeof CHOICES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey nodes are excluded: dagNodeFilter returns false for them, so they are not pinned to a level.' });

  let free: Choice = 'none';
  const isFree = (n: Node): boolean => free !== 'none' && `level ${n.level}` === free;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, TLink>)
    .graphData(layeredDag(5, stage.preview ? 4 : 5) as TData)
    .nodeLabel('name')
    .nodeColor((n) => (isFree(n) ? '#9aa5ce' : '#e0af68'))
    .linkDirectionalArrowLength(3)
    .linkDirectionalArrowRelPos(1)
    .dagMode('td')
    .dagLevelDistance(45)
    .dagNodeFilter((n) => !isFree(n))
    .cooldownTime(stage.preview ? 1000 : 4000);

  const note = overlay(stage, 'dagNodeFilter(n => true)');
  let first = true;
  graph.onEngineStop(() => {
    graph.scene().updateMatrixWorld(true);
    if (first) diagonalFit(graph, 20);
    else graph.zoomToFit(500, 20);
    first = false;
  });
  const apply = (choice: Choice): void => {
    free = choice;
    // A node pinned earlier keeps its fy when it leaves the filter: unpin all, the filter pins the rest again.
    for (const n of graph.graphData().nodes) delete n.fy;
    graph.nodeColor(graph.nodeColor()).dagNodeFilter((n) => !isFree(n));
    note.textContent = choice === 'none' ? 'dagNodeFilter(n => true)' : `dagNodeFilter(n => n.level !== ${choice.slice(-1)})`;
  };

  if (stage.preview) {
    let i = 0;
    stage.every(3000, () => apply(CHOICES[++i % CHOICES.length]!));
  } else if (stage.bar) {
    select(stage.bar, 'free nodes', CHOICES, apply);
  }

  return stage.dispose;
};

export default mount;
