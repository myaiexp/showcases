// Force engine: cooldownTime freezes the layout after that many milliseconds of simulation
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout, slider } from '../../shared/controls.ts';
import { fitNow } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { scramble } from '../../shared/layout.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The simulation stops once this many milliseconds have passed since it (re)started. The default is 15000.' });
  const log = stage.bar && readout(stage.bar);

  let limit = 1500;
  let startedAt = performance.now();
  let stopped = false;
  const data = clusters(3, stage.preview ? 8 : 12) as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(limit)
    .onEngineStop(() => {
      stopped = true;
      show();
    });
  const note = overlay(stage);
  function show(): void {
    const elapsed = stopped ? limit : Math.min(limit, performance.now() - startedAt);
    const text = `cooldownTime(${limit})\n${Math.round(elapsed)} ms${stopped ? ': frozen' : ''}`;
    note.textContent = text;
    if (log) log.textContent = text;
  }

  const restart = (): void => {
    graph.cooldownTime(limit);
    scramble(data.nodes, 70);
    stopped = false;
    startedAt = performance.now();
    graph.d3ReheatSimulation(); // restarts the cooldown clock
  };
  stage.every(60, () => {
    if (!stopped) show();
  });
  stage.after(1200, () => fitNow(graph, 15));

  if (stage.preview) {
    const steps = [400, 1200, 2500];
    let i = 0;
    stage.every(3400, () => {
      limit = steps[i++ % steps.length]!;
      restart();
    });
  } else if (stage.bar) {
    slider(stage.bar, 'cooldownTime', 200, 6000, 100, limit, (v) => (limit = v), (v) => `${v} ms`);
    button(stage.bar, 'Scramble and restart', restart);
  }

  return stage.dispose;
};

export default mount;
