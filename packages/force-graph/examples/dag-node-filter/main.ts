// Force engine: dagNodeFilter leaves some nodes out of the DAG layout, free to move like any force-graph node
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { layeredDag, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The orange nodes (level 2) are excluded from the layering and left to the forces.' });
  let filtered = true;
  const level2 = (n: GNode): boolean => Number(n.level) === 2;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(layeredDag(6, 7, 11))
    .nodeColor((n) => (filtered && level2(n) ? '#e4572e' : '#29335c'))
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .linkDirectionalArrowLength(3.5)
    .linkDirectionalArrowRelPos(1)
    .dagMode('td')
    .dagLevelDistance(stage.preview ? 36 : 50)
    .dagNodeFilter((n) => !level2(n))
    .cooldownTime(2200)
    .onEngineStop(() => graph.zoomToFit(400, 24));
  const say = status(stage, 'dagNodeFilter: level 2 excluded');

  const apply = (on: boolean): void => {
    filtered = on;
    // Turning the mode off unfixes every node, so the layering restarts cleanly under the new filter.
    graph.dagMode(null).dagNodeFilter((n) => !(on && level2(n))).dagMode('td');
    say(on ? 'dagNodeFilter: level 2 excluded' : 'dagNodeFilter: everything included');
  };
  if (stage.bar) checkbox(stage.bar, 'exclude level 2 (dagNodeFilter)', true, apply);
  else stage.every(3600, () => apply(!filtered));

  return stage.dispose;
};

export default mount;
