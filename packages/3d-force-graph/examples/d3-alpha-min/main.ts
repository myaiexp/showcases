// Force engine: d3AlphaMin stops the simulation as soon as its alpha falls below the value
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout, slider } from '../../shared/controls.ts';
import { fitNow } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { scramble } from '../../shared/layout.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const DECAY = 0.0228; // the default d3AlphaDecay: after n ticks alpha is (1 - 0.0228) ** n

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The default alphaMin is 0, which never stops the simulation (only cooldownTime does). A higher value ends it earlier, with a rougher layout.' });
  const log = stage.bar && readout(stage.bar);

  let alphaMin = 0.1;
  let ticks = 0;
  let stopped = false;
  const data = clusters(3, stage.preview ? 7 : 12) as TData;
  const show = (): void => {
    const alpha = (1 - DECAY) ** ticks;
    const text = `d3AlphaMin(${alphaMin})\n${stopped ? 'stopped' : 'running'} after ${ticks} ticks, alpha ${alpha.toFixed(3)}`;
    note.textContent = text;
    if (log) log.textContent = text;
  };

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .d3AlphaMin(alphaMin)
    .cooldownTime(60000)
    .onEngineTick(() => {
      ticks++;
      show();
    })
    .onEngineStop(() => {
      stopped = true;
      show();
    });
  const note = overlay(stage);

  const restart = (): void => {
    graph.d3AlphaMin(alphaMin);
    scramble(data.nodes, 70);
    ticks = 0;
    stopped = false;
    graph.d3ReheatSimulation();
    show();
  };
  stage.after(1500, () => fitNow(graph, 15));
  show();

  if (stage.preview) {
    const steps = [0.3, 0.1, 0.03, 0.01];
    let i = 0;
    stage.every(4200, () => {
      alphaMin = steps[i++ % steps.length]!;
      restart();
    });
  } else if (stage.bar) {
    slider(stage.bar, 'd3AlphaMin', 0, 0.5, 0.01, alphaMin, (v) => (alphaMin = v), (v) => v.toFixed(2));
    button(stage.bar, 'Scramble and restart', restart);
  }

  return stage.dispose;
};

export default mount;
