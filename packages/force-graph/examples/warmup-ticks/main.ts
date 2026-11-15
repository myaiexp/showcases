// Force engine: warmupTicks runs the layout in advance, so the first frame shows a settled graph
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['warmupTicks 0', 'warmupTicks 200'],
    hint: 'Both load the same data. The left layout unfolds in front of you, the right one has already run 200 ticks before its first frame.',
  });
  const graphs = [0, 200].map((ticks, i) => {
    const graph = stage.own(new ForceGraph<GNode, GLink>(stage.panes[i]!.container), stage.panes[i]!)
      .nodeAutoColorBy('group')
      .linkColor(() => 'rgba(0,0,0,0.25)')
      .warmupTicks(ticks)
      .cooldownTime(2500)
      .zoom(0.6)
      .centerAt(0, 0);
    keepFitted(graph, 14, 20);
    return graph;
  });

  const reload = (): void => {
    for (const g of graphs) g.graphData(clusters(3, stage.preview ? 7 : 10, 1 + Math.floor(Math.random() * 90)));
  };
  reload();
  if (stage.bar) button(stage.bar, 'load new data', reload);
  else stage.every(5000, reload);

  return stage.dispose;
};

export default mount;
