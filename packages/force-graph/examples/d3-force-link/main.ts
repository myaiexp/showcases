// Force engine: the link force pulls linked nodes to a rest length; d3Force('link').distance() can use each link's value
import type { ForceLink } from 'd3';
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Link value 1 to 3 is drawn as width and sets the rest length: distance = value × the factor.' });
  let factor = 25;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .linkWidth((l) => Number(l.value ?? 1))
    .cooldownTime(2500);
  keepFitted(graph, 16);
  const say = status(stage, 'distance = value × 25');

  const set = (v: number): void => {
    factor = v;
    // The accessor is read when the force initialises; setting it again re-reads every link.
    (graph.d3Force('link') as ForceLink<GNode, GLink>).distance((l) => Number((l as GLink).value ?? 1) * factor);
    graph.d3ReheatSimulation();
    say(`distance = value × ${v}`);
  };
  set(factor);
  if (stage.bar) {
    slider(stage.bar, 'factor', 5, 70, 5, factor, set);
  } else {
    const levels = [8, 45, 70, 25];
    let i = 0;
    stage.every(2800, () => set(levels[i++ % levels.length]!));
  }

  return stage.dispose;
};

export default mount;
