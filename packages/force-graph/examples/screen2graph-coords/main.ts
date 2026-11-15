// Utility: screen2GraphCoords turns the pixel of a click into graph coordinates: a click on empty space adds a node there
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click empty space: the node appears under the pointer, however the view is panned or zoomed, and links to its nearest neighbour.' });
  const base = (): { nodes: GNode[]; links: GLink[] } => clusters(2, stage.preview ? 5 : 8);
  let data = base();
  let added = 0;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .onBackgroundClick((ev) => {
      // offsetX/offsetY are pixels inside the canvas; the view transform turns them into graph units.
      const p = graph.screen2GraphCoords(ev.offsetX, ev.offsetY);
      const near = data.nodes.reduce((a, b) => (Math.hypot((a.x ?? 0) - p.x, (a.y ?? 0) - p.y) < Math.hypot((b.x ?? 0) - p.x, (b.y ?? 0) - p.y) ? a : b));
      const node: GNode = { id: `new-${++added}`, name: `new ${added}`, group: 3, val: 2, x: p.x, y: p.y };
      data = { nodes: [...data.nodes, node], links: [...data.links, { source: node.id as string, target: near.id as string }] };
      graph.graphData(data);
      say(`screen (${ev.offsetX.toFixed(0)}, ${ev.offsetY.toFixed(0)}) -> graph (${p.x.toFixed(0)}, ${p.y.toFixed(0)})`);
    })
    .cooldownTime(2500);
  // Fit the first layout; later additions leave the view where the reader put it (cards keep refitting).
  let fitted = false;
  graph.onEngineStop(() => {
    if (stage.preview || !fitted) graph.zoomToFit(300, 30);
    fitted = true;
  });
  const say = status(stage, 'Click empty space');

  const reset = (): void => {
    data = base();
    added = 0;
    graph.graphData(data);
    say('Click empty space');
  };
  if (stage.bar) {
    button(stage.bar, 'start over', reset);
  } else {
    const ghost = stage.ghost(graph);
    // Spots near the corners of the card, which the fitted graph leaves empty.
    const spots: [number, number][] = [[24, 24], [stage.width - 24, 26], [28, stage.height - 26], [stage.width - 26, stage.height - 24]];
    let i = 0;
    script(stage, async (wait) => {
      if (i === spots.length) {
        i = 0;
        reset();
        await wait(2500);
        return;
      }
      const [x, y] = spots[i++]!;
      ghost.px(x, y);
      await wait(1100);
      ghost.click();
      await wait(1500);
    });
  }

  return stage.dispose;
};

export default mount;
