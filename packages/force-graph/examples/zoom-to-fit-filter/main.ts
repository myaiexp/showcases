// Render control: zoomToFit's third argument fits only the nodes a filter keeps
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose a group: the view fits its nodes only and leaves the others off screen.' });
  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 6 : 10))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2500)
    .onEngineStop(() => fit('all'));

  const say = status(stage, 'zoomToFit(…, all nodes)');
  const fit = (which: string): void => {
    graph.zoomToFit(800, 30, (n) => which === 'all' || String(n.group) === which);
    say(which === 'all' ? 'zoomToFit(800, 30)' : `zoomToFit(…, group ${which})`);
  };

  if (stage.bar) {
    select(stage.bar, 'fit', ['all', '1', '2', '3'], fit);
  } else {
    const cycle = ['1', '2', '3', 'all'];
    let i = 0;
    stage.after(3200, () => {
      const step = (): void => fit(cycle[i++ % cycle.length]!);
      step();
      stage.every(1800, step);
    });
  }

  return stage.dispose;
};

export default mount;
