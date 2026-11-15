// Link styling: linkVisibility hides the line but the link force keeps working
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hide the links, then drag a node: its neighbours still follow, because the link force is still there.' });
  const data = network(3, stage.preview ? 6 : 10, 4);
  let visible = true;

  const graph = stage
    .own(new ForceGraph<Node, NetworkLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeRelSize(5)
    .linkWidth(1.5)
    .linkVisibility(() => visible);
  const show = (on: boolean): void => {
    visible = on;
    graph.linkVisibility(() => visible);
  };

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    const ghost = stage.ghost(graph);
    stage.after(3200, () => {
      const round = (): void => {
        show(false);
        // A node with a few links: its neighbours trail behind when it is dragged.
        const target = [...data.nodes].sort((a, b) => count(b) - count(a))[0]!;
        stage.after(900, () => void ghost.drag(target, 35, -30, 1000));
        stage.after(3300, () => {
          show(true);
          graph.zoomToFit(400, 18);
        });
      };
      const count = (n: Node): number => data.links.filter((l) => (l.source as unknown) === n || (l.target as unknown) === n).length;
      round();
      stage.every(5500, round);
    });
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    checkbox(stage.bar, 'show links', true, show);
  }

  return stage.dispose;
};

export default mount;
