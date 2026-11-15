// Force engine: the charge force repels nodes from each other; d3Force('charge').strength() tunes it
import type { ForceManyBody } from 'd3';
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Strength is negative for repulsion (default -30). Each change reheats the layout so you can watch it.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2500);
  keepFitted(graph, 16);
  const say = status(stage, "charge strength -30");

  const set = (v: number): void => {
    (graph.d3Force('charge') as ForceManyBody<GNode>).strength(v);
    graph.d3ReheatSimulation();
    say(`d3Force('charge').strength(${v})`);
  };
  if (stage.bar) {
    slider(stage.bar, 'strength', -300, 20, 10, -30, set);
    button(stage.bar, 'reheat', () => graph.d3ReheatSimulation());
  } else {
    const levels = [-8, -120, -400, -30];
    let i = 0;
    stage.every(2800, () => set(levels[i++ % levels.length]!));
  }

  return stage.dispose;
};

export default mount;
