// Force engine: dagMode lays a directed acyclic graph out in levels along an axis or in rings
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { diagonalFit } from '../../shared/camera.ts';
import { layeredDag, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

type Mode = 'td' | 'bu' | 'lr' | 'rl' | 'zout' | 'zin' | 'radialout' | 'radialin';
const MODES: Mode[] = ['td', 'bu', 'lr', 'rl', 'zout', 'zin', 'radialout', 'radialin'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The root sits on level 0 and each link points one level further. Arrows show the direction.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(layeredDag(5, stage.preview ? 4 : 5) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('level')
    .linkDirectionalArrowLength(3)
    .linkDirectionalArrowRelPos(1)
    .dagMode('td')
    // The default distance is derived from the node count and is a thin band for ~20 nodes.
    .dagLevelDistance(40)
    .cooldownTime(stage.preview ? 2600 : 4000);

  const note = overlay(stage, "dagMode('td')");
  let first = true;
  graph.onEngineStop(() => {
    graph.scene().updateMatrixWorld(true);
    if (first) diagonalFit(graph, 20);
    else graph.zoomToFit(600, 20);
    first = false;
  });
  const apply = (mode: Mode | 'none'): void => {
    graph.dagMode((mode === 'none' ? null : mode) as never);
    note.textContent = mode === 'none' ? 'dagMode() unset' : `dagMode('${mode}')`;
  };

  if (stage.preview) {
    let i = 0;
    stage.every(4200, () => apply(MODES[++i % MODES.length]!));
  } else if (stage.bar) {
    select(stage.bar, 'dagMode', ['none', ...MODES] as const, apply, 'td' as never);
  }

  return stage.dispose;
};

export default mount;
