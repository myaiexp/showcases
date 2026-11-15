// Render control: onNodeClick flies the camera to a spot just outside the node, looking at it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout, slider } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitNow } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node: cameraPosition moves to a point beyond it, on the line from the centre, and looks at it for 1.5 s.' });
  const log = stage.bar && readout(stage.bar, 'Click a node');
  const note = overlay(stage);

  let reach = 60; // how far beyond the node the camera stops
  const flyTo = (node: TNode): void => {
    const { x = 0, y = 0, z = 0 } = node;
    const len = Math.hypot(x, y, z) || 1;
    const k = 1 + reach / len;
    graph.cameraPosition({ x: x * k, y: y * k, z: z * k }, { x, y, z }, 1500);
    if (log) log.textContent = `Flying to ${node.name}`;
    note.textContent = `onNodeClick: ${node.name}`;
  };
  const overview = (): void => {
    graph.zoomToFit(1000, 20);
    note.textContent = 'zoomToFit(1000)';
  };

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(2500)
    .onEngineStop(() => fitNow(graph, 30))
    .onNodeClick(flyTo);

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    const nodes = (): TNode[] => graph.graphData().nodes;
    const tour = ['Ada', 'Hana', 'Pia', 'Gus'];
    let i = 0;
    stage.every(4000, () => {
      overview();
      const name = tour[i++ % tour.length];
      stage.after(1200, () => {
        const target = nodes().find((n) => n.name === name);
        if (target) ghost.node(target);
      });
      // A click lands on what the last frame's hover found: give the hover a moment.
      stage.after(1700, () => ghost.click());
    });
  } else if (stage.bar) {
    slider(stage.bar, 'distance beyond node', 20, 200, 10, reach, (v) => (reach = v));
    button(stage.bar, 'Back to overview', overview);
  }

  return stage.dispose;
};

export default mount;
