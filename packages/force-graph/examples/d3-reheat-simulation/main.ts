// Force engine: d3ReheatSimulation sets alpha back to 1, so a frozen layout runs again
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { scramble } from '../../shared/shake.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scramble the positions, then reheat: the forces pull the layout back together. Reheating alone just stirs a settled one.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2500);
  keepFitted(graph, 16);
  const say = status(stage, 'running');
  graph.onEngineStop(() => {
    graph.zoomToFit(400, 16);
    say('frozen');
  });

  const run = (shuffle: boolean): void => {
    if (shuffle) scramble(graph, 160);
    graph.d3ReheatSimulation();
    say(shuffle ? 'scrambled, d3ReheatSimulation()' : 'd3ReheatSimulation()');
  };
  if (stage.bar) {
    button(stage.bar, 'scramble + reheat', () => run(true));
    button(stage.bar, 'reheat only', () => run(false));
  } else {
    stage.every(4000, () => run(true));
  }

  return stage.dispose;
};

export default mount;
