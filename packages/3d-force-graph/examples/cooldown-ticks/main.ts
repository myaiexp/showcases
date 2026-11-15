// Force engine: cooldownTicks freezes the layout after that many frames of simulation
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout, slider } from '../../shared/controls.ts';
import { fitNow } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { scramble } from '../../shared/layout.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layout runs one tick per frame and stops when the count passes cooldownTicks (default: never, so cooldownTime ends it).' });
  const log = stage.bar && readout(stage.bar);

  let limit = 60;
  let ticks = 0;
  let stopped = false;
  const data = clusters(3, stage.preview ? 8 : 12) as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTicks(limit)
    .onEngineTick(() => {
      ticks++;
      show();
    })
    .onEngineStop(() => {
      stopped = true;
      show();
    });
  const note = overlay(stage);
  function show(): void {
    const text = `cooldownTicks(${limit})\ntick ${ticks}/${limit}${stopped ? ': frozen' : ''}`;
    note.textContent = text;
    if (log) log.textContent = text;
  }

  const restart = (): void => {
    graph.cooldownTicks(limit);
    scramble(data.nodes, 70);
    ticks = 0;
    stopped = false;
    graph.d3ReheatSimulation(); // also restarts the tick count the library keeps
    show();
  };
  show();
  stage.after(1200, () => fitNow(graph, 15));

  if (stage.preview) {
    const steps = [20, 60, 150];
    let i = 0;
    stage.every(3200, () => {
      limit = steps[i++ % steps.length]!;
      restart();
    });
  } else if (stage.bar) {
    slider(stage.bar, 'cooldownTicks', 10, 300, 10, limit, (v) => (limit = v));
    button(stage.bar, 'Scramble and restart', restart);
  }

  return stage.dispose;
};

export default mount;
