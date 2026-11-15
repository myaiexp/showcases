// Force engine: onDagError receives the ids of a cycle instead of the exception a DAG layout throws by default
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { layeredDag, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

/** The layered DAG, plus (when asked) one link from the deepest node back to the root: a cycle. */
function makeData(cycle: boolean): { nodes: GNode[]; links: GLink[] } {
  const data = layeredDag(5, 5, 11);
  const deepest = data.nodes[data.nodes.length - 1]!;
  if (cycle) data.links.push({ source: deepest.id, target: 'root' });
  return data;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add the back link and the layout meets a cycle. The handler reports it and the layering carries on, best effort.' });
  let cycle = true;
  let say: (text: string) => void = () => {};

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .nodeAutoColorBy('level')
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .linkDirectionalArrowLength(3.5)
    .linkDirectionalArrowRelPos(1)
    .dagMode('td')
    .dagLevelDistance(stage.preview ? 36 : 50)
    // Without this handler a cycle throws while the data is processed.
    .onDagError((loop) => say(`cycle found: ${loop.join(' → ')}`))
    .cooldownTime(2200)
    .onEngineStop(() => graph.zoomToFit(400, 24));
  say = status(stage, 'no cycle');

  const load = (on: boolean): void => {
    cycle = on;
    say('no cycle');
    graph.graphData(makeData(on));
  };
  load(true);
  if (stage.bar) checkbox(stage.bar, 'cycle in the data', true, load);
  else stage.every(3600, () => load(!cycle));

  return stage.dispose;
};

export default mount;
