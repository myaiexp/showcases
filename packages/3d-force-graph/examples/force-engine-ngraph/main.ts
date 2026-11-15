// Force engine: forceEngine('ngraph') lays the same graph out with ngraph.forcelayout instead of d3-force-3d
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const ENGINES = ['d3', 'ngraph'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ENGINES.map((e) => (ctx.preview ? e : `forceEngine('${e}')`)),
    hint: 'The same data in both: d3 (the default) and ngraph. Dragging a node only works on d3.',
  });
  const base = clusters(3, stage.preview ? 7 : 14) as TData;
  const ticks = [0, 0];
  const notes = stage.panes.map((p) => overlay(stage, '', p));
  const show = (): void => notes.forEach((n, i) => (n.textContent = `${ticks[i]} ticks`));

  const graphs = ENGINES.map((engine, i) => {
    const graph = stage
      .own(new ForceGraph3D(stage.panes[i]!.container) as ForceGraph3DInstance<TNode, TLink>, stage.panes[i])
      .graphData(structuredClone(base))
      .forceEngine(engine)
      .nodeLabel('name')
      .nodeAutoColorBy('group')
      .cooldownTime(stage.preview ? 2500 : 5000)
      .onEngineTick(() => ticks[i]!++);
    if (stage.preview) {
      const cam = spin(stage, () => graph);
      graph.onEngineStop(() => cam.fit(10));
    } else {
      fitOnce(graph);
    }
    return graph;
  });

  const restart = (): void => {
    ticks.fill(0);
    for (const g of graphs) g.graphData(structuredClone(base));
  };
  stage.every(100, show);
  if (stage.preview) stage.every(5000, restart);
  else if (stage.bar) {
    button(stage.bar, 'Lay out again', restart);
    const status = readout(stage.bar);
    stage.every(250, () => (status.textContent = `ticks: d3 ${ticks[0]}, ngraph ${ticks[1]}`));
  }

  return stage.dispose;
};

export default mount;
