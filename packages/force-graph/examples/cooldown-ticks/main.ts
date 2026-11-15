// Force engine: cooldownTicks stops and freezes the layout after a number of ticks
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { scramble } from '../../shared/shake.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layout is scrambled and run for at most this many ticks, then frozen where it is.' });
  let ticks = 0;
  let limit = 40;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(60000)
    .cooldownTicks(limit)
    .onEngineTick(() => {
      ticks++;
      say(`cooldownTicks(${limit}): tick ${ticks}`);
      if (ticks % 10 === 0) graph.zoomToFit(150, 16);
    })
    .onEngineStop(() => {
      say(`cooldownTicks(${limit}): frozen after ${ticks} ticks`);
      graph.zoomToFit(300, 16);
    });
  const say = status(stage, 'running');

  const run = (n: number): void => {
    limit = n;
    ticks = 0;
    graph.cooldownTicks(n);
    scramble(graph, 120);
    graph.d3ReheatSimulation();
  };
  if (stage.bar) {
    slider(stage.bar, 'cooldownTicks', 10, 300, 10, limit, (v) => (limit = v));
    button(stage.bar, 'scramble and run', () => run(limit));
  } else {
    const levels = [15, 50, 200];
    let i = 0;
    stage.every(3500, () => run(levels[i++ % levels.length]!));
  }

  return stage.dispose;
};

export default mount;
