// Interaction: enableNavigationControls(false) switches the camera controls off, including their own update loop
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { fitNow } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Orbit controls with auto-rotate on. Untick the box: the rotation stops and dragging no longer moves the camera.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container, { controlType: 'orbit' }) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .enableNavigationControls(true)
    .cooldownTime(2000)
    .onEngineStop(() => {
      fitNow(graph, 25);
    });
  const controls = graph.controls() as OrbitControls;
  controls.autoRotate = true; // OrbitControls turns the camera itself from update(), which only runs while enabled
  controls.autoRotateSpeed = 3;
  const note = overlay(stage, 'enableNavigationControls(true)');

  const set = (on: boolean): void => {
    graph.enableNavigationControls(on);
    note.textContent = `enableNavigationControls(${on})`;
  };

  if (stage.preview) {
    let on = true;
    stage.every(2600, () => set((on = !on)));
  } else if (stage.bar) {
    checkbox(stage.bar, 'enableNavigationControls', true, set);
  }

  return stage.dispose;
};

export default mount;
