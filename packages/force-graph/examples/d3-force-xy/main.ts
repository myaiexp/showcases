// Force engine: forceX and forceY from d3 pull nodes toward a coordinate; here each group gets its own column
import { forceX, forceY } from 'd3';
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { clusters, PALETTE, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'forceX targets a column per group, forceY pulls everything toward the middle line. Strength 0 leaves only links and charge.' });
  const gap = stage.preview ? 70 : 130;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeColor((n) => PALETTE[(n.group ?? 1) - 1]!)
    .linkColor(() => 'rgba(0,0,0,0.2)')
    .cooldownTime(2500);
  keepFitted(graph, 16);
  const say = status(stage, 'strength 0.3');

  const set = (s: number): void => {
    graph.d3Force('x', forceX<GNode>((n) => ((n.group ?? 2) - 2) * gap).strength(s));
    graph.d3Force('y', forceY<GNode>(0).strength(s / 3));
    graph.d3ReheatSimulation();
    say(`forceX(column).strength(${s})`);
  };
  set(0.3);
  if (stage.bar) {
    slider(stage.bar, 'strength', 0, 1, 0.05, 0.3, set, (v) => v.toFixed(2));
  } else {
    const levels = [0, 0.3, 0.8, 0.3];
    let i = 0;
    stage.every(2800, () => set(levels[i++ % levels.length]!));
  }

  return stage.dispose;
};

export default mount;
