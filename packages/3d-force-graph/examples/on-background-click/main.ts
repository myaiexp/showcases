// Interaction: onBackgroundClick clears the selection; onBackgroundRightClick fits the camera to the graph
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node, then click empty space to clear it. Right-click empty space to zoomToFit after moving the camera.' });
  const log = stage.bar && readout(stage.bar, 'Click a node, then empty space');

  let selected: TNode | null = null;
  const data = team() as TData;
  const say = (text: string): void => {
    note.textContent = text;
    if (log) log.textContent = text;
  };
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor((n) => (n === selected ? '#ff5d73' : '#7aa2f7'))
    .cooldownTime(2500)
    .onNodeClick((node) => {
      selected = node;
      graph.nodeColor(graph.nodeColor());
      say(`selected ${node.name}`);
    })
    .onBackgroundClick(() => {
      selected = null;
      graph.nodeColor(graph.nodeColor());
      say('onBackgroundClick: selection cleared');
    })
    .onBackgroundRightClick(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(800, 30);
      say('onBackgroundRightClick: zoomToFit(800, 30)');
    });
  const note = overlay(stage, 'click a node');

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(300, 30);
    });
    const empty = (): void => ghost.px(10, stage.height - 10); // a bottom corner, clear of the graph
    const node = (name: string): void => {
      const target = data.nodes.find((n) => n.name === name);
      if (target) ghost.node(target);
    };
    const steps: (() => void)[] = [
      () => node('Fay'),
      empty,
      () => node('Kai'),
      () => {
        // Look away first, so the right-click has something to undo.
        graph.cameraPosition({ x: 40, y: 20, z: 90 }, { x: 0, y: 0, z: 0 }, 600);
        stage.after(800, empty);
      },
    ];
    const click = [0, 0, 0, 2] as const;
    let i = 0;
    stage.every(2800, () => {
      const k = i++ % steps.length;
      steps[k]!();
      stage.after(k === 3 ? 1300 : 500, () => ghost.click(click[k]));
    });
  } else {
    fitOnce(graph);
  }

  return stage.dispose;
};

export default mount;
