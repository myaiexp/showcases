// Node styling: nodeVisibility hides nodes without removing them; their links keep pulling and keep being drawn
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { clusters, PALETTE, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Untick a group to hide its nodes. The links stay (and the layout keeps them), so they end in empty space.',
  });
  const shown = new Set([1, 2, 3]);

  const graph = stage
    .own(new ForceGraph<SampleNode>(stage.container))
    .graphData(clusters(3, stage.preview ? 8 : 12))
    .nodeColor((n) => PALETTE[n.group ?? 1]!)
    .nodeLabel((n) => `${n.name}`)
    .nodeVisibility((n) => shown.has(n.group ?? 1))
    // A change in `shown` is only read when a prop is set again, and the canvas is idle once the layout stops.
    .autoPauseRedraw(false);
  const refresh = (): void => {
    graph.nodeVisibility(graph.nodeVisibility());
  };

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 14));
    // Hide one group at a time, then bring them all back.
    const cycle: number[][] = [[1, 2, 3], [2, 3], [1, 3], [1, 2], [3]];
    let i = 0;
    stage.after(2800, () => {
      stage.every(1500, () => {
        shown.clear();
        for (const g of cycle[++i % cycle.length]!) shown.add(g);
        refresh();
      });
    });
  } else if (stage.bar) {
    for (const g of [1, 2, 3]) {
      checkbox(stage.bar, `group ${g}`, true, (on) => {
        if (on) shown.add(g);
        else shown.delete(g);
        refresh();
      });
    }
    readout(stage.bar, 'nodeVisibility(n => shown.has(n.group))');
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
  }

  return stage.dispose;
};

export default mount;
