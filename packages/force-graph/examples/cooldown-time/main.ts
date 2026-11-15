// Force engine: cooldownTime stops and freezes the layout once it has run for a number of milliseconds
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { scramble } from '../../shared/shake.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layout is scrambled and run for this many milliseconds, then frozen where it is.' });
  let limit = 400;
  let started = performance.now();
  const elapsed = (): number => Math.round(performance.now() - started);

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(limit)
    .onEngineTick(() => say(`cooldownTime(${limit}): ${elapsed()} ms`))
    .onEngineStop(() => {
      say(`cooldownTime(${limit}): frozen after ${elapsed()} ms`);
      graph.zoomToFit(300, 16);
    });
  const say = status(stage, 'running');

  const run = (ms: number): void => {
    limit = ms;
    graph.cooldownTime(ms);
    scramble(graph, 120);
    started = performance.now();
    graph.d3ReheatSimulation();
    // Follow the layout while it runs, so a frozen one is not left off screen.
    graph.zoomToFit(100, 16);
  };
  if (stage.bar) {
    slider(stage.bar, 'cooldownTime', 100, 5000, 100, limit, (v) => (limit = v), (v) => `${v} ms`);
    button(stage.bar, 'scramble and run', () => run(limit));
  } else {
    const levels = [250, 700, 1800];
    let i = 0;
    stage.every(3500, () => run(levels[i++ % levels.length]!));
  }

  return stage.dispose;
};

export default mount;
