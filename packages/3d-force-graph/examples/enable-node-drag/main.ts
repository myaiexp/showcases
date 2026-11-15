// Interaction: enableNodeDrag turns dragging nodes on and off (d3 engine only)
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a node with the box ticked and it follows the pointer. Unticked, the drag rotates the camera instead.' });

  const data = team() as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .enableNodeDrag(true)
    .cooldownTime(2500);
  const note = overlay(stage, 'enableNodeDrag(true)');

  const set = (value: boolean): void => {
    // The drag controls are built when a data update finishes, not when this prop changes,
    // so set the same data again after it.
    graph.enableNodeDrag(value).graphData(graph.graphData());
    note.textContent = `enableNodeDrag(${value})`;
  };

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 30);
    });
    const names = ['Kai', 'Ada', 'Hana', 'Pia'];
    let on = true;
    let i = 0;
    let busy = false;
    stage.every(3000, () => {
      if (busy) return;
      busy = true;
      on = !on;
      set(on);
      const target = data.nodes.find((n) => n.name === names[i++ % names.length])!;
      // Let the update rebuild the drag controls, then drag the node and report how far it went.
      stage.after(500, () => {
        const from = { x: target.x ?? 0, y: target.y ?? 0, z: target.z ?? 0 };
        void ghost.drag(target, 0, -45, 900).then(() => {
          if (stage.disposed) return;
          const moved = Math.hypot((target.x ?? 0) - from.x, (target.y ?? 0) - from.y, (target.z ?? 0) - from.z);
          note.textContent = `enableNodeDrag(${on}): dragged ${target.name}, moved ${moved.toFixed(0)}`;
          busy = false;
        });
      });
    });
  } else {
    fitOnce(graph);
    if (stage.bar) checkbox(stage.bar, 'enableNodeDrag', true, set);
  }

  return stage.dispose;
};

export default mount;
