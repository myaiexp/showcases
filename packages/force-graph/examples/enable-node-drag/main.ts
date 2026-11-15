// Interaction: enableNodeDrag switches dragging nodes on or off; off, a drag on a node pans the view instead
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try dragging a node with the box ticked and unticked. Unticked, the drag grabs the background and pans.' });
  const data = clusters(3, stage.preview ? 6 : 10);

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .enableNodeDrag(true)
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 30));
  const say = status(stage, 'enableNodeDrag(true)');
  const set = (on: boolean): void => {
    graph.enableNodeDrag(on);
    say(`enableNodeDrag(${on})`);
  };

  if (stage.bar) {
    checkbox(stage.bar, 'enableNodeDrag', true, set);
  } else {
    const ghost = stage.ghost(graph);
    const hubs = data.nodes.filter((n) => String(n.id).endsWith('-0')) as GNode[];
    let on = false;
    let i = 0;
    script(stage, async (wait) => {
      on = !on;
      set(on);
      await wait(300);
      // On: the node follows the pointer. Off: the same gesture moves the whole view.
      await ghost.drag(hubs[i++ % hubs.length]!, 40, 28, 900);
      await wait(1300);
      graph.zoomToFit(500, 30);
      await wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
