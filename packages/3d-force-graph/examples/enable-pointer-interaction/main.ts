// Interaction: enablePointerInteraction(false) switches off hover, click, tooltip and drag for the whole graph
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover or drag a node with the box ticked. Unticked, the graph ignores the pointer (the camera still moves).' });
  const log = stage.bar && readout(stage.bar, 'Hover a node');

  let hovered: TNode | null = null;
  let on = true;
  const data = team() as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor((n) => (n === hovered ? '#ff9e64' : '#7aa2f7'))
    .cooldownTime(2500)
    .onNodeHover((node) => setHover(node));
  const note = overlay(stage);

  function setHover(node: TNode | null): void {
    hovered = node;
    graph.nodeColor(graph.nodeColor());
    show();
  }
  function show(): void {
    const text = `enablePointerInteraction(${on})\n${hovered ? `hovering ${hovered.name}` : 'nothing hovered'}`;
    note.textContent = text;
    if (log) log.textContent = text;
  }
  const set = (value: boolean): void => {
    on = value;
    graph.enablePointerInteraction(value);
    // Turning it off stops the raycasting, so no "hover out" is ever reported: clear the highlight here.
    if (!value) setHover(null);
    else show();
  };
  show();

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 20);
    });
    const names = ['Fay', 'Ada'];
    let i = 0;
    stage.every(2600, () => {
      if (!on) return set(true);
      const target = data.nodes.find((n) => n.name === names[i++ % names.length]);
      if (target) ghost.node(target);
      stage.after(1400, () => set(false));
    });
  } else {
    fitOnce(graph);
    if (stage.bar) checkbox(stage.bar, 'enablePointerInteraction', true, set);
  }

  return stage.dispose;
};

export default mount;
