// Interaction: onNodeClick selects the clicked node, and a second click on it clears the selection
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a person to select them (red); click again to deselect. The callback also receives the mouse event.' });
  const log = stage.bar && readout(stage.bar, 'Nothing selected');

  let selected: TNode | null = null;
  const data = team() as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor((n) => (n === selected ? '#ff5d73' : '#7aa2f7'))
    .cooldownTime(2500)
    .onNodeClick((node, event) => {
      selected = node === selected ? null : node;
      graph.nodeColor(graph.nodeColor()); // read the accessor again to repaint
      const text = selected ? `onNodeClick: ${node.name}${event.shiftKey ? ' (shift held)' : ''}` : 'Selection cleared';
      note.textContent = text;
      if (log) log.textContent = text;
    });
  const note = overlay(stage, 'onNodeClick');

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 20);
    });
    const names = ['Ada', 'Hana', 'Kai', 'Kai', 'Pia'];
    let i = 0;
    stage.every(2000, () => {
      const target = data.nodes.find((n) => n.name === names[i % names.length]);
      i++;
      if (!target) return;
      ghost.node(target);
      stage.after(450, () => ghost.click()); // the click goes to what the last frame's hover found
    });
  } else {
    fitOnce(graph);
  }

  return stage.dispose;
};

export default mount;
