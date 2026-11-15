// Interaction: showPointerCursor decides per object whether the hand cursor shows over it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Only team 1 (blue) is clickable: hover it and the cursor becomes a hand. Teams 2 and 3 keep the arrow, though a click still arrives.' });
  const log = stage.bar && readout(stage.bar, 'Hover a node');

  const data = team() as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor((n) => (n.group === 1 ? '#7aa2f7' : '#565f89'))
    .showPointerCursor((obj) => (obj as TNode).group === 1)
    .onNodeClick(() => {}) // the hand only shows over objects that have a click handler
    .cooldownTime(2500)
    .onNodeHover((node) => {
      // The library marks the canvas with a `clickable` class while the hand cursor is on.
      queueMicrotask(() => {
        const hand = graph.renderer().domElement.classList.contains('clickable');
        const text = node ? `${node.name}: cursor ${hand ? 'pointer (hand)' : 'default (arrow)'}` : 'no node under the pointer';
        note.textContent = text;
        if (log) log.textContent = text;
      });
    });
  const note = overlay(stage, 'showPointerCursor(obj => obj.group === 1)');

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 20);
    });
    const names = ['Ada', 'Hana', 'Cleo', 'Lea'];
    let i = 0;
    stage.every(1800, () => {
      const target = data.nodes.find((n) => n.name === names[i++ % names.length]);
      if (target) ghost.node(target);
    });
  } else {
    fitOnce(graph);
  }

  return stage.dispose;
};

export default mount;
