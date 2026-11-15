// Force engine: dagLevelDistance sets the gap between one depth of the DAG and the next
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { layeredDag, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the slider: the layers spread apart or close up. Without it the gap comes from the node count.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(layeredDag(6, 7, 11))
    .nodeAutoColorBy('level')
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .dagMode('lr')
    .dagLevelDistance(60)
    .cooldownTime(1500)
    .onEngineStop(() => graph.zoomToFit(300, 24));
  const say = status(stage, 'dagLevelDistance(60)');

  const set = (d: number): void => {
    graph.dagLevelDistance(d);
    say(`dagLevelDistance(${d})`);
  };
  if (stage.bar) {
    slider(stage.bar, 'dagLevelDistance', 20, 140, 10, 60, set, (v) => `${v} px`);
  } else {
    const gaps = [30, 80, 140, 50];
    let i = 0;
    stage.every(2600, () => set(gaps[++i % gaps.length]!));
  }

  return stage.dispose;
};

export default mount;
