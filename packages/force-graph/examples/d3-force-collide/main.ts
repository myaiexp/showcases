// Force engine: a new force joins the simulation with d3Force(name, force): forceCollide keeps nodes from overlapping
import { forceCollide, type ForceManyBody } from 'd3';
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Charge is weak here, so nodes pile up. A collision force of radius r keeps every pair at least 2r apart.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 8 : 14))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .nodeRelSize(5)
    .cooldownTime(2500);
  keepFitted(graph, 16);
  (graph.d3Force('charge') as ForceManyBody<GNode>).strength(-4);
  const say = status(stage, 'no collide force');

  const set = (r: number): void => {
    // 0 removes the force; any other value adds (or replaces) one named 'collide'.
    graph.d3Force('collide', r ? forceCollide(r) : null);
    graph.d3ReheatSimulation();
    say(r ? `d3Force('collide', forceCollide(${r}))` : 'no collide force');
  };
  if (stage.bar) {
    slider(stage.bar, 'collide radius', 0, 24, 1, 0, set);
  } else {
    const levels = [0, 14, 0, 9];
    let i = 0;
    stage.every(2800, () => set(levels[i++ % levels.length]!));
  }

  return stage.dispose;
};

export default mount;
