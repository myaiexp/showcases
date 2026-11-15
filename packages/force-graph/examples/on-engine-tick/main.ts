// Force engine: onEngineTick fires on every simulation tick: a counter and an alpha estimate drawn live
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { scramble } from '../../shared/shake.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The callback counts ticks and estimates alpha, which cools by 2.28 % per tick from 1 after every reheat.' });
  let ticks = 0;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(5000)
    .onEngineTick(() => {
      ticks++;
      say(`tick ${ticks}  alpha ≈ ${((1 - graph.d3AlphaDecay()) ** ticks).toFixed(3)}`);
      if (ticks % 20 === 0) graph.zoomToFit(200, 16);
    })
    .onEngineStop(() => {
      say(`stopped after ${ticks} ticks`);
      graph.zoomToFit(400, 16);
    });
  const say = status(stage, 'tick 0');

  const run = (): void => {
    ticks = 0;
    scramble(graph, 130);
    graph.d3ReheatSimulation();
  };
  if (stage.bar) button(stage.bar, 'scramble and reheat', run);
  else stage.every(5500, run);

  return stage.dispose;
};

export default mount;
