// Force engine: onEngineStop runs once the layout freezes: the place to fit the view to the finished graph
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'New data starts in a heap at the default zoom. When the engine stops, the handler fits the view to the result.' });
  let seed = 1;
  let stops = 0;

  const graph = stage.own(new ForceGraph(stage.container))
    .nodeColor(() => '#3d5a80')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(stage.preview ? 2200 : 3500)
    .onEngineStop(() => {
      stops++;
      say(`onEngineStop #${stops}: zoomToFit(600, 20)`);
      graph.zoomToFit(600, 20);
    });
  const say = status(stage, 'running');

  const load = (): void => {
    say('running');
    graph.graphData(randomTree(stage.preview ? 40 : 90, ++seed));
  };
  load();
  if (stage.bar) button(stage.bar, 'new random tree', load);
  else stage.every(4500, load);

  return stage.dispose;
};

export default mount;
