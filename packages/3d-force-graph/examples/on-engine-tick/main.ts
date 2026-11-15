// Force engine: onEngineTick runs after every simulation tick, here counting them and reading the nodes' speed
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { meanSpeed, scramble } from '../../shared/layout.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The callback fires once per tick while the engine runs, and stops firing when the layout freezes.' });
  const log = stage.bar && readout(stage.bar);

  let ticks = 0;
  const data = clusters(3, stage.preview ? 8 : 14) as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(stage.preview ? 2500 : 5000)
    .onEngineTick(() => {
      ticks++;
      const text = `onEngineTick: tick ${ticks}\nmean node speed ${meanSpeed(data.nodes).toFixed(2)}`;
      note.textContent = text;
      if (log) log.textContent = text;
    });
  const note = overlay(stage, 'onEngineTick: tick 0');

  const again = (): void => {
    scramble(data.nodes, 80);
    ticks = 0;
    graph.d3ReheatSimulation();
  };

  if (stage.preview) {
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(400, 20);
    });
    stage.every(4500, again);
  } else {
    fitOnce(graph);
    if (stage.bar) button(stage.bar, 'Scramble and reheat', again);
  }

  return stage.dispose;
};

export default mount;
