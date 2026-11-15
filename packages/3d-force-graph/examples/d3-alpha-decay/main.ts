// Force engine: d3AlphaDecay sets how fast the simulation cools; the same scrambled graph settles at three speeds
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { fitNow } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { scramble } from '../../shared/layout.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const DECAYS = [0.08, 0.0228, 0.005];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: DECAYS.map((d) => (d === 0.0228 && !ctx.preview ? `${d} (default)` : String(d))),
    hint: 'Alpha shrinks by this share every tick; the layout is frozen once it is near 0. A high decay freezes early and rough, a low one keeps moving longer.',
  });
  const base = clusters(3, stage.preview ? 6 : 10) as TData;
  const ticks = DECAYS.map(() => 30); // the 30 warm-up ticks count
  const notes = stage.panes.map((p) => overlay(stage, '', p));

  const graphs = DECAYS.map((decay, i) => {
    const graph = stage
      .own(new ForceGraph3D(stage.panes[i]!.container) as ForceGraph3DInstance<TNode, TLink>, stage.panes[i])
      .graphData(structuredClone(base))
      .nodeLabel('name')
      .nodeAutoColorBy('group')
      .d3AlphaDecay(decay)
      .warmupTicks(30)
      .cooldownTime(60000)
      .onEngineTick(() => {
        ticks[i]!++;
        // alpha moves towards 0 by `decay` of what is left, every tick
        notes[i]!.textContent = `tick ${ticks[i]}\nalpha ${((1 - decay) ** ticks[i]!).toFixed(3)}`;
      });
    return graph;
  });

  const restart = (): void => {
    for (const g of graphs) {
      scramble(g.graphData().nodes, 70);
      g.d3ReheatSimulation();
    }
    ticks.fill(0);
  };
  stage.after(1600, () => {
    for (const g of graphs) fitNow(g, 15);
  });
  if (stage.preview) stage.every(5000, restart);
  else if (stage.bar) button(stage.bar, 'Scramble and reheat', restart);

  return stage.dispose;
};

export default mount;
