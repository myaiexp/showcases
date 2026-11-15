// Force engine: dagMode lays a directed acyclic graph out in layers, in a line direction or in rings
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { layeredDag, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['td', 'bu', 'lr', 'rl', 'radialout', 'radialin'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same DAG in every mode. Layers follow link direction: source above (or inside) target.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(layeredDag(6, 7, 11))
    .nodeAutoColorBy('level')
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .linkDirectionalArrowLength(4)
    .linkDirectionalArrowRelPos(1)
    .dagMode('td')
    // The default gap comes from the node count and is tiny for a small graph, so give it one.
    .dagLevelDistance(stage.preview ? 36 : 50)
    .cooldownTime(stage.preview ? 1800 : 3000)
    .onEngineStop(() => graph.zoomToFit(400, 24));
  const say = status(stage, "dagMode('td')");
  const setMode = (mode: (typeof MODES)[number]): void => {
    // Going from td/bu to lr/rl (or back) leaves the old axis fixed, so clear the mode in between.
    graph.dagMode(null).dagMode(mode);
    say(`dagMode('${mode}')`);
  };

  if (stage.bar) {
    select(stage.bar, 'dagMode', MODES, setMode);
  } else {
    let i = 0;
    stage.every(3200, () => {
      setMode(MODES[++i % MODES.length]!);
    });
  }

  return stage.dispose;
};

export default mount;
