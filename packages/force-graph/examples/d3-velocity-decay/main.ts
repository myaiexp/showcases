// Force engine: d3VelocityDecay is the medium's resistance: low lets nodes overshoot, high makes them crawl
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { scramble } from '../../shared/shake.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['velocity 0.1', 'velocity 0.9'],
    hint: 'Scrambled and released together: the left layout swings and overshoots, the right one creeps toward its resting place.',
  });
  const data = clusters(3, 7);
  const graphs = [0.1, 0.9].map((decay, i) =>
    stage.own(new ForceGraph<GNode, GLink>(stage.panes[i]!.container), stage.panes[i]!)
      .graphData(structuredClone(data))
      .nodeAutoColorBy('group')
      .linkColor(() => 'rgba(0,0,0,0.25)')
      .d3VelocityDecay(decay)
      .cooldownTime(3500)
      .zoom(stage.preview ? 0.7 : 1.1)
      .centerAt(0, 0),
  );

  const restart = (): void => {
    for (const g of graphs) {
      scramble(g, 110);
      g.d3ReheatSimulation();
    }
  };
  if (stage.bar) {
    slider(stage.bar, 'right pane d3VelocityDecay', 0.05, 0.95, 0.05, 0.9, (v) => graphs[1]!.d3VelocityDecay(v), (v) => v.toFixed(2));
    button(stage.bar, 'scramble and reheat', restart);
  } else {
    stage.after(300, restart);
    stage.every(4500, restart);
  }

  return stage.dispose;
};

export default mount;
