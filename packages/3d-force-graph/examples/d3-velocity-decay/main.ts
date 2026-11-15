// Force engine: d3VelocityDecay sets how much of each node's speed is lost every tick; the same scrambled graph settles in three media
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { fitNow } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { meanSpeed, scramble } from '../../shared/layout.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const DECAYS = [0.1, 0.4, 0.8];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: DECAYS.map((d) => (d === 0.4 && !ctx.preview ? `${d} (default)` : String(d))),
    hint: 'Velocity decay is friction: low values let nodes overshoot and bounce, high values make them creep, as if the medium were thick.',
  });
  const base = clusters(3, stage.preview ? 6 : 10) as TData;
  const notes = stage.panes.map((p) => overlay(stage, '', p));

  const graphs = DECAYS.map((decay, i) => {
    const data = structuredClone(base);
    const graph = stage
      .own(new ForceGraph3D(stage.panes[i]!.container) as ForceGraph3DInstance<TNode, TLink>, stage.panes[i])
      .graphData(data)
      .nodeLabel('name')
      .nodeAutoColorBy('group')
      .d3VelocityDecay(decay)
      .warmupTicks(30)
      .cooldownTime(60000)
      .onEngineTick(() => {
        notes[i]!.textContent = `speed ${meanSpeed(data.nodes).toFixed(1)}`;
      });
    return graph;
  });

  const restart = (): void => {
    for (const g of graphs) {
      scramble(g.graphData().nodes, 70);
      g.d3ReheatSimulation();
    }
  };
  stage.after(1600, () => {
    for (const g of graphs) fitNow(g, 15);
  });
  if (stage.preview) stage.every(5000, restart);
  else if (stage.bar) button(stage.bar, 'Scramble and reheat', restart);

  return stage.dispose;
};

export default mount;
