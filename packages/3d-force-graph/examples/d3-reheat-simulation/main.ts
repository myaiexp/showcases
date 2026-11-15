// Force engine: d3ReheatSimulation sets the simulation's alpha back to 1, so a frozen layout moves again
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { scramble } from '../../shared/layout.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'After the cooldown the layout is frozen. Reheat it as it is (a small shake) or scramble the nodes first and watch it settle again.' });

  const data = clusters(3, stage.preview ? 8 : 14) as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(stage.preview ? 2200 : 5000);
  const note = overlay(stage);

  const reheat = (): void => {
    graph.d3ReheatSimulation();
    note.textContent = 'd3ReheatSimulation()';
  };
  const scrambleAndReheat = (): void => {
    scramble(data.nodes, 80);
    reheat();
    note.textContent = 'nodes scrambled\nd3ReheatSimulation()';
  };

  if (stage.preview) {
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(400, 20);
    });
    stage.every(3800, scrambleAndReheat);
  } else {
    fitOnce(graph);
    if (stage.bar) {
      button(stage.bar, 'd3ReheatSimulation()', reheat);
      button(stage.bar, 'Scramble, then reheat', scrambleAndReheat);
    }
  }

  return stage.dispose;
};

export default mount;
