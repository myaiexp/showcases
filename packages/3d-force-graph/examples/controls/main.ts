// Render control: controls() is the camera controls object; trackball has rotateSpeed, zoomSpeed, noPan and more
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitOnce, fitNow } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to rotate, wheel to zoom, right-drag to pan: the sliders and ticks edit the trackball controls object itself.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(stage.preview ? 2500 : 4000);

  const controls = graph.controls() as TrackballControls;
  const note = overlay(stage);

  if (stage.preview) {
    // No pointer in a card: move the controls' own `target`, the point the camera keeps looking at.
    let ready = false;
    graph.onEngineStop(() => {
      fitNow(graph, 40);
      ready = true;
    });
    stage.loop((_dt, t) => {
      if (!ready) return;
      controls.target.set(Math.sin(t * 0.9) * 55, Math.cos(t * 0.7) * 30, 0);
      note.textContent = `controls().target = (${controls.target.x.toFixed(0)}, ${controls.target.y.toFixed(0)}, 0)`;
    });
  } else {
    fitOnce(graph);
    if (stage.bar) {
      slider(stage.bar, 'rotateSpeed', 0.2, 6, 0.2, controls.rotateSpeed, (v) => (controls.rotateSpeed = v), (v) => v.toFixed(1));
      slider(stage.bar, 'zoomSpeed', 0.2, 4, 0.2, controls.zoomSpeed, (v) => (controls.zoomSpeed = v), (v) => v.toFixed(1));
      slider(stage.bar, 'dynamicDampingFactor', 0.02, 0.5, 0.02, controls.dynamicDampingFactor, (v) => (controls.dynamicDampingFactor = v), (v) => v.toFixed(2));
      checkbox(stage.bar, 'staticMoving', controls.staticMoving, (v) => (controls.staticMoving = v));
      checkbox(stage.bar, 'noPan', controls.noPan, (v) => (controls.noPan = v));
      checkbox(stage.bar, 'noZoom', controls.noZoom, (v) => (controls.noZoom = v));
    }
  }

  return stage.dispose;
};

export default mount;
